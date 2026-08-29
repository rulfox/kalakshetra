package com.kalakshetra.backend.config;

import com.kalakshetra.backend.domain.Category;
import com.kalakshetra.backend.domain.Item;
import com.kalakshetra.backend.domain.LookbookSlide;
import com.kalakshetra.backend.repository.CategoryRepository;
import com.kalakshetra.backend.repository.ItemRepository;
import com.kalakshetra.backend.repository.LookbookSlideRepository;
import com.kalakshetra.backend.repository.SiteContentRepository;
import com.kalakshetra.backend.service.SiteContentKeys;
import java.util.LinkedHashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Dev-only seed data that mirrors, verbatim, what is hardcoded today in
 * {@code ui_kits/website/sections.jsx} (PRODUCTS, LOOK_SLIDES, and every editorial string) plus
 * every {@link SiteContentKeys} default. This *is* the "migrate hardcoded content into the DB"
 * step — running the backend locally with the {@code dev} profile serves an API that reproduces
 * today's live site content exactly.
 */
@Component
@Profile("dev")
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final CategoryRepository categoryRepository;
    private final ItemRepository itemRepository;
    private final LookbookSlideRepository lookbookSlideRepository;
    private final SiteContentRepository siteContentRepository;

    public DataSeeder(
            CategoryRepository categoryRepository,
            ItemRepository itemRepository,
            LookbookSlideRepository lookbookSlideRepository,
            SiteContentRepository siteContentRepository) {
        this.categoryRepository = categoryRepository;
        this.itemRepository = itemRepository;
        this.lookbookSlideRepository = lookbookSlideRepository;
        this.siteContentRepository = siteContentRepository;
    }

    @Override
    @Transactional
    public void run(String... args) {
        seedCategoriesAndItems();
        seedLookbook();
        seedSiteContent();
    }

    private void seedCategoriesAndItems() {
        if (categoryRepository.count() > 0) {
            return;
        }
        Category men = categoryRepository.save(Category.builder().slug("men").name("Men").sortOrder(0).build());
        Category women = categoryRepository.save(Category.builder().slug("women").name("Women").sortOrder(1).build());
        Category kids = categoryRepository.save(Category.builder().slug("kids").name("Kids").sortOrder(2).build());

        int[] menOrder = {0};
        int[] womenOrder = {0};
        int[] kidsOrder = {0};

        itemRepository.save(item(
                "kathakali-maestro",
                "Kathakali Maestro",
                "Kathakali face in temple reds & Kathakali green",
                men,
                "assets/products/kathakali_masestro.png",
                "green",
                false,
                menOrder[0]++));
        itemRepository.save(item(
                "theyyam-crown",
                "Theyyam Crown",
                "Theyyam mask & crown, painted in fire reds",
                men,
                "assets/products/theyyam_crown.png",
                "red",
                false,
                menOrder[0]++));
        itemRepository.save(item(
                "guruvayurappan",
                "Guruvayurappan",
                "Krishna of Guruvayur, in gold & indigo",
                men,
                "assets/products/guruvayoorappan.png",
                "indigo",
                false,
                menOrder[0]++));
        itemRepository.save(item(
                "peacock-pattachitra",
                "Peacock (Pattachitra)",
                "Temple-mural peacock, brushed by hand",
                men,
                "assets/products/peacock.png",
                "green",
                false,
                menOrder[0]++));
        itemRepository.save(item(
                "gold-mandala", "Gold Mandala", "A single Kasavu-gold mandala on ivory", women, null, "gold", false, womenOrder[0]++));
        itemRepository.save(
                item("lotus-whisper", "Lotus Whisper", "New pieces arriving", women, null, "gold", true, womenOrder[0]++));
        itemRepository.save(item(
                "little-ganesha", "Little Ganesha", "Ganesha motif for the smallest canvas", kids, null, "red", false, kidsOrder[0]++));
        itemRepository.save(item(
                "parrot-mango",
                "Parrot & Mango",
                "Temple-mural birds in mustard & green",
                kids,
                null,
                "green",
                false,
                kidsOrder[0]++));

        log.info("Seeded 3 categories and 8 items from today's live site content");
    }

    private Item item(
            String slug,
            String title,
            String theme,
            Category category,
            String imageUrl,
            String categoryTone,
            boolean comingSoon,
            int sortOrder) {
        return Item.builder()
                .slug(slug)
                .title(title)
                .themeDescription(theme)
                .category(category)
                .imageUrl(imageUrl)
                .imageAlt(imageUrl != null ? title + " — hand-painted " + theme : null)
                .categoryTone(categoryTone)
                .comingSoon(comingSoon)
                .published(true)
                .sortOrder(sortOrder)
                .build();
    }

    private void seedLookbook() {
        if (lookbookSlideRepository.count() > 0) {
            return;
        }
        String placeholder = "assets/placeholders/lookbook.svg";
        lookbookSlideRepository.save(slide(placeholder, "Lookbook slide 1", "Worn in Kerala", "A painted shirt with the set-mundu.", 0));
        lookbookSlideRepository.save(
                slide(placeholder, "Lookbook slide 2", "Pattachitra", "Temple-mural peacock, brushed by hand.", 1));
        lookbookSlideRepository.save(
                slide(placeholder, "Lookbook slide 3", "Kathakali", "A face of the festival, on cotton.", 2));
        lookbookSlideRepository.save(slide(placeholder, "Lookbook slide 4", "Gold Mandala", "Kasavu gold, quietly placed.", 3));
        log.info("Seeded 4 lookbook slides from today's live site content");
    }

    private LookbookSlide slide(String imageUrl, String alt, String eyebrow, String caption, int sortOrder) {
        return LookbookSlide.builder()
                .imageUrl(imageUrl)
                .imageAlt(alt)
                .eyebrow(eyebrow)
                .caption(caption)
                .sortOrder(sortOrder)
                .build();
    }

    private void seedSiteContent() {
        if (siteContentRepository.count() > 0) {
            return;
        }
        for (SiteContentKeys.Def def : SiteContentKeys.ALL) {
            siteContentRepository.save(com.kalakshetra.backend.domain.SiteContent.builder()
                    .key(def.key())
                    .value(def.defaultValue())
                    .label(def.label())
                    .group(def.group())
                    .build());
        }
        log.info("Seeded {} site-content entries with today's default copy", SiteContentKeys.ALL.size());
    }
}
