package com.subash.sgdisposals.service.implementation;

import com.subash.sgdisposals.RoleEnum;
import com.subash.sgdisposals.StatusEnum;
import com.subash.sgdisposals.dto.AllUserRequestDto;
import com.subash.sgdisposals.dto.CollectReqDto;
import com.subash.sgdisposals.dto.CollectedResDto;
import com.subash.sgdisposals.entity.CollectionRequest;
import com.subash.sgdisposals.entity.PointsSystem;
import com.subash.sgdisposals.entity.User;
import com.subash.sgdisposals.exception.InvalidRequestStateException;
import com.subash.sgdisposals.exception.ResourceNotFoundException;
import com.subash.sgdisposals.exception.UnauthorizedRequestException;
import com.subash.sgdisposals.repositories.CollectionRepo;
import com.subash.sgdisposals.repositories.PointsRepo;
import com.subash.sgdisposals.repositories.UserRepo;
import com.subash.sgdisposals.service.IRequestService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class RequestService implements IRequestService {

    private static final Logger log = LoggerFactory.getLogger(RequestService.class);
    private final CollectionRepo collectionRepo;
    private final UserRepo userRepo;
    private final PointsRepo pointsRepo;

    @Override
    public List<AllUserRequestDto> getAllRequestsForUser(Long id) {

        User user = userRepo.findById(id).orElseThrow();
        if(user.getRole() == RoleEnum.USER){
            List<CollectionRequest> result = collectionRepo.findByUserAndDeletedFalse(user).orElseThrow();
            Map<Long, CollectionRequest> map = new HashMap<>();
            return result.stream().map(item -> {
                AllUserRequestDto allUserRequestDto = new AllUserRequestDto();
                allUserRequestDto.setName(item.getUser().getName());
                allUserRequestDto.setUser_id(item.getUser().getId());
                allUserRequestDto.setId(item.getId());
                allUserRequestDto.setAddress(item.getAddress());
                return allUserRequestDto;
            }).toList();
        }

        else{
            throw new ResourceNotFoundException("No Request for this User");
        }
    }

    @Override
    public List<AllUserRequestDto> getAllRequestsForCollector() {

        List<CollectionRequest> result = collectionRepo.findByStatusAndDeletedFalse(StatusEnum.REQUESTED).orElseThrow();
        return result.stream().map(item -> {
            AllUserRequestDto allUserRequestDto = new AllUserRequestDto();
            allUserRequestDto.setName(item.getUser().getName());
            allUserRequestDto.setUser_id(item.getUser().getId());
            allUserRequestDto.setId(item.getId());
            allUserRequestDto.setAddress(item.getAddress());
            return allUserRequestDto;
        }).toList();
    }

    protected Long calculatePoint(Map<String, Long> wastes) {
        List<PointsSystem> points_sys = pointsRepo.findAll();
        final long[] points = {0};

        wastes.forEach((key, value) ->
        {
            boolean exists = points_sys.stream() .anyMatch(type -> type.getType().equals(key));
            if (!exists) {
                throw new InvalidRequestStateException("Invalid Waste type in Body: " + key);
            }
        }
        );

        wastes.forEach((key, value) -> {
            points_sys.forEach(type -> {
                if (type.getType().equals(key)) {
                    points[0] += value * type.getPoints();
                }
            });
        });

        log.info("Calculate Points: {}", points[0]);
        return points[0];
    }


    @Override
    public Long collectRequest(CollectReqDto collectReqDto) {

        User collector = userRepo.findById(collectReqDto.getCollector_id()).orElseThrow();
        if (collector.getRole() != RoleEnum.COLLECTOR || collector.getDeleted()){
            throw new UnauthorizedRequestException("You are not allowed to collect this request");
        }

        User user = userRepo.findById(collectReqDto.getUser_id()).orElseThrow();

        if(user.getDeleted()){
            throw new UnauthorizedRequestException("This User has been deleted Already!");
        }
        CollectionRequest collectionRequest = collectionRepo.findById(collectReqDto.getCollection_id()).orElseThrow();
        if (collectionRequest.getStatus() != StatusEnum.REQUESTED){
            throw new InvalidRequestStateException("Invalid request To Process");
        }

        if(collectionRequest.getDeleted()){
            throw new InvalidRequestStateException("Request has been deleted Already");
        }

        Long points = calculatePoint(collectReqDto.getWeights());
        Long pointsToUpdate = points + user.getPoints();
        user.setPoints(Math.toIntExact(pointsToUpdate));
        userRepo.save(user);
        return points;
    }
}