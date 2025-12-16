package com.subash.sgdisposals.service.implementation;

import com.subash.sgdisposals.dto.AllUserRequestDto;
import com.subash.sgdisposals.entity.CollectionRequest;
import com.subash.sgdisposals.entity.User;
import com.subash.sgdisposals.repositories.CollectionRepo;
import com.subash.sgdisposals.repositories.UserRepo;
import com.subash.sgdisposals.service.IRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RequestService implements IRequestService {

    private final CollectionRepo collectionRepo;
    private final UserRepo userRepo;

    @Override
    public List<AllUserRequestDto> getAllRequestsForUser(Long id) {

        User user = userRepo.findById(id).orElseThrow();
        List<CollectionRequest> result = collectionRepo.findAllByUser(user);
        Map<Long, CollectionRequest> map = new HashMap<>();
        return result.stream().map(item -> {
            AllUserRequestDto allUserRequestDto = new AllUserRequestDto();
             allUserRequestDto.setName(item.getUser().getName());
             allUserRequestDto.setUser_id(item.getUser().getId());
             allUserRequestDto.setId(item.getId());
             allUserRequestDto.setAddress(item.getAddress());
             allUserRequestDto.setStatus(item.getStatus());
             return allUserRequestDto;
        }).toList();
    }

    @Override
    public List<AllUserRequestDto> getAllRequestsForCollector() {

        List<CollectionRequest> result = collectionRepo.findAllByStatus("REQUESTED");
        return result.stream().map(item -> {
            AllUserRequestDto allUserRequestDto = new AllUserRequestDto();
            allUserRequestDto.setName(item.getUser().getName());
            allUserRequestDto.setUser_id(item.getUser().getId());
            allUserRequestDto.setId(item.getId());
            allUserRequestDto.setAddress(item.getAddress());
            allUserRequestDto.setStatus(item.getStatus());
            return allUserRequestDto;
        }).toList();
    }
}
