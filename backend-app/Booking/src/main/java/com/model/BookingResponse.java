package com.model;

public class BookingResponse {

	private float cost;         
    private String message;      

 
    public BookingResponse(float cost, String message) {
        this.cost = cost;
        this.message = message;
    }


    public float getCost() {
        return cost;
    }

    public void setCost(float cost) {
        this.cost = cost;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
	
}
