package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.Login;
import com.exception.UserNotFoundException;
import com.service.LoginService;

@RequestMapping("login")
@RestController
@CrossOrigin
public class LoginController {
@Autowired
LoginService loginService;

    //http://localhost:9191/login/signin
	@PostMapping(value = "signin",consumes = MediaType.APPLICATION_JSON_VALUE)
	public String signIn(@RequestBody Login login) {
		return loginService.signIn(login);
	}
	//http://localhost:9191/login/signUp
	@PostMapping(value = "signup",consumes = MediaType.APPLICATION_JSON_VALUE)
	public String signUp(@RequestBody Login login) {
		return loginService.signUp(login);
	}
	
//	//http://localhost:9191/login/getemail/{firstname}/{lastname}}
//	@GetMapping(value = "getemail/{firstname}/{lastname}")
//	public String getEmailgetEmailByFirstAndLastName(@PathVariable("firstname") String firstname,
//			@PathVariable("lastname") String lastname) {
//		return loginService.getEmailByFirstAndLastName(firstname, lastname);
//	}
	//http://localhost:9191/login/findname/{emailid}
	@GetMapping("/findname/{emailid}")
	public ResponseEntity<String> getFullNameByEmail(@PathVariable String emailid) {
	    try {
	        String fullName = loginService.getFullNameByEmail(emailid);
	        return ResponseEntity.ok(fullName); // Returns "firstname,lastname" as plain text
	    } catch (UserNotFoundException ex) {
	        return ResponseEntity.status(404).body(ex.getMessage());
	    }
	}
	
}