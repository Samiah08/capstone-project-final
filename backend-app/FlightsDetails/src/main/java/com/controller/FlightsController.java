package com.controller;

import java.util.List;

import org.apache.hc.core5.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.dao.DataAccessException;

import com.entity.Flights;
import com.service.FlightsService;
@CrossOrigin
@RestController
@RequestMapping("flight")
public class FlightsController {

	@Autowired
	FlightsService flightsService;
	
	//http://localhost:9292/flight/create
	@PostMapping(value = "create",consumes = MediaType.APPLICATION_JSON_VALUE)
	public String createFlights(@RequestBody Flights flights) {
		return flightsService.createFlights(flights);
	}
	
	//http://localhost:9292/flight/findflights/{Destination}/{Company}
	@GetMapping(value = "/findflights/{Destination}/{Company}")
	public ResponseEntity<Float> findflights(
			@PathVariable("Destination")String Destination,
			@PathVariable("Company") String Company){	
	try {
		float cost = flightsService.findtheFlights(Destination, Company);
		return ResponseEntity.ok(cost);
	}catch(DataAccessException e) {
		return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR)
				.body(null);
	}catch (Exception e){
		return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR)
				.body(null);
	}
}
	    @DeleteMapping(value = "/delete/{fid}")
	    public ResponseEntity<String> deleteFlight(@PathVariable("fid") int fid) {
	        try {
	            String response = flightsService.deleteFlight(fid);
	            return ResponseEntity.ok(response);
	        } catch (DataAccessException e) {
	            return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR)
	                    .body("Error occurred while accessing the database");
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR)
	                    .body("An unexpected error occurred");
	        }
	    }

	// http://localhost:9292/flight/all
	@GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Flights>> getAllFlights() {
	    try {
	        List<Flights> flights = flightsService.getAllFlights();
	        return ResponseEntity.ok(flights);
	    } catch (DataAccessException e) {
	        return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR)
	                .body(null);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR)
	                .body(null);
	    }
	}

}
