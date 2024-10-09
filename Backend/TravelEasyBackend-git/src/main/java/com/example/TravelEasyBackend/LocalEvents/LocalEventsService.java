package com.example.TravelEasyBackend.LocalEvents;

import com.example.TravelEasyBackend.Itinerary.ItineraryModel;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@Service
public class LocalEventsService {
    public String invokeGenerativeAI(LocalEventsModel itineraryModel) throws IOException, InterruptedException {
        ClassPathResource resource = new ClassPathResource("static/generateAI.js");
        String scriptPath = resource.getFile().getAbsolutePath();
        StringBuilder promptBuilder = new StringBuilder();
        promptBuilder.append("Find live events happening in ");
        promptBuilder.append(itineraryModel.getDestination());
        promptBuilder.append(" from ");
        promptBuilder.append(itineraryModel.getStartDate());
        promptBuilder.append(" to ");
        promptBuilder.append(itineraryModel.getEndDate());
        promptBuilder.append(". Please provide details of concerts, festivals, and any other events.");

        String s= promptBuilder.toString();
        ProcessBuilder processBuilder = new ProcessBuilder("node", scriptPath, s);
        processBuilder.redirectErrorStream(true);
        Process process = processBuilder.start();
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        StringBuilder output = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            output.append(line).append("\n");
        }
        process.waitFor();
        return output.toString().trim().replace('*', ' ');
    }
}
