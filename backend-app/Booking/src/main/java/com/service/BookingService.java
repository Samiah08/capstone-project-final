package com.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.entity.Booking;
import com.model.BookingResponse;
import com.repository.BookingRepository;

@Service
public class BookingService {
	
	@Autowired
	BookingRepository bookingRepository;
	
	@Autowired
	RestTemplate restTemplate;
	
	public BookingResponse bookFlights(Booking booking) {
		String emailid = booking.getEmailid();
		LocalDate departdate =booking.getDepartdate();
		LocalDate returndate =booking.getReturndate();
		String destination = booking.getDestination();
		String company = booking.getCompany();
		
		String name = restTemplate.getForObject(
				"http://localhost:9191/login/findname/" +emailid,
				String.class);
		if(name=="User not found with the loged in email ID") {
			return new BookingResponse(0,"booking cannot be made as user deatils are present");
		}else {
			booking.setFullname(name);
		}	
		try {
	        // Check if a booking already exists with the same email and destination
	        Optional<Booking> existingBooking = bookingRepository.findByEmailid(emailid);
	        if (existingBooking.isPresent()) {
	            return new BookingResponse(0, "You have already booked a flight to this destination.");
	        }

	        // Get the cost of the flight
			Float cost = restTemplate.getForObject(
					"http://localhost:9292/flight/findflights/"+destination +"/" +company,
					 Float.class);
            if (cost != null && cost > 0) {
                booking.setPrice(cost);
                bookingRepository.save(booking);
                return new BookingResponse(cost, "Flight is available the cost is £"+cost);
            } else {
                
                return new BookingResponse(0, "Flight is not available");
            }
        } catch (Exception e) {
          
            e.printStackTrace();
            return new BookingResponse(0, "Error occurred while fetching the price");
        }
    }
	public BookingResponse findflights(Booking booking) {
		String destination = booking.getDestination();
		String company = booking.getCompany();
		
		try {
			Float cost = restTemplate.getForObject(
					"http://localhost:9292/flight/findflights/"+destination +"/" +company,
					 Float.class);
            if (cost != null && cost > 0) {
                booking.setPrice(cost);
                return new BookingResponse(cost,"The flight price to " +destination +" with "+company +" is £"+cost);

            } else {
                
                return new BookingResponse(0, "Flight is not available");
            }
        } catch (Exception e) {
          
            e.printStackTrace();
            return new BookingResponse(0, "Error occurred while fetching the price");
        }
    }			
	
	public int findbookid(String emailid) {
		return bookingRepository.findBookingId(emailid);
	}
	
	public float findprice(int bookid) {
		float cost = bookingRepository.getpricefrombookid(bookid);
		return (cost !=0.0f) ? cost : 0.0f;
	}
	
}
