package com.subash.sgdisposals.service;

import com.subash.sgdisposals.dto.CollectedResDto;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

public interface ICollectorService {

    CollectedResDto markAsCollected(Long id, Long user_id);
}
