package com.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Payment {
	
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int payid;
private String emailid;
private String paymentmethod;
private int bookid;
private float price;
public int getPayid() {
	return payid;
}
public void setPayid(int payid) {
	this.payid = payid;
}
public String getEmailid() {
	return emailid;
}
public void setEmailid(String emailid) {
	this.emailid = emailid;
}
public String getPaymentmethod() {
	return paymentmethod;
}
public void setPaymentmethod(String paymentmethod) {
	this.paymentmethod = paymentmethod;
}
public int getBookid() {
	return bookid;
}
public void setBookid(int bookid) {
	this.bookid = bookid;
}
public float getPrice() {
	return price;
}
public void setPrice(float price) {
	this.price = price;
}

}
