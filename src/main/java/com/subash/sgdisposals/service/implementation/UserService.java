package com.subash.sgdisposals.service.implementation;

import com.subash.sgdisposals.RoleEnum;
import com.subash.sgdisposals.StatusEnum;
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
    public Map<String, Object> cancelRequest(Long id, Long userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User not found"));

        CollectionRequest request = collectionRepo.findByUserAndId(user, id);

        if (request == null) {
            throw new IllegalStateException("Request not found");
        }

        if (request.getDeleted()){
            throw new IllegalStateException("Request has been deleted!");
        }

        if (user.getRole() != RoleEnum.USER) {
            throw   new IllegalStateException("Only USER can cancel requests");
        }

        if (request.getStatus() == StatusEnum.CANCELLED) {
            throw new IllegalStateException("Request already cancelled");
        }

        if (request.getStatus() != StatusEnum.REQUESTED) {
            throw new IllegalStateException("Only REQUESTED requests can be cancelled");
        }

        request.setStatus(StatusEnum.CANCELLED);
        collectionRepo.save(request);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "User request successfully cancelled");
        response.put("request_id", request.getId());
        return response;
    }


}
