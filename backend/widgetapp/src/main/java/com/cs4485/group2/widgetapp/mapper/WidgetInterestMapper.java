package com.cs4485.group2.widgetapp.mapper;

import com.cs4485.group2.widgetapp.dto.WidgetInterestDto;
import com.cs4485.group2.widgetapp.model.WidgetInterest;

public class WidgetInterestMapper {
    public static WidgetInterestDto mapToWidgetInterestDto(WidgetInterest widgetInterest) {
        return WidgetInterestDto.builder()
                .widgetId(widgetInterest.getWidget().getId())
                .interestId(widgetInterest.getInterest().getId())
                .interest(InterestMapper.mapToInterestDto(widgetInterest.getInterest()))
                .build();
    }

    //TODO Figure out how we want to map this
    /**
    public static WidgetInterest mapToWidgetInterest(WidgetInterestDto widgetInterestDto) {
        return new WidgetInterest(
                widgetInterestDto.getWidgetId(),
                widgetInterestDto.getInterestId(),
                InterestMapper.mapToInterest(widgetInterestDto.getInterest())
        );
    }
     **/
}