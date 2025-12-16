package com.subash.sgdisposals.controller;

import com.subash.sgdisposals.dto.UserRegisterReqDto;
import com.subash.sgdisposals.service.IUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("api/user/")
@RequiredArgsConstructor
public class UserController {

    private final IUserService userService;

    @PostMapping("add-user")
    private ResponseEntity<Map<String,Object>> addUser(@Valid  @RequestBody UserRegisterReqDto userRegisterReqDto) {

        Map<String, Object> response = userService.addUser(userRegisterReqDto);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


}
