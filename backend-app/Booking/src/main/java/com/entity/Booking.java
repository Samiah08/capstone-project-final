package com.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Booking {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int bookid;
private String emailid;
private String fullname;
@Column(nullable = false)
private LocalDate departdate;
@Column(nullable = false)
private LocalDate returndate;
private String destination;
private String company;
private float price;
public int getBookid() {
	return bookid;
}
public void setBookid(int bookid) {
	this.bookid = bookid;
}
public String getEmailid() {
	return emailid;
}
public void setEmailid(String emailid) {
	this.emailid = emailid;
}
public String getFullname() {
	return fullname;
}
public void setFullname(String fullname) {
	this.fullname = fullname;
}
public LocalDate getDepartdate() {
	return departdate;
}
public void setDepartdate(LocalDate departdate) {
	this.departdate = departdate;
}
public LocalDate getReturndate() {
	return returndate;
}
public void setReturndate(LocalDate returndate) {
	this.returndate = returndate;
}
public String getDestination() {
	return destination;
}
public void setDestination(String destination) {
	this.destination = destination;
}
public String getCompany() {
	return company;
}
public void setCompany(String company) {
	this.company = company;
}
public float getPrice() {
	return price;
}
public void setPrice(float price) {
	this.price = price;
}

}
