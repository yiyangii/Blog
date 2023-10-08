package com.mercury.BlogSystemUserBehaviour;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class BlogSystemUserBehaviourApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlogSystemUserBehaviourApplication.class, args);
	}

}
