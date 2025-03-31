package com.cs4485.group2.widgetapp.service.impl;

import com.cs4485.group2.widgetapp.dto.UserDto;
import com.cs4485.group2.widgetapp.exception.ResourceNotFoundException;
import com.cs4485.group2.widgetapp.mapper.UserMapper;
import com.cs4485.group2.widgetapp.model.User;
import com.cs4485.group2.widgetapp.repository.UserRepository;
import com.cs4485.group2.widgetapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDto createUser(UserDto userDto) {
        User user = UserMapper.mapToUser(userDto);
        User savedUser = userRepository.save(user);
        return UserMapper.mapToUserDto(savedUser);
    }

    @Override
    public UserDto getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User does not exist with the given id: " + userId));
        return UserMapper.mapToUserDto(user);
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map((user) -> UserMapper.mapToUserDto(user)).collect(Collectors.toList());
        //return users.stream().map(this::mapToUserDto).collect(Collectors.toList());
    }

    @Override
    public UserDto updateUser(Long userId, UserDto updatedUser) {
        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User does not exist with the given id: " + userId));
        user.setUsername(updatedUser.getUsername());
        user.setPassword(updatedUser.getPassword());
        User updatedUserObj = userRepository.save(user);
        return UserMapper.mapToUserDto(updatedUserObj);
    }

    @Override
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User does not exist with the given id: " + userId));

        userRepository.deleteById(user.getId());
    }
    @Override
    public UserDto authenticate(String username, String password) {
        // Find the user by username
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));

        if (user.getPassword().equals(password))
        {
            return UserMapper.mapToUserDto(user);
        }
        // Create a PasswordEncoder instance. In a real application, you would typically inject this bean.
        //PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        // Verify the password. Assuming user.getPassword() returns the hashed password.
        //if (passwordEncoder.matches(password, user.getPassword())) {
       //     return UserMapper.mapToUserDto(user);
        //}
        // If the password doesn't match, you can either return null or throw an exception (e.g., InvalidCredentialsException)
        return null;
    }
}
