package com.subash.sgdisposals.dto;

import lombok.Data;

@Data
public class AddNewReqResDto {

    private Long user_id;
    private String address;
    private String message;
}
