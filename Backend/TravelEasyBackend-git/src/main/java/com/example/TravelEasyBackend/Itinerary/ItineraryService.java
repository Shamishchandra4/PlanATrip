package com.example.TravelEasyBackend.Itinerary;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import java.util.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import com.fasterxml.jackson.databind.ObjectMapper;
@Service
public class ItineraryService {
    public String invokeGenerativeAI(ItineraryModel itineraryModel) throws IOException, InterruptedException {
        ClassPathResource resource = new ClassPathResource("static/generateAI.js");
        String scriptPath = resource.getFile().getAbsolutePath();
        StringBuilder promptBuilder = new StringBuilder();

        promptBuilder.append("Generate a detailed travel itinerary for a ")
                .append(itineraryModel.getPreference()) // For example, "luxury"
                .append(" trip to ")
                .append(itineraryModel.getDestination())
                .append(" from ")
                .append(itineraryModel.getStartDate())
                .append(" to ")
                .append(itineraryModel.getEndDate())
                .append(". The itinerary should cater to ")
                .append(itineraryModel.getTravelers())
                .append(" travelers with interests in ")
                .append(itineraryModel.getInterests())
                .append(".\n\n")
                .append("Please include:\n")
                .append("1. A day-by-day breakdown of activities.\n")
                .append("2. Recommended restaurants that offer fine dining experiences.\n")
                .append("3. Suggested cultural and art-related attractions to visit.\n")
                .append("4. Tips for traveling in ")
                .append(itineraryModel.getDestination())
                .append(" during this time, including any special events or festivals that may be happening.\n")
                .append("5. A summary of the total estimated budget for the trip.\n\n")
                .append("Ensure the itinerary is engaging and includes unique experiences that reflect the travelers' interests.")
                .append("don not include any *");

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
