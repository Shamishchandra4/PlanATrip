package com.example.TravelEasyBackend.Itinerary;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class ItineraryController {

    @Autowired
    private ItineraryService itineraryService;

    @PostMapping("itinerary")
    public ResponseEntity<String> generateItinerary(@RequestBody ItineraryModel itineraryModel) {
        try {
            // Call the JavaScript code (we'll handle this below)
            //System.out.println(prompt);
            String result = itineraryService.invokeGenerativeAI(itineraryModel);

            // Return the result back to the client
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}
