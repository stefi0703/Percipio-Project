package org.team4.trading.trade;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

import io.swagger.v3.oas.annotations.media.Schema;

@Data
@Entity
public class Trade {

    @Schema(description = "Unique identifier of the trade", example = "1", required = true)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Schema(description = "Unique identifier of the trade", example = "T1000", required = true)
    private String tradeId;

    @Schema(description = "Instrument associated with the trade", example = "AAPL", required = true)
    private String instrument;

    @Schema(description = "Price of the trade", example = "150.00", required = true)
    private BigDecimal price;

    @Schema(description = "Quantity of the trade", example = "10", required = true)
    private Integer quantity;

    @Schema(description = "Source system of the trade", example = "Bloomberg", required = true)
    private String sourceSystem;

    @Schema(description = "Date of the trade", example = "2023-10-01", required = true)
    private LocalDate tradeDate;

}
