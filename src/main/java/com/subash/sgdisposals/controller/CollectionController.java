package com.subash.sgdisposals.controller;

import com.subash.sgdisposals.dto.AllUserRequestDto;
import com.subash.sgdisposals.entity.CollectionRequest;
import com.subash.sgdisposals.service.IRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/collections/")
@RequiredArgsConstructor
public class CollectionController {

    private final IRequestService requestService;

    @GetMapping("get_all_User_Collections")
    public ResponseEntity<List<AllUserRequestDto>> getAllRequestOfaUser(@RequestParam Long id){
        List<AllUserRequestDto> response = requestService.getAllRequestsForUser(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("get_all_Collector")
    public ResponseEntity<?> getAllRequestOfaCollector(){

        List<AllUserRequestDto> response = requestService.getAllRequestsForCollector();
        return ResponseEntity.status(HttpStatus.OK).body(response);

        
    }
}
