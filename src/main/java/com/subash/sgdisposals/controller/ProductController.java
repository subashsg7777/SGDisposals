package com.subash.sgdisposals.controller;

import com.subash.sgdisposals.dto.AllProductsResponseDto;
import com.subash.sgdisposals.dto.BuyProductReqDto;
import com.subash.sgdisposals.entity.Product;
import com.subash.sgdisposals.service.IProductService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/product")
@RequiredArgsConstructor
public class ProductController {

    private final IProductService productService;

    @GetMapping
    public ResponseEntity<?> getAllProducts(){
        List<Product> results = productService.getAllProducts();
        AllProductsResponseDto allProductsResponseDto = new AllProductsResponseDto();
        allProductsResponseDto.setProducts(results);
        return ResponseEntity.ok(allProductsResponseDto);
    }

    @PostMapping("buy")
    public ResponseEntity<?> buyProduct(@Valid  @RequestBody BuyProductReqDto buyProductReqDto){

        boolean result = productService.buyProduct(buyProductReqDto);

        if(result){
            return ResponseEntity.ok("Order is Successful");
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Order is Not Successful");
    }

    @PostMapping("cancel")
    public ResponseEntity<?> cancelOrder(@NotNull  @RequestParam Long id){

        boolean result = productService.cancelOrder(id);
        if(result){
            return ResponseEntity.ok("Order Cancellation is Successful");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Order Cancellation is Not Successful");
    }

    @PutMapping("deliver")
    public ResponseEntity<?> deliverOrder(@NotNull  @RequestParam Long id){
        boolean result = productService.deliverOrder(id);
        if(result){
            return ResponseEntity.ok("Order is Delivered Successfully");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Order is Not Successful");
    }
}
