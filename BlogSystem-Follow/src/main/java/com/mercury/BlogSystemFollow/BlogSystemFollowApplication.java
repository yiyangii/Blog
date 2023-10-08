package com.mercury.BlogSystemFollow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class BlogSystemFollowApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlogSystemFollowApplication.class, args);
	}

}
