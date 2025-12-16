package com.subash.sgdisposals.service.implementation;

import com.subash.sgdisposals.dto.UserRegisterReqDto;
import com.subash.sgdisposals.entity.User;
import com.subash.sgdisposals.repositories.UserRepo;
import com.subash.sgdisposals.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final UserRepo userRepo;

    @Override
    public Map<String, Object> addUser(UserRegisterReqDto userRegisterReqDto) {
        User user = new User();
        BeanUtils.copyProperties(userRegisterReqDto, user);
        user.setCreatedAt(Instant.now());
        user.setPoints(0);
        userRepo.save(user);
        Map<String, Object> response = new HashMap<>();
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("message", "User has been successfully registered!");
        return response;
    }
}
