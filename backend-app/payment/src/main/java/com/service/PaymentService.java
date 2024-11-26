package com.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import com.entity.Payment;
import com.repository.PaymentRepository;

@Service
public class PaymentService {

	@Autowired
	PaymentRepository paymentRepository;
	
	@Autowired
	RestTemplate restTemplate;
	
	public String createPayment(Payment payment) {
	    String emailid = payment.getEmailid();
	    String paymentmethod = payment.getPaymentmethod();

	    // Check if the booking exists for the provided email ID
	    int result = restTemplate.getForObject(
	            "http://localhost:9393/booking/findbooking/" + emailid, 
	            Integer.class);
	    
	    if (result == -1) {
	        return "Payment cannot be met as customer details don't exist";
	    } else {
	        payment.setBookid(result);
	    }

	    int bookid = payment.getBookid();

	    // Check if payment for this bookid already exists
	    Optional<Payment> existingPayment = paymentRepository.findByBookid(bookid);
	    if (existingPayment.isPresent()) {
	        return "Payment has already been made for this booking ID.";
	    }

	    // Retrieve cost of the booking
	    Float cost = restTemplate.getForObject(
	            "http://localhost:9393/booking/getprice/" + bookid,
	            Float.class);

	    if (cost != null && cost > 0) {
	        payment.setPrice(cost);
	        paymentRepository.save(payment);
	        return "Payment successful";
	    } else {
	        return "Flight is not available";
	    }
	}

	}
