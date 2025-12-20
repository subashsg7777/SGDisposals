package com.subash.sgdisposals.controller;

import com.subash.sgdisposals.dto.*;
import com.subash.sgdisposals.service.IRequestService;
import com.subash.sgdisposals.service.IUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("api/v1/user/")
@RequiredArgsConstructor
public class UserController {

    private final IUserService userService;
    private final IRequestService requestService;

    @PostMapping("add-user")
    private ResponseEntity<AddUserResDto> addUser(@Valid  @RequestBody UserRegisterReqDto userRegisterReqDto) {

        AddUserResDto response = userService.addUser(userRegisterReqDto);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("requests")
    public ResponseEntity<List<AllUserRequestDto>> getAllRequestOfaUser(@RequestParam Long id){
        List<AllUserRequestDto> response = requestService.getAllRequestsForUser(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping("cancel")
    public ResponseEntity<CancelReqResDto> cancelRequest(@RequestParam Long id,@RequestParam Long user_id){

        CancelReqResDto response = userService.cancelRequest(id,user_id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("add-request")
    public ResponseEntity<AddNewReqResDto> addNewRequest(@Valid @RequestBody AddNewRequestDto  addNewRequestDto){

        AddNewReqResDto  response = userService.addNewRequest(addNewRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
