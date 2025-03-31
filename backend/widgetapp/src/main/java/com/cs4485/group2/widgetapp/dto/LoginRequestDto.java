package com.cs4485.group2.widgetapp.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginRequestDto {
    private String username;
    private String password;
}
