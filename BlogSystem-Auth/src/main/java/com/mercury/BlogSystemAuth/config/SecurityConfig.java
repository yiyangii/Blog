    package com.mercury.BlogSystemAuth.config;


    import com.mercury.BlogSystemAuth.security.JwtAuthenticationFilter;
    import com.mercury.BlogSystemAuth.service.UserDetailServiceImpl;
    import org.slf4j.Logger;
    import org.slf4j.LoggerFactory;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.security.authentication.AuthenticationManager;
    import org.springframework.security.authentication.ProviderManager;
    import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
    import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
    import org.springframework.security.config.annotation.web.builders.HttpSecurity;
    import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
    import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
    import org.springframework.security.crypto.password.PasswordEncoder;
    import org.springframework.security.web.SecurityFilterChain;
    import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
    import org.springframework.web.cors.CorsConfiguration;
    import org.springframework.web.cors.CorsConfigurationSource;
    import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

    import java.util.Arrays;
    import java.util.Collections;


    @Configuration
    @EnableWebSecurity
    public class SecurityConfig{

        @Autowired
        private UserDetailServiceImpl userDetailServiceImpl;
        @Autowired
        private JwtAuthenticationFilter jwtAuthenticationFilter;

        private static final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
            logger.info("Security Filter Chain is being configured");

            http.csrf().disable()  // 禁用CSRF
                    .authorizeRequests()  // 权限配置
                    .requestMatchers("/api/auth/**").permitAll()  // 允许登录和注册不需要认证
                    .anyRequest().authenticated()  // 其他所有请求需要认证
                    .and()
                    .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class).httpBasic();;  // 添加JWT过滤器

            return http.build();
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
            CorsConfiguration configuration = new CorsConfiguration();
            configuration.addAllowedOrigin("http://localhost:8081"); // You should only set trusted site here. e.g. http://localhost:4200 means only this site can access.
            configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","HEAD","OPTIONS"));
            configuration.addAllowedHeader("*");
            configuration.setAllowCredentials(true);
            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            source.registerCorsConfiguration("/**", configuration);
            return source;
        }
        @Bean
        public PasswordEncoder passwordEncoder() {

            return new BCryptPasswordEncoder();
        }


        @Autowired // @Autowired on function will autowired the parameters
        public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
            auth
                    .userDetailsService(userDetailServiceImpl)
                    .passwordEncoder(new BCryptPasswordEncoder())
            ;
        }

        @Bean
        public DaoAuthenticationProvider authenticationProvider() {
            DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
            provider.setUserDetailsService(userDetailServiceImpl);
            provider.setPasswordEncoder(passwordEncoder());
            return provider;
        }

        @Bean
        public AuthenticationManager customAuthenticationManager() {
            return new ProviderManager(Collections.singletonList(authenticationProvider()));
        }

    }
