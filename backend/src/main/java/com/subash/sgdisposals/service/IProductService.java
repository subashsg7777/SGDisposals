package com.subash.sgdisposals.service;

import com.subash.sgdisposals.dto.BuyProductReqDto;
import com.subash.sgdisposals.entity.Product;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface IProductService {

    List<Product> getAllProducts();
    Map buyProduct(BuyProductReqDto buyProductReqDto);

    boolean cancelOrder(Long id);

    boolean deliverOrder(Long id);
}
