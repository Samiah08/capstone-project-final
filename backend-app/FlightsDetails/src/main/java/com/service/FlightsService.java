package com.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Flights;
import com.repository.FlightsRepository;

@Service
public class FlightsService {
	
	@Autowired
	FlightsRepository flightsRepository;
	
	public String createFlights(Flights flights) {
	    // Check if a flight with the same flight ID already exists
	    Optional<Flights> resultById = flightsRepository.findById(flights.getFid());
	    if (resultById.isPresent()) {
	        return "Flights details already exist with the given Flight ID";
	    }

	    // Check if a flight with the same destination and company exists
	    Optional<Flights> resultByDetails = flightsRepository.findByDestinationAndCompany(flights.getDestination(), flights.getCompany());
	    if (resultByDetails.isPresent()) {
	        return "Same details exist with Flight ID = " + resultByDetails.get().getFid();
	    }

	    // Save the flight if no conflicts are found
	    flightsRepository.save(flights);
	    return "Flight details saved successfully";
	}

	
	public float findtheFlights(String Destination, String Company) {
		float cost = flightsRepository.findflights(Destination, Company);
		return (cost !=0.0f) ? cost : 0.0f;
	}
	
	public String deleteFlight(int fid) {
	    // Check if the flight exists in the database
	    Optional<Flights> resultById = flightsRepository.findById(fid);
	    if (resultById.isPresent()) {
	        // Delete the flight
	        flightsRepository.deleteById(fid);
	        return "Flight with ID " + fid + " deleted successfully";
	    } else {
	        return "Flight details don't exist for ID " + fid;
	    }
	}
	public List<Flights> getAllFlights() {
	    // Fetch all flights from the repository
	    return flightsRepository.findAll();
	}

	
}
