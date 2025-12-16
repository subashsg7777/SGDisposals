package com.subash.sgdisposals.service;

import com.subash.sgdisposals.dto.UserRegisterReqDto;

import java.util.Map;

public interface IUserService {

    public Map<String,Object> addUser(UserRegisterReqDto userRegisterReqDto);
    Map<String,Object> cancelRequest(Long id, Long user_id);
}
