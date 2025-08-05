package org.team4.trading.reconciliation;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class ReconciliationDifference {

    @Schema(description = "Unique identifier of the reconciliation difference", example = "1", required = true)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Schema(description = "Trade ID associated with the reconciliation difference", example = "TRADE123", required = true)
    private String tradeId;

    @Schema(description = "Field name of the reconciliation difference", example = "price", required = true)
    private String fieldName;

    @Schema(description = "Value in System A", example = "100.00", required = true)
    private String valueSystemA;

    @Schema(description = "Value in System B", example = "100.01", required = true)
    private String valueSystemB;

    @ManyToOne
    @JoinColumn(name = "reconciliation_run_id")
    private ReconciliationRun reconciliationRun;

}
