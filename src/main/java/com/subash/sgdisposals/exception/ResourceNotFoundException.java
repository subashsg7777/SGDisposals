package com.subash.sgdisposals.exception;

import lombok.Data;

@Data
public class ResourceNotFoundException extends RuntimeException{

    private final String message;

    public ResourceNotFoundException(String message) {
        this.message = message;
    }
}
