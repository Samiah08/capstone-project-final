package com.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entity.Booking;
import com.model.BookingResponse;
import com.service.BookingService;

import java.util.List;
import java.util.Map;

import org.apache.hc.core5.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

@CrossOrigin
@Controller
@RequestMapping("/booking")
public class BookingController {
	
	@Autowired
	BookingService bookingService;

//	http://localhost:9393/booking/create
@PostMapping(value = "/create",consumes = MediaType.APPLICATION_JSON_VALUE)
@ResponseBody
public BookingResponse bookFlights(@RequestBody Booking booking) {
	return bookingService.bookFlights(booking);
}

//http://localhost:9393/booking/find
@PostMapping(value = "/find",consumes = MediaType.APPLICATION_JSON_VALUE)
@ResponseBody
public BookingResponse findflights(@RequestBody Booking booking) {
	return bookingService.findflights(booking);
}

//http://localhost:9393/booking/findbooking/{emailid}
@GetMapping(value = "findbooking/{emailid}")
public ResponseEntity<Integer> findbookid(@PathVariable("emailid") String emailid) {
    try {
        int bookId = bookingService.findbookid(emailid);
        return ResponseEntity.ok(bookId); // Return the book ID wrapped in ResponseEntity
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR).body(-1); // Return error status and -1 in the body
    }
}

//http://localhost:9393/booking/getprice/{bookid}
@GetMapping(value = "/getprice/{bookid}")
public ResponseEntity<Float> findprice(
		@PathVariable("bookid")int bookid){	
try {
	float cost = bookingService.findprice(bookid);
	return ResponseEntity.ok(cost);
}catch(DataAccessException e) {
	return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR)
			.body(null);
}catch (Exception e){
	return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR)
			.body(null);
}
}

}
