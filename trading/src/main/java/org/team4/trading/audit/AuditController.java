package org.team4.trading.audit;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;

import java.util.List;

@RestController
@RequestMapping("/api/audit")
public class AuditController {

    private final AuditService auditService;

    public AuditController(AuditService auditService) {
        this.auditService = auditService;
    }

    @Operation(summary = "Get all audit logs")
    @GetMapping("/logs")
    public List<AuditLog> getLogs() {
        return auditService.getLogs();
    }

    @Operation(summary = "Get error audit logs")
    @GetMapping("/errors/logs")
    public List<AuditLog> getErrorLogs() {
        return auditService.getLogs().stream()
                .filter(log -> "ERROR".equals(log.getLevel()))
                .toList();
    }
}
