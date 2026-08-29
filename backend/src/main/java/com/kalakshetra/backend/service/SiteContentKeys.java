package com.kalakshetra.backend.service;

import java.util.List;

/**
 * Allow-list of editable {@code SiteContent} keys. The DB schema is a generic key/value store,
 * but only these keys can be created/edited — this is what lets the Next.js frontend safely
 * type-map {@code /api/public/site-content} instead of rendering arbitrary admin-entered keys,
 * and what lets the admin portal group them into labeled tabs.
 */
public final class SiteContentKeys {

    public record Def(String key, String label, String group, String defaultValue) {}

    public static final List<Def> ALL = List.of(
            new Def("hero.eyebrow", "Eyebrow", "hero", "Mavelikkara · Kerala"),
            new Def("hero.headline", "Headline", "hero", "Wearable art, painted by hand."),
            new Def(
                    "hero.subcopy",
                    "Subcopy",
                    "hero",
                    "One-of-a-kind shirts and pieces, painted by hand in Mavelikkara, Kerala —"
                            + " made to order, never repeated."),
            new Def("philosophy.eyebrow", "Eyebrow", "philosophy", "The Philosophy"),
            new Def("philosophy.title", "Title", "philosophy", "Ayurvedic roots, painted by hand"),
            new Def(
                    "philosophy.intro",
                    "Intro paragraph",
                    "philosophy",
                    "Every piece begins on a blank weave and a quiet morning."),
            new Def(
                    "philosophy.quote",
                    "Founder quote",
                    "philosophy",
                    "I paint the way I practice medicine — slowly, by hand, with attention to what"
                            + " the body and the eye both need."),
            new Def("philosophy.quoteAuthor", "Quote author", "philosophy", "Dr. Aswathy Sudarsanan"),
            new Def("philosophy.quoteRole", "Quote author role", "philosophy", "Founder, Kalakshetra Handpaintings"),
            new Def("commission.eyebrow", "Eyebrow", "commission", "Custom Commission"),
            new Def("commission.title", "Title", "commission", "Have something in mind?"),
            new Def(
                    "commission.body",
                    "Body",
                    "commission",
                    "Tell us your theme and we'll hand-paint it just for you."),
            new Def("commission.footnote", "Footnote", "commission", "Price on enquiry."),
            new Def("story.imageUrl", "Studio photo", "story", "/assets/placeholders/portrait.svg"),
            new Def("story.imageS3Key", "Studio photo S3 key", "story", ""),
            new Def("story.eyebrow", "Eyebrow", "story", "Our Story"),
            new Def("story.title", "Title", "story", "Slow craft, from Kerala to your wardrobe"),
            new Def(
                    "story.intro",
                    "Intro paragraph",
                    "story",
                    "What began as a small studio in Mavelikkara is now a growing atelier of"
                            + " hand-painted wearable art."),
            new Def("story.stat1Value", "Stat 1 value", "story", "100%"),
            new Def("story.stat1Label", "Stat 1 label", "story", "hand painted"),
            new Def("story.stat2Value", "Stat 2 value", "story", "1-of-1"),
            new Def("story.stat2Label", "Stat 2 label", "story", ""),
            new Def("story.stat3Label", "Stat 3 label", "story", "Kerala-rooted"),
            new Def("howToOrder.step1Title", "Step 1 title", "howToOrder", "Tap Order on WhatsApp"),
            new Def(
                    "howToOrder.step1Body",
                    "Step 1 body",
                    "howToOrder",
                    "Message us the piece you love, straight from the site."),
            new Def("howToOrder.step2Title", "Step 2 title", "howToOrder", "We confirm the details"),
            new Def(
                    "howToOrder.step2Body",
                    "Step 2 body",
                    "howToOrder",
                    "Size, fabric and price — all discussed on WhatsApp."),
            new Def("howToOrder.step3Title", "Step 3 title", "howToOrder", "We hand-paint & ship"),
            new Def(
                    "howToOrder.step3Body",
                    "Step 3 body",
                    "howToOrder",
                    "Your piece is painted to order and shipped, India & worldwide."),
            new Def("contact.whatsappNumber", "WhatsApp number (digits, country code first)", "contact", "918547516011"),
            new Def("contact.phoneDisplay", "Phone (display)", "contact", "+91 85475 16011"),
            new Def("contact.email", "Email", "contact", "hello@kalakshetrahandpaintings.com"),
            new Def("contact.instagramHandle", "Instagram handle", "contact", "@kalakshetra_handpaintings"),
            new Def(
                    "contact.instagramUrl",
                    "Instagram URL",
                    "contact",
                    "https://instagram.com/kalakshetra_handpaintings"),
            new Def("contact.locationLine", "Location line", "contact", "Mavelikkara, Alappuzha, Kerala, India"),
            new Def("footer.tagline", "Footer tagline", "footer", "Hand Painted with Love"),
            new Def(
                    "footer.shippingLine",
                    "Shipping line",
                    "footer",
                    "Made to order in Kerala. Ships across India and worldwide."));

    public static boolean isValidKey(String key) {
        return ALL.stream().anyMatch(def -> def.key().equals(key));
    }

    public static Def find(String key) {
        return ALL.stream()
                .filter(def -> def.key().equals(key))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unknown site content key: " + key));
    }

    private SiteContentKeys() {}
}
