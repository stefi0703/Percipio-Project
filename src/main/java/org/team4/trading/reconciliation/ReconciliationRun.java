package org.team4.trading.reconciliation;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

import io.swagger.v3.oas.annotations.media.Schema;

@Data
@Entity
public class ReconciliationRun {

    @Schema(description = "Unique identifier of the reconciliation run", example = "1", required = true)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Schema(description = "Date and time when the reconciliation run was executed", example = "2023-10-01T12:00:00", required = true)
    private LocalDateTime runDate;

    @Schema(description = "Status of the reconciliation run", example = "COMPLETED", required = true)
    private String status;

    @Schema(description = "Number of matched records", example = "100", required = true)
    private Integer matchedCount;

    @Schema(description = "Number of unmatched records", example = "5", required = true)
    private Integer unmatchedCount;

}
