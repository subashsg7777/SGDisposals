package com.subash.sgdisposals.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BuyProductReqDto {

    @NotNull
    private Long user_id;

    @NotNull
    private Long product_id;

    @NotBlank
    private String Transactional_password;

    @NotNull
    private int quantity;
}
