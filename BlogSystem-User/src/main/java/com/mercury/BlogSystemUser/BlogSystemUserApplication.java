package com.mercury.BlogSystemUser;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableTransactionManagement
@SpringBootApplication
public class BlogSystemUserApplication {
	public static void main(String[] args) {
		SpringApplication.run(BlogSystemUserApplication.class, args);
	}
}
