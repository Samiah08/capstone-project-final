package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.entity.Login;

@Repository
public interface LoginRepository extends JpaRepository<Login, String>{

//	Login findByFirstnameAndLastname(String firstname, String lastname);
	
    Login findByEmailid(String emailid);


}