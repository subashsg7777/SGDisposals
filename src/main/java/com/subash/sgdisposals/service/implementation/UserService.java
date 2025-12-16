package com.subash.sgdisposals.service.implementation;

import com.subash.sgdisposals.dto.UserRegisterReqDto;
import com.subash.sgdisposals.entity.CollectionRequest;
import com.subash.sgdisposals.entity.User;
import com.subash.sgdisposals.repositories.CollectionRepo;
import com.subash.sgdisposals.repositories.UserRepo;
import com.subash.sgdisposals.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    private final UserRepo userRepo;
    private final CollectionRepo collectionRepo;

    public enum StatusEnum {
        REQUESTED,
        COLLECTED,
        EVALUATED,
        CANCELLED
    }

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

    @Override
    public Map<String, Object> cancelRequest(Long id, Long user_id) {
        Map<String, Object> response = new HashMap<>();
        User user = userRepo.findById(user_id).orElse(null);
        CollectionRequest request = collectionRepo.findByUserAndId(user, id);

        if (request.getStatus().equals("CANCELLED")) {
            log.error("Request has been already Cancelled!");
            response.put("message", "Request has already been cancelled!");
        }

        if (user.getRole().equals("USER") && request.getStatus().equals("REQUESTED")) {
            request.setStatus("CANCELLED");
            collectionRepo.save(request);
            response.put("message", "UserRequest has been successfully cancelled!");
            response.put("user", user.getName());
            response.put("request_id", request.getId());
        }

        return response;
    }

}
