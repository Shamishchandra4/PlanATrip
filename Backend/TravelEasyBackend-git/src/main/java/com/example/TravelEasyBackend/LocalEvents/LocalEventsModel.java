package com.example.TravelEasyBackend.LocalEvents;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("prototype")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LocalEventsModel {
    private String destination;
    private String startDate;
    private String endDate;
}
