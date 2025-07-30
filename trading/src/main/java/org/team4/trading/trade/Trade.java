package org.team4.trading.trade;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Entity
public class Trade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tradeId;
    private String instrument;
    private BigDecimal price;
    private Integer quantity;
    private String sourceSystem;
    private LocalDate tradeDate;

}
