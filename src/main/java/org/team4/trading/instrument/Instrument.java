package org.team4.trading.instrument;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Instrument {

    @Schema(description = "Unique identifier of the instrument", example = "1", required = true)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Schema(description = "Symbol of the instrument", example = "AAPL", required = true)
    private String symbol;

    @Schema(description = "Name of the instrument", example = "Apple Inc.", required = true)
    private String name;

    @Schema(description = "ISIN of the instrument", example = "US0378331005", required = true)
    private String isin;

}
