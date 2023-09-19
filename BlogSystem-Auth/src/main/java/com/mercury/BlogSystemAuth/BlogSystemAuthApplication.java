package com.mercury.BlogSystemAuth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class BlogSystemAuthApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlogSystemAuthApplication.class, args);
	}

}
