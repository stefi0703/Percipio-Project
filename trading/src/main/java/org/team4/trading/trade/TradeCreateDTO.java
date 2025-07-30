package org.team4.trading.trade;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
@Data
public class TradeCreateDTO {
    private String instrument;
    private BigDecimal price;
    private Integer quantity;
    private String sourceSystem;
    private LocalDate tradeDate;


}
