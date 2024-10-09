package com.example.TravelEasyBackend.LocalEvents;

import com.example.TravelEasyBackend.Itinerary.ItineraryModel;
import com.example.TravelEasyBackend.Itinerary.ItineraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class LocalEventsController {

    @Autowired
    private LocalEventsService service;

    @PostMapping("events")
    public ResponseEntity<String> generateItinerary(@RequestBody LocalEventsModel eventModel) {
        try {
            String result = service.invokeGenerativeAI(eventModel);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}