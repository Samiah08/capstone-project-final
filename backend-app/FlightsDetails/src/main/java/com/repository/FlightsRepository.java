package com.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.entity.Flights;

@Repository
public interface FlightsRepository extends JpaRepository<Flights, Integer>{
	
	@Query("select fl.price from Flights fl where fl.destination=:destination and fl.company=:company")
	public float findflights(@Param("destination") String Destination, 
            			  @Param("company") String Company);
	
    Optional<Flights> findByDestinationAndCompany(String destination, String company);

}

