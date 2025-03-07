package com.cs4485.group2.widgetapp.service.impl;

import com.cs4485.group2.widgetapp.dto.WidgetDto;
import com.cs4485.group2.widgetapp.exception.ResourceNotFoundException;
import com.cs4485.group2.widgetapp.mapper.WidgetMapper;
import com.cs4485.group2.widgetapp.model.Widget;
import com.cs4485.group2.widgetapp.repository.WidgetRepository;
import com.cs4485.group2.widgetapp.service.WidgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WidgetServiceImpl implements WidgetService {
    private WidgetRepository widgetRepository;
    @Autowired
    public WidgetServiceImpl(WidgetRepository widgetRepository)
    {
        this.widgetRepository = widgetRepository;
    }

    @Override
    public WidgetDto createWidget(WidgetDto widgetDto) {
        Widget widget = WidgetMapper.mapToWidget(widgetDto);
        Widget savedWidget = widgetRepository.save(widget);
        return WidgetMapper.mapToWidgetDto(savedWidget);
    }

    @Override
    public WidgetDto getWidgetById(Long widgetId) {
        Widget widget = widgetRepository.findById(widgetId).orElseThrow(() ->
                new ResourceNotFoundException("Widget does not exist with the given id: " + widgetId));
        return WidgetMapper.mapToWidgetDto(widget);
    }

    @Override
    public List<WidgetDto> getAllWidgets() {
        List<Widget> widgets = widgetRepository.findAll();
        return widgets.stream().map( widget -> WidgetMapper.mapToWidgetDto(widget)).collect(Collectors.toList());
    }

    @Override
    public WidgetDto updateWidget(Long widgetId, WidgetDto updatedWidget) {
        Widget widget = widgetRepository.findById(widgetId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Widget does not exist with the given id: " + widgetId));
        widget.setTitle(updatedWidget.getTitle());
        widget.setDescription(updatedWidget.getDescription());
        Widget updatedWidgetObj = widgetRepository.save(widget);
        return WidgetMapper.mapToWidgetDto(updatedWidgetObj);
    }

    @Override
    public void deleteWidget(Long widgetId) {
        Widget widget = widgetRepository.findById(widgetId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Widget does not exist with the given id: " + widgetId));

        widgetRepository.deleteById(widget.getId());
    }
}
