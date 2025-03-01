package com.cs4485.group2.widgetapp.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserDto {
    private long id;
    private String username;
    private String email;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
