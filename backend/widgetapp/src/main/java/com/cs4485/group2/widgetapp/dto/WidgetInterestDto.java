package com.cs4485.group2.widgetapp.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WidgetInterestDto {
    private Long widgetId;
    private Long interestId;
    // TODO maybe include the interest details
    private InterestDto interest;
}
