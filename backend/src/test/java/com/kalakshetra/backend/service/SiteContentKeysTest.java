package com.kalakshetra.backend.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.Test;

class SiteContentKeysTest {

    @Test
    void allDefsHaveUniqueKeys() {
        long distinctKeys = SiteContentKeys.ALL.stream().map(SiteContentKeys.Def::key).distinct().count();
        assertThat(distinctKeys).isEqualTo(SiteContentKeys.ALL.size());
    }

    @Test
    void validatesKnownKeys() {
        assertThat(SiteContentKeys.isValidKey("contact.whatsappNumber")).isTrue();
        assertThat(SiteContentKeys.isValidKey("not.a.real.key")).isFalse();
    }

    @Test
    void findThrowsForUnknownKey() {
        assertThatThrownBy(() -> SiteContentKeys.find("nope")).isInstanceOf(IllegalArgumentException.class);
    }
}
