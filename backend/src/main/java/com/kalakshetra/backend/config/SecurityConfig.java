package com.kalakshetra.backend.config;

import com.kalakshetra.backend.security.JwtAuthFilter;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    private final CorsProperties corsProperties;
    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(CorsProperties corsProperties, JwtAuthFilter jwtAuthFilter) {
        this.corsProperties = corsProperties;
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/public/**").permitAll()
                        .requestMatchers("/api/admin/auth/**").permitAll()
                        .requestMatchers("/actuator/health").permitAll()
                        .requestMatchers("/api/admin/**").authenticated()
                        .anyRequest().denyAll())
                // A JSON 401 (not the framework's 403-for-anonymous default) so clients can
                // reliably tell "needs to (re)authenticate" apart from "authenticated but denied".
                .exceptionHandling(ex -> ex.authenticationEntryPoint(this::respondUnauthorized))
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    private void respondUnauthorized(
            jakarta.servlet.http.HttpServletRequest request,
            jakarta.servlet.http.HttpServletResponse response,
            org.springframework.security.core.AuthenticationException authException)
            throws java.io.IOException {
        response.setStatus(org.springframework.http.HttpStatus.UNAUTHORIZED.value());
        response.setContentType("application/json");
        response.getWriter().write(
                "{\"status\":401,\"error\":\"Unauthorized\",\"message\":\"Authentication required\"}");
    }

    private CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        CorsConfiguration publicConfig = new CorsConfiguration();
        publicConfig.setAllowedOrigins(corsProperties.publicAllowedOrigins());
        publicConfig.setAllowedMethods(List.of("GET", "POST"));
        publicConfig.setAllowedHeaders(List.of("*"));
        source.registerCorsConfiguration("/api/public/**", publicConfig);

        CorsConfiguration adminConfig = new CorsConfiguration();
        adminConfig.setAllowedOrigins(corsProperties.adminAllowedOrigins());
        adminConfig.setAllowedMethods(List.of(
                HttpMethod.GET.name(),
                HttpMethod.POST.name(),
                HttpMethod.PUT.name(),
                HttpMethod.PATCH.name(),
                HttpMethod.DELETE.name()));
        adminConfig.setAllowedHeaders(List.of("*"));
        adminConfig.setAllowCredentials(true);
        source.registerCorsConfiguration("/api/admin/**", adminConfig);

        return source;
    }
}
