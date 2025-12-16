package com.subash.sgdisposals.service.implementation;

import com.subash.sgdisposals.entity.CollectionRequest;
import com.subash.sgdisposals.entity.User;
import com.subash.sgdisposals.repositories.CollectionRepo;
import com.subash.sgdisposals.repositories.UserRepo;
import com.subash.sgdisposals.service.ICollectorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CollectorService implements ICollectorService {

    private final UserRepo userRepo;
    private final CollectionRepo  collectionRepo;

    @Override
    public Map<String, Object> markAsCollected(Long id, Long user_id) {

        Map<String,Object> map = new HashMap<>();

        User user = userRepo.findById(id).orElse(null);
        if (user.getRole().equals("COLLECTOR")) {
            CollectionRequest request = collectionRepo.findById(id).orElse(null);
            if (request != null && request.getStatus().equals("REQUESTED")) {
                request.setStatus("COLLECTED");
                collectionRepo.save(request);
                map.put("Request_id", request.getId());
                map.put("message","Now Changed to Collected Status");
                map.put("Collector",user.getName());
                return  map;
            }

            else{
                map.put("message","No User Request Found Or Invalid Operation");
                return  map;
            }
        }
        map.put("message","You Are Not Eligible For This Operation");
        return map;
    }
}
