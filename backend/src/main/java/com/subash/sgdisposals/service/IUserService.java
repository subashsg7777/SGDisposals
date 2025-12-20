package com.subash.sgdisposals.service;

import com.subash.sgdisposals.dto.*;

import java.util.Map;

public interface IUserService {

    AddUserResDto addUser(UserRegisterReqDto userRegisterReqDto);
    CancelReqResDto cancelRequest(Long id, Long user_id);
    AddNewReqResDto addNewRequest(AddNewRequestDto addNewRequestDto);
}
