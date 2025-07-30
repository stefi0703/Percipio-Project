package org.team4.trading.reconciliation;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class ReconciliationDifference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tradeId;
    private String fieldName;
    private String valueSystemA;
    private String valueSystemB;

    @ManyToOne
    @JoinColumn(name = "reconciliation_run_id")
    private ReconciliationRun reconciliationRun;

}
