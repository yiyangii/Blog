package com.mercury.BlogSystemGateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;


@EnableDiscoveryClient
@SpringBootApplication
public class BlogSystemGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlogSystemGatewayApplication.class, args);
	}

}
