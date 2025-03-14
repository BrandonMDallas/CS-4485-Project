package com.cs4485.group2.widgetapp.mapper;

import com.cs4485.group2.widgetapp.dto.InterestDto;
import com.cs4485.group2.widgetapp.model.Interest;


public class InterestMapper {
    public static InterestDto mapToInterestDto(Interest interest){
        return InterestDto.builder()
                .id(interest.getId())
                .name(interest.getName())
                .description(interest.getDescription())
                .createdAt(interest.getCreatedAt())
                .updatedAt(interest.getUpdatedAt())
                .build();
    }
    public static Interest mapToInterest(InterestDto interestDto) {
        return new Interest(
                interestDto.getId(),
                interestDto.getName(),
                interestDto.getDescription(),
                interestDto.getCreatedAt(),
                interestDto.getUpdatedAt()
        );
    }
}
