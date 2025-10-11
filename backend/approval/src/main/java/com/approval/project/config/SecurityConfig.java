package com.approval.project.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // ✅ CORS 허용 (아래의 Bean과 연결됨)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                // ✅ CSRF 비활성화 (POST 요청 차단 방지)
                .csrf(csrf -> csrf.disable())
                // ✅ URL 접근 허용 설정
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/**").permitAll()
                        .anyRequest().permitAll()
                );

        return http.build();
    }

    // ✅ CORS 세부 설정 추가
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // 프론트엔드 주소 허용 (Vite의 기본 포트는 5173)
        configuration.addAllowedOrigin("http://localhost:5173");

        // 모든 HTTP 메서드 허용 (GET, POST, PUT, DELETE 등)
        configuration.addAllowedMethod("*");

        // 모든 헤더 허용
        configuration.addAllowedHeader("*");

        // 쿠키 포함 요청 허용
        configuration.setAllowCredentials(true);

        // 설정 적용 경로 등록
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
