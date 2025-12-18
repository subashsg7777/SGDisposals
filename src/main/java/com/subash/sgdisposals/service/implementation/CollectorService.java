package com.subash.sgdisposals.service.implementation;

import com.subash.sgdisposals.RoleEnum;
import com.subash.sgdisposals.StatusEnum;
import com.subash.sgdisposals.dto.CollectedResDto;
import com.subash.sgdisposals.entity.CollectionRequest;
import com.subash.sgdisposals.entity.User;
import com.subash.sgdisposals.exception.InvalidRequestStateException;
import com.subash.sgdisposals.exception.ResourceNotFoundException;
import com.subash.sgdisposals.repositories.CollectionRepo;
import com.subash.sgdisposals.repositories.UserRepo;
import com.subash.sgdisposals.service.ICollectorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.file.ReadOnlyFileSystemException;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CollectorService implements ICollectorService {

    private final UserRepo userRepo;
    private final CollectionRepo  collectionRepo;
    @Override
    public CollectedResDto markAsCollected(Long id, Long user_id) {

        User user = userRepo.findById(user_id).orElse(null);
        if (user.getRole() == RoleEnum.COLLECTOR && !user.getDeleted()) {
            CollectionRequest request = collectionRepo.findById(id).orElse(null);

            if (request.getStatus() == StatusEnum.COLLECTED) {
                throw new InvalidRequestStateException("Collector already collected");
            }

            if (request != null && request.getStatus() == StatusEnum.REQUESTED) {
                CollectedResDto  collectedResDto = new CollectedResDto();
                request.setStatus(StatusEnum.COLLECTED);
                collectionRepo.save(request);
                collectedResDto.setRequest_id(request.getId());
                collectedResDto.setMessage("Now Changed to Collected Status");
                collectedResDto.setCollector(user.getName());
                return  collectedResDto;
            }

            else{
                throw new ResourceNotFoundException("No User Found For that Credentials Or Not Suitable Request Status");
            }
        }
        throw new InvalidRequestStateException("You Are Not Eligible For this Operation");
    }
}
