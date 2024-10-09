package com.example.TravelEasyBackend.Itinerary;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@Scope("prototype")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItineraryModel {
    private String destination;   // Corresponds to itineraryData.destination
    private String startDate;  // Corresponds to itineraryData.startDate
    private String endDate;    // Corresponds to itineraryData.endDate
    private String preference;    // Corresponds to itineraryData.preference
    private String budget;        // Corresponds to itineraryData.budget
    private String travelers;    // Corresponds to itineraryData.travelers
    private String interests;     // Corresponds to itineraryData.interests
}

