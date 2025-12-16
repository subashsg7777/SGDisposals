package com.subash.sgdisposals.service;

import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

public interface ICollectorService {

    Map<String,Object> markAsCollected(Long id,  Long user_id);
}
