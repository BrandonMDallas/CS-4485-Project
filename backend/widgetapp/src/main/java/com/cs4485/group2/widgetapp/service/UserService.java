package com.cs4485.group2.widgetapp.service;

import com.cs4485.group2.widgetapp.dto.UserDto;

import java.util.List;

public interface UserService {
    UserDto createUser(UserDto userDto);

    UserDto getUserById(Long userId);

    UserDto getUserByUsername(String username);
    List<UserDto> getAllUsers();

    UserDto updateUser(Long userId, UserDto updatedUser);

    void deleteUser(Long userId);

    UserDto authenticate(String username, String password);
}
