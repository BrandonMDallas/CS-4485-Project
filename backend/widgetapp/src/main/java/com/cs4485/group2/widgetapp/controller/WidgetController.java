package com.cs4485.group2.widgetapp.controller;

import com.cs4485.group2.widgetapp.dto.UserDto;
import com.cs4485.group2.widgetapp.dto.WidgetDto;
import com.cs4485.group2.widgetapp.service.WidgetService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/widgets")

public class WidgetController {
    private WidgetService widgetService;
    @PostMapping
    public ResponseEntity<WidgetDto> createWidget(@RequestBody WidgetDto widgetDto){
        WidgetDto savedWidgetDto = widgetService.createWidget(widgetDto);
        return new ResponseEntity<>(savedWidgetDto, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<WidgetDto> getWidgetById(@PathVariable("id") Long widgetId)
    {
        WidgetDto savedWidgetDto = widgetService.getWidgetById(widgetId);
        return ResponseEntity.ok(savedWidgetDto);
    }

    @GetMapping()
    public ResponseEntity<List<WidgetDto>> getAllWidgets(){
        List<WidgetDto> widgets = widgetService.getAllWidgets();
        return ResponseEntity.ok(widgets);
    }

    @PutMapping("{id}")
    public ResponseEntity<WidgetDto> updateWidget(@PathVariable("id") Long widgetId, @RequestBody WidgetDto updatedWidget )
    {
        WidgetDto widgetDto = widgetService.updateWidget(widgetId, updatedWidget);
        return ResponseEntity.ok(widgetDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long widgetId)
    {
        widgetService.deleteWidget(widgetId);
        return ResponseEntity.ok("Widget deleted successfully!");
    }
}
