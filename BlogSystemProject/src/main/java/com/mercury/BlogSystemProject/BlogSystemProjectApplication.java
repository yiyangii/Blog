package com.mercury.BlogSystemProject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;


@EnableDiscoveryClient

@SpringBootApplication
public class BlogSystemProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlogSystemProjectApplication.class, args);
	}

}
