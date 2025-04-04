package com.cs4485.group2.widgetapp.controller;

import com.cs4485.group2.widgetapp.dto.LoginDto;
import com.cs4485.group2.widgetapp.dto.LoginRequestDto;
import com.cs4485.group2.widgetapp.dto.RegisterDto;
import com.cs4485.group2.widgetapp.dto.UserDto;
import com.cs4485.group2.widgetapp.mapper.UserMapper;
import com.cs4485.group2.widgetapp.model.Role;
import com.cs4485.group2.widgetapp.repository.RoleRepository;
import com.cs4485.group2.widgetapp.repository.UserRepository;
import com.cs4485.group2.widgetapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;

    private UserService userService;

    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;


    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, UserService userService, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.userService = userService;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto)
    {
        if(userRepository.existsByUsername(registerDto.getUsername()))
        {
            return new ResponseEntity<>("Username is taken!", HttpStatus.BAD_REQUEST);
        }

        Role roles = roleRepository.findByName("USER").get();

        UserDto userDto = UserDto.builder()
                .username(registerDto.getUsername())
                .password(passwordEncoder.encode(registerDto.getPassword()))
                .roles(Collections.singletonList(roles))
                .build();

        userService.createUser(userDto);
        return new ResponseEntity<>("User registered success!",HttpStatus.OK);
    }
    //private final UserService userService;


    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto)
    {

    }
    /*
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

     */
}