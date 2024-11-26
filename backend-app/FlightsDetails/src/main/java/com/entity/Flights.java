package com.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Flights {

@Id
private int fid;
private String destination;
private String company;
private float price;
public int getFid() {
	return fid;
}
public void setFid(int fid) {
	this.fid = fid;
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
