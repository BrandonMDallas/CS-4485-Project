package com.cs4485.group2.widgetapp.service;

import com.cs4485.group2.widgetapp.dto.WidgetDto;

import java.util.List;

public interface WidgetService {
    WidgetDto createWidget(WidgetDto widgetDto);

    WidgetDto getWidgetById(Long widgetId);

    List<WidgetDto> getAllWidgets();

    WidgetDto updateWidget(Long widgetId, WidgetDto updatedWidget);

    void deleteWidget(Long widgetId);
}