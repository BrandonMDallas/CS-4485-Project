package com.cs4485.group2.widgetapp.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class WidgetDto {
    private long id;
    private long userId;
    private String title;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
