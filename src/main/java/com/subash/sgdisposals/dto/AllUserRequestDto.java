package com.subash.sgdisposals.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class AllUserRequestDto {

    private String name;
    private Long user_id;
    private Long id;
    private String address;
}
