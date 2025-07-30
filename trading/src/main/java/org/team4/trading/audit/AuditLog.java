package org.team4.trading.audit;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

import io.swagger.v3.oas.annotations.media.Schema;

@Data
@Entity
public class AuditLog {

    @Schema(description = "Unique identifier of the audit log", example = "1", required = true)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Schema(description = "Timestamp of the audit log entry", example = "2023-10-01T12:00:00", required = true)
    private LocalDateTime timestamp;
    
    @Schema(description = "Level of the audit log entry", example = "INFO", required = true)
    private String level;
    
    @Schema(description = "Message of the audit log entry", example = "Trade executed successfully", required = true)
    private String message;

}
