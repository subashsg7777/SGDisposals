package com.subash.sgdisposals.service.implementation;

import com.subash.sgdisposals.RoleEnum;
import com.subash.sgdisposals.StatusEnum;
import com.subash.sgdisposals.dto.*;
import com.subash.sgdisposals.entity.CollectionRequest;
import com.subash.sgdisposals.entity.User;
import com.subash.sgdisposals.exception.InvalidRequestStateException;
import com.subash.sgdisposals.exception.ResourceNotFoundException;
import com.subash.sgdisposals.exception.UnauthorizedRequestException;
import com.subash.sgdisposals.repositories.CollectionRepo;
import com.subash.sgdisposals.repositories.UserRepo;
import com.subash.sgdisposals.service.IUserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    private final UserRepo userRepo;
    private final CollectionRepo collectionRepo;

    @Override
    public AddUserResDto addUser(UserRegisterReqDto userRegisterReqDto) {
        AddUserResDto  addUserResDto = new AddUserResDto();
        try{
            User user = new User();
            BeanUtils.copyProperties(userRegisterReqDto, user);
            user.setCreatedAt(Instant.now());
            user.setPoints(0);
            userRepo.save(user);
            addUserResDto.setMessage("User has been successfully registered!");
            addUserResDto.setName(user.getName());
            addUserResDto.setEmail(user.getEmail());
            addUserResDto.setRole(user.getRole());
            addUserResDto.setId(user.getId());
            return addUserResDto;
        }

        catch(Exception e){
            addUserResDto.setName(userRegisterReqDto.getName());
            addUserResDto.setEmail(userRegisterReqDto.getEmail());
            addUserResDto.setRole(userRegisterReqDto.getRole());
            addUserResDto.setMessage("Error in adding user "+ e.getMessage());
            return addUserResDto;
        }
    }

    @Override
    public CancelReqResDto cancelRequest(Long id, Long userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        CollectionRequest request = collectionRepo.findByUserAndId(user, id);

        if (request == null) {
            throw new ResourceNotFoundException("Request not found");
        }

        if (request.getDeleted()){
            throw new InvalidRequestStateException("Request has been deleted!");
        }

        if (user.getRole() != RoleEnum.USER) {
            throw  new UnauthorizedRequestException("Only USER can cancel requests");
        }

        if (request.getStatus() == StatusEnum.CANCELLED) {
            throw new InvalidRequestStateException("Request already cancelled");
        }

        if (request.getStatus() != StatusEnum.REQUESTED) {
            throw new UnauthorizedRequestException("Only REQUESTED requests can be cancelled");
        }

        CancelReqResDto  cancelReqResDto = new CancelReqResDto();
        request.setStatus(StatusEnum.CANCELLED);
        collectionRepo.save(request);

        cancelReqResDto.setMessage("Request has been cancelled!");
        cancelReqResDto.setId(user.getId());
        return cancelReqResDto;
    }

    @Transactional
    @Override
    public AddNewReqResDto addNewRequest(AddNewRequestDto addNewRequestDto) {

        Optional<User> user = userRepo.findById(addNewRequestDto.getUser());
        if (user.isEmpty()) {
            throw new ResourceNotFoundException("User not found");
        }

        if(user.get().getDeleted()){
            throw new UnauthorizedRequestException("user has been deleted!");
        }

        if(user.get().getRole() != RoleEnum.USER){
            throw  new UnauthorizedRequestException("Only USER can cancel requests");
        }

        else{
            AddNewReqResDto addNewReqResDto = new AddNewReqResDto();
            CollectionRequest coreRequest = new CollectionRequest();
            BeanUtils.copyProperties(addNewRequestDto, coreRequest);
            coreRequest.setUser(user.orElseThrow());
            coreRequest.setCreatedAt(Instant.now());
            coreRequest.setUpdatedAt(Instant.now());
            coreRequest.setDeleted(false);
            coreRequest.setStatus(StatusEnum.REQUESTED);

            collectionRepo.save(coreRequest);
            addNewReqResDto.setMessage("Request has been added!");
            addNewReqResDto.setUser_id(user.get().getId());
            addNewReqResDto.setAddress(addNewRequestDto.getAddress());
            return  addNewReqResDto;
        }

    }


}
