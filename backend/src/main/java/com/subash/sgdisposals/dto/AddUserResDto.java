package com.subash.sgdisposals.dto;

import com.subash.sgdisposals.RoleEnum;
import lombok.Data;

@Data
public class AddUserResDto {
    private String message;
    private String name;
    private String email;
    private RoleEnum role;
    private Long id;
}
