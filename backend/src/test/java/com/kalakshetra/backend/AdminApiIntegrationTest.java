package com.kalakshetra.backend;

import static org.assertj.core.api.Assertions.assertThat;

import com.kalakshetra.backend.dto.AuthDtos.AuthResponse;
import com.kalakshetra.backend.dto.AuthDtos.LoginRequest;
import com.kalakshetra.backend.dto.CategoryDtos.CategoryRequest;
import com.kalakshetra.backend.dto.CategoryDtos.CategoryResponse;
import com.kalakshetra.backend.dto.ItemDtos.ItemRequest;
import com.kalakshetra.backend.dto.ItemDtos.ItemResponse;
import com.kalakshetra.backend.dto.NewsletterDtos.SubscribeRequest;
import com.kalakshetra.backend.dto.SiteContentDtos.PublicSiteContentResponse;
import com.kalakshetra.backend.dto.SiteContentDtos.UpdateRequest;
import com.kalakshetra.backend.dto.UploadDtos.PresignRequest;
import com.kalakshetra.backend.dto.UploadDtos.PresignResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.test.context.ActiveProfiles;

/**
 * End-to-end pass over the whole public+admin contract against a real (in-memory H2) database —
 * this is the closest thing to "boot the API and click through it" available in this sandbox.
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
class AdminApiIntegrationTest {

    @Autowired
    private TestRestTemplate rest;

    @BeforeEach
    void useApacheHttpClient() {
        // The JDK's HttpURLConnection (Spring's default SimpleClientHttpRequestFactory) mishandles
        // a 401 response to a POST with a body ("cannot retry due to server authentication, in
        // streaming mode"). Apache HttpClient5 doesn't have that bug.
        rest.getRestTemplate().setRequestFactory(new HttpComponentsClientHttpRequestFactory());
    }

    private HttpHeaders authHeaders() {
        LoginRequest login = new LoginRequest("testadmin", "testpassword123");
        AuthResponse auth = rest.postForObject("/api/admin/auth/login", login, AuthResponse.class);
        assertThat(auth).isNotNull();
        assertThat(auth.accessToken()).isNotBlank();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(auth.accessToken());
        return headers;
    }

    @Test
    void loginFailsWithWrongPassword() {
        LoginRequest login = new LoginRequest("testadmin", "wrong-password");
        ResponseEntity<String> response = rest.postForEntity("/api/admin/auth/login", login, String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    void adminEndpointsRejectRequestsWithoutAToken() {
        ResponseEntity<String> response = rest.getForEntity("/api/admin/categories", String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    void categoryAndItemRoundTripFromAdminToPublicApi() {
        HttpHeaders headers = authHeaders();

        CategoryRequest categoryRequest = new CategoryRequest("women", "Women");
        ResponseEntity<CategoryResponse> categoryResponse = rest.exchange(
                "/api/admin/categories",
                HttpMethod.POST,
                new HttpEntity<>(categoryRequest, headers),
                CategoryResponse.class);
        assertThat(categoryResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        Long categoryId = categoryResponse.getBody().id();

        ItemRequest itemRequest = new ItemRequest(
                "gold-mandala",
                "Gold Mandala",
                "A single Kasavu-gold mandala on ivory",
                categoryId,
                null,
                null,
                null,
                "gold",
                null,
                false,
                true);
        ResponseEntity<ItemResponse> itemResponse = rest.exchange(
                "/api/admin/items", HttpMethod.POST, new HttpEntity<>(itemRequest, headers), ItemResponse.class);
        assertThat(itemResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(itemResponse.getBody().categorySlug()).isEqualTo("women");

        CategoryResponse[] publicCategories = rest.getForObject("/api/public/categories", CategoryResponse[].class);
        assertThat(publicCategories).extracting(CategoryResponse::slug).contains("women");

        ItemResponse[] publicItems = rest.getForObject("/api/public/items?category=women", ItemResponse[].class);
        assertThat(publicItems).extracting(ItemResponse::slug).contains("gold-mandala");

        ItemResponse singleItem =
                rest.getForObject("/api/public/items/women/gold-mandala", ItemResponse.class);
        assertThat(singleItem.title()).isEqualTo("Gold Mandala");
    }

    @Test
    void presignReturnsAUsablePutUrlWithoutHittingRealAws() {
        HttpHeaders headers = authHeaders();
        PresignRequest request = new PresignRequest("photo.jpg", "image/jpeg", "items");

        ResponseEntity<PresignResponse> response = rest.exchange(
                "/api/admin/uploads/presign", HttpMethod.POST, new HttpEntity<>(request, headers), PresignResponse.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().uploadUrl()).contains("test-bucket");
        assertThat(response.getBody().s3Key()).startsWith("items/").endsWith(".jpg");
        assertThat(response.getBody().publicUrl()).isEqualTo("https://test-bucket.s3.ap-south-1.amazonaws.com/" + response.getBody().s3Key());
    }

    @Test
    void newsletterSubscribeRejectsDuplicateEmails() {
        SubscribeRequest request = new SubscribeRequest("someone@example.com");
        ResponseEntity<Void> first = rest.postForEntity("/api/public/newsletter", request, Void.class);
        assertThat(first.getStatusCode()).isEqualTo(HttpStatus.ACCEPTED);

        ResponseEntity<String> second = rest.postForEntity("/api/public/newsletter", request, String.class);
        assertThat(second.getStatusCode()).isEqualTo(HttpStatus.CONFLICT);
    }

    @Test
    void siteContentDefaultsArePublicAndEditableByAdmin() {
        PublicSiteContentResponse before = rest.getForObject("/api/public/site-content", PublicSiteContentResponse.class);
        assertThat(before.groups().get("hero")).containsEntry("headline", "Wearable art, painted by hand.");

        HttpHeaders headers = authHeaders();
        UpdateRequest update = new UpdateRequest("A brand new headline.");
        rest.exchange(
                "/api/admin/site-content/hero.headline",
                HttpMethod.PUT,
                new HttpEntity<>(update, headers),
                Void.class);

        PublicSiteContentResponse after = rest.getForObject("/api/public/site-content", PublicSiteContentResponse.class);
        assertThat(after.groups().get("hero")).containsEntry("headline", "A brand new headline.");
    }
}
