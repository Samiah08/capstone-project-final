package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.Payment;
import com.service.PaymentService;

@CrossOrigin
@RestController
@RequestMapping("payment")
public class PaymentController {
	
	@Autowired
	PaymentService paymentService;
	
//	http://localhost:9494/payment/create/
	@PostMapping(value = "/create")
	public String createPayment(@RequestBody Payment payment) {
		return paymentService.createPayment(payment);
	}

}
