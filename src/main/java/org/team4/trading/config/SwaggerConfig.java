package org.team4.trading.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Trade Reconciliation System API")
                        .version("1.0.0")
                        .description("API for managing trades and reconciliation processes")
                        .contact(new Contact()
                                .name("Team 4")
                                .email("team4@company.com")));
    }
}