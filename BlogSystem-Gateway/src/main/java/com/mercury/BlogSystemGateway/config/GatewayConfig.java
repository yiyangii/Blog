package com.mercury.BlogSystemGateway.config;

import com.mercury.BlogSystemGateway.filter.JwtGlobalFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Autowired
    private JwtGlobalFilter jwtGlobalFilter;

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder routeLocatorBuilder) {
        return routeLocatorBuilder.routes()
                .route("user_service", r -> r.path("/api/users/**")
                        .uri("lb://blog-system-User"))
                .route("message_service", r -> r.path("/api/messages/**")
                        .uri("lb://blog-system-Message"))
                .route("post_service", r -> r.path("/api/posts/**")
                        .uri("lb://blog-system-Post"))
                .route("category_service", r -> r.path("/api/categories/**")
                        .uri("lb://blog-system-Post"))
                .route("community_service", r -> r.path("/api/community/**")
                        .uri("lb://blog-system-Community"))
                .build();
    }

}
