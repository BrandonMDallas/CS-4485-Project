package com.cs4485.group2.widgetapp.mapper;

import com.cs4485.group2.widgetapp.dto.WidgetDto;
import com.cs4485.group2.widgetapp.model.Widget;

public class WidgetMapper {
    public static WidgetDto mapToWidgetDto(Widget widget) {
        return WidgetDto.builder()
                .id(widget.getId())
                .userId(widget.getUserId())
                .title(widget.getTitle())
                .description(widget.getDescription())
                .createdAt(widget.getCreatedAt())
                .updatedAt(widget.getUpdatedAt())
                .build();
    }

    public static Widget mapToWidget(WidgetDto widgetDto) {
        return new Widget(
                widgetDto.getId(),
                widgetDto.getUserId(),
                widgetDto.getTitle(),
                widgetDto.getDescription(),
                widgetDto.getCreatedAt(),
                widgetDto.getUpdatedAt()
        );
    }
}