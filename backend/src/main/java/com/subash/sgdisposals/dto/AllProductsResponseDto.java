package com.subash.sgdisposals.dto;

import com.subash.sgdisposals.entity.Product;
import lombok.Data;

import java.util.List;

@Data
public class AllProductsResponseDto {

    private List<Product> products;
}
