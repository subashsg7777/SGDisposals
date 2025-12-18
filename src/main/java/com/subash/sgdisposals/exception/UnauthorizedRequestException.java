package com.subash.sgdisposals.exception;

public class UnauthorizedRequestException extends RuntimeException{

    private final String message;

    public UnauthorizedRequestException(String message){
        this.message = message;
    }
}
