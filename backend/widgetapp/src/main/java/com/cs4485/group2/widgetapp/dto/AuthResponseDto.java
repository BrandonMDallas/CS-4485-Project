package com.cs4485.group2.widgetapp.dto;

import lombok.Data;

@Data
public class AuthResponseDto {
    private String accessToken;
    private String tokenType = "Bearer ";

    public AuthResponseDto(String accessToken)
    {
        this.accessToken = accessToken;
    }
}
