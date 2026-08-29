package com.kalakshetra.backend.config;

import com.kalakshetra.backend.domain.AdminUser;
import com.kalakshetra.backend.repository.AdminUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Creates the first admin account from env vars if the admin_user table is empty. There is no
 * self-service registration UI — this is the only way an admin account gets created, in every
 * profile (dev included, so local testing has a real login to exercise).
 */
@Component
public class AdminBootstrapRunner implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(AdminBootstrapRunner.class);

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final String bootstrapUsername;
    private final String bootstrapPassword;
    private final String bootstrapDisplayName;

    public AdminBootstrapRunner(
            AdminUserRepository adminUserRepository,
            PasswordEncoder passwordEncoder,
            @Value("${app.admin-bootstrap.username:}") String bootstrapUsername,
            @Value("${app.admin-bootstrap.password:}") String bootstrapPassword,
            @Value("${app.admin-bootstrap.display-name:Studio Admin}") String bootstrapDisplayName) {
        this.adminUserRepository = adminUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.bootstrapUsername = bootstrapUsername;
        this.bootstrapPassword = bootstrapPassword;
        this.bootstrapDisplayName = bootstrapDisplayName;
    }

    @Override
    public void run(String... args) {
        if (adminUserRepository.count() > 0) {
            return;
        }
        if (bootstrapUsername.isBlank() || bootstrapPassword.isBlank()) {
            log.warn(
                    "No admin_user rows exist and ADMIN_BOOTSTRAP_USERNAME/ADMIN_BOOTSTRAP_PASSWORD are not"
                            + " set — no admin account was created. Set both env vars and restart.");
            return;
        }
        adminUserRepository.save(AdminUser.builder()
                .username(bootstrapUsername)
                .passwordHash(passwordEncoder.encode(bootstrapPassword))
                .displayName(bootstrapDisplayName)
                .build());
        log.info("Bootstrapped initial admin account '{}'", bootstrapUsername);
    }
}
