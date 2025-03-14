package com.cs4485.group2.widgetapp.model;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import lombok.EqualsAndHashCode;

@Embeddable
@EqualsAndHashCode
public class WidgetInterestId implements Serializable {
    private Long widgetId;
    private Long interestId;
    //TODO default constructor + getters and setters maybe using Lombok annotations
}