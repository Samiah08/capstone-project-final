package com.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Login;
import com.exception.UserNotFoundException;
import com.repository.LoginRepository;

@Service
public class LoginService {

	@Autowired
	LoginRepository loginRepository;
	
	public String signIn(Login login) {
		Optional<Login> result = loginRepository.findById(login.getEmailid());
		if(result.isPresent()) {
				Login ll=result.get();
				if(ll.getPassword().equals(login.getPassword())) {
					
					if(ll.getTypeofuser().equals(login.getTypeofuser()) && ll.getTypeofuser().equals("admin")) {
						return "Admin login successfully";
					}else if(ll.getTypeofuser().equals(login.getTypeofuser()) && ll.getTypeofuser().equals("user")){
						return "user login successfully";
					}else {
						return "wrong type of user";
					}
					
				}else {
					return "Password is invalid";
				}
		}else {
			return "EmailId is invalid";
		}
		
		
	}
	
	public String signUp(Login login) {
		Optional<Login> result = loginRepository.findById(login.getEmailid());
		if(result.isPresent()) {
			return "Emailid id already present";
		}else if(login.getTypeofuser().equals("admin")){
			return "You can't create admin account";
		}else {
			loginRepository.save(login);
			return "Account created successfully";
		}
		
	}
	 
//	public String getEmailByFirstAndLastName(String firstname, String lastname) {
//	    Login login = loginRepository.findByFirstnameAndLastname(firstname, lastname);
//	    if (login != null) {
//	        return login.getEmailid();
//	    } else {
//	        throw new RuntimeException("User not found");
//	    }
//	}
	
	public String getFullNameByEmail(String emailid) {
	    return Optional.ofNullable(loginRepository.findByEmailid(emailid))
	            .map(login -> login.getFirstname() + " " + login.getLastname())
	            .orElseThrow(() -> new UserNotFoundException("User not found with the loged in email ID"));
	}


	
}