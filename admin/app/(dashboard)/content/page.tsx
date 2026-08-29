import { backendFetch } from '@/lib/backendClient';
import { ImageUploadField } from '@/components/ImageUploadField';
import type { SiteContentEntry } from '@/lib/types';
import { saveContentGroup } from './actions';

/** Groups that have an editable image (stored as `{group}.imageUrl` / `{group}.imageS3Key`),
 * with the crop ratio matching where that image renders on the public site. */
const GROUP_IMAGE_ASPECT: Record<string, number> = {
  story: 4 / 5,
};

const GROUP_LABELS: Record<string, string> = {
  hero: 'Hero',
  philosophy: 'Philosophy',
  commission: 'Custom commission banner',
  story: 'Our story',
  howToOrder: 'How to order',
  contact: 'Contact details',
  footer: 'Footer',
};

const LONG_FIELDS = new Set(['subcopy', 'intro', 'quote', 'body']);

export default async function ContentPage() {
  const entries = await backendFetch<SiteContentEntry[]>('/api/admin/site-content');

  const groups = new Map<string, SiteContentEntry[]>();
  for (const entry of entries) {
    if (!groups.has(entry.group)) groups.set(entry.group, []);
    groups.get(entry.group)!.push(entry);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', margin: '0 0 0.25rem' }}>Site text</h1>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 'var(--fs-sm)' }}>
          The editorial copy on the homepage — headlines, intros, contact details. Each section saves separately.
        </p>
      </div>

      {Array.from(groups.entries()).map(([group, groupEntries]) => (
        <div key={group} className="ks-card" style={{ maxWidth: 640 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', margin: '0 0 1rem' }}>
            {GROUP_LABELS[group] || group}
          </h2>
          <form
            action={saveContentGroup.bind(
              null,
              groupEntries.map((e) => e.key),
            )}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}
          >
            {groupEntries.map((entry) => {
              const fieldName = entry.key.substring(entry.key.indexOf('.') + 1);

              // S3 key rides along with its imageUrl field's upload widget — no separate row.
              if (fieldName === 'imageS3Key') return null;

              if (fieldName === 'imageUrl' && GROUP_IMAGE_ASPECT[group] !== undefined) {
                const s3KeyEntry = groupEntries.find((e) => e.key === `${group}.imageS3Key`);
                return (
                  <ImageUploadField
                    key={entry.key}
                    kind="site"
                    aspectRatio={GROUP_IMAGE_ASPECT[group]}
                    initialImageUrl={entry.value}
                    initialS3Key={s3KeyEntry?.value}
                    imageUrlFieldName={entry.key}
                    s3KeyFieldName={`${group}.imageS3Key`}
                  />
                );
              }

              const long = LONG_FIELDS.has(fieldName);
              return (
                <div key={entry.key}>
                  <label htmlFor={entry.key}>{entry.label}</label>
                  {long ? (
                    <textarea id={entry.key} name={entry.key} defaultValue={entry.value} />
                  ) : (
                    <input id={entry.key} name={entry.key} type="text" defaultValue={entry.value} />
                  )}
                </div>
              );
            })}
            <button className="ks-btn" type="submit" style={{ alignSelf: 'flex-start' }}>
              Save {GROUP_LABELS[group]?.toLowerCase() || group}
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}
