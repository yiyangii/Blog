package com.mercury.BlogSystemCommunity;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;


@EnableDiscoveryClient
@SpringBootApplication
public class BlogSystemCommunityApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlogSystemCommunityApplication.class, args);
	}

}
