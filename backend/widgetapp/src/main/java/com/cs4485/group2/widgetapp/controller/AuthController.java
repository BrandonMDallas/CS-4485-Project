package com.cs4485.group2.widgetapp.controller;

import com.cs4485.group2.widgetapp.dto.LoginRequestDto;
import com.cs4485.group2.widgetapp.dto.UserDto;
import com.cs4485.group2.widgetapp.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequest) {
        // Call your authentication method (this method should verify the credentials)
        UserDto userDto = userService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());

        if (userDto != null) {
            // Optionally generate a token here (like a JWT) and include it in the response
            return ResponseEntity.ok(userDto);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}