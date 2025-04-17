package com.cs4485.group2.widgetapp.mapper;

import com.cs4485.group2.widgetapp.dto.UserDto;
import com.cs4485.group2.widgetapp.model.Role;
import com.cs4485.group2.widgetapp.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class UserMapper {

    public static UserDto mapToUserDto(User user){
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .password(user.getPassword())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .roles(user.getRoles())
                .build();
    }

    public static User mapToUser(UserDto userDto) {
        return new User(
                userDto.getId(),
                userDto.getUsername(),
                userDto.getPassword(),
                userDto.getCreatedAt(),
                userDto.getUpdatedAt(),
                userDto.getRoles()
        );
    }
    private Collection<GrantedAuthority> mapRolesToAuthorities(List<Role> roles)
    {
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
    }
}
