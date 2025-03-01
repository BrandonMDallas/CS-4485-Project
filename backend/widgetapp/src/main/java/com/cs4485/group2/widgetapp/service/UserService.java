package com.cs4485.group2.widgetapp.service;

import com.cs4485.group2.widgetapp.dto.UserDto;

import java.util.List;

public interface UserService {
    List<UserDto> findAllUsers();
}
