# AWS S3 setup for image uploads

The backend never proxies image bytes — it only issues short-lived presigned `PUT` URLs
(`POST /api/admin/uploads/presign`), and the admin portal's browser uploads straight to S3.
This session has no real AWS credentials, so these steps are for you to run once, by hand
(AWS Console or CLI), before the admin portal can upload real images.

## 1. Create the bucket

```sh
aws s3api create-bucket \
  --bucket kalakshetra-handpaintings-media \
  --region ap-south-1 \
  --create-bucket-configuration LocationConstraint=ap-south-1
```

Pick a region close to your users; `ap-south-1` (Mumbai) is a reasonable default for a
Kerala-based studio. Keep the bucket name in sync with the `AWS_S3_BUCKET` env var below.

## 2. Allow public read of uploaded images

Product/lookbook photos are meant to be publicly visible on the website, so the bucket serves
images directly (optionally behind CloudFront — see step 4). Apply this bucket policy,
replacing the bucket name:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadForImages",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::kalakshetra-handpaintings-media/*"
    }
  ]
}
```

```sh
aws s3api put-bucket-policy --bucket kalakshetra-handpaintings-media --policy file://bucket-policy.json
aws s3api put-public-access-block --bucket kalakshetra-handpaintings-media \
  --public-access-block-configuration BlockPublicPolicy=false,RestrictPublicBuckets=false,BlockPublicAcls=true,IgnorePublicAcls=true
```

## 3. CORS — required for the admin portal's browser to `PUT` directly to S3

```json
[
  {
    "AllowedOrigins": ["https://admin.kalakshetrahandpaintings.com", "http://localhost:3100"],
    "AllowedMethods": ["PUT", "GET"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

```sh
aws s3api put-bucket-cors --bucket kalakshetra-handpaintings-media --cors-configuration file://cors.json
```

Add `http://localhost:3100` only while developing the admin portal locally; drop it once
you're confident local dev won't need to upload against the real bucket.

## 4. (Optional but recommended) CloudFront in front of the bucket

Fronting the bucket with CloudFront gives you a CDN, HTTPS on a custom asset domain (e.g.
`assets.kalakshetrahandpaintings.com`), and lets you keep the bucket itself private (Origin
Access Control) instead of using the public bucket policy in step 2. This is a nice-to-have —
skip it for launch and add it later without any backend code changes, since the backend only
needs `AWS_S3_PUBLIC_BASE_URL` updated to point at the CloudFront domain instead of the raw S3
URL.

## 5. IAM user/role for the backend

The backend only needs to presign `PutObject` and issue `DeleteObject` calls — scope a policy
tightly to the one bucket:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "BackendUploadsAndCleanup",
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::kalakshetra-handpaintings-media/*"
    }
  ]
}
```

Create an IAM user (or role, if Railway supports OIDC federation in your setup) with this
policy attached, generate an access key pair, and set on the backend's Railway service:

| Env var | Value |
|---|---|
| `AWS_ACCESS_KEY_ID` | the IAM user's access key |
| `AWS_SECRET_ACCESS_KEY` | the IAM user's secret key |
| `AWS_REGION` | e.g. `ap-south-1` |
| `AWS_S3_BUCKET` | `kalakshetra-handpaintings-media` |
| `AWS_S3_PUBLIC_BASE_URL` | `https://kalakshetra-handpaintings-media.s3.ap-south-1.amazonaws.com` (or your CloudFront domain, once set up) |

## Why this wasn't done from inside the session

Presigning itself is a local crypto operation (no network call), so the presign endpoint is
fully implemented and tested against a fake bucket name in this repo's test suite. But actually
creating the bucket, applying policies, and generating real credentials requires your AWS
account — this session only has placeholder credentials injected by its sandbox proxy, not
access to a real account.
