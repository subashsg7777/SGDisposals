package com.subash.sgdisposals.service;

import com.subash.sgdisposals.dto.AllUserRequestDto;
import com.subash.sgdisposals.dto.CollectReqDto;
import com.subash.sgdisposals.dto.CollectedResDto;
import com.subash.sgdisposals.entity.CollectionRequest;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface IRequestService {

    List<AllUserRequestDto> getAllRequestsForUser(@RequestParam Long id);
    List<AllUserRequestDto> getAllRequestsForCollector();
    Long collectRequest(CollectReqDto collectReqDto);
}
