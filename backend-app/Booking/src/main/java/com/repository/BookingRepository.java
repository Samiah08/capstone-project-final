package com.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.entity.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
	
	@Query("select bk.bookid from Booking bk where bk.emailid = :emailid")
	public int findBookingId(@Param("emailid") String emailid);
	
	   // Custom query method to check for bookings by email 
    Optional<Booking> findByEmailid(String emailid);

    @Query("select bk.price from Booking bk where bk.bookid=:bookid")
	public float getpricefrombookid(@Param("bookid") int bookid);

}
