package com.cs4485.group2.widgetapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "widget_interests")
public class WidgetInterest {

    @EmbeddedId
    private WidgetInterestId id;

    @ManyToOne
    @MapsId("widgetId")
    @JoinColumn(name = "widget_id", nullable = false)
    private Widget widget;

    @ManyToOne
    @MapsId("interestId")
    @JoinColumn(name = "interest_id", nullable = false)
    private Interest interest;

}