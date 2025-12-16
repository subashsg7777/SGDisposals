package com.subash.sgdisposals.repositories;

import com.subash.sgdisposals.dto.AllUserRequestDto;
import com.subash.sgdisposals.entity.CollectionRequest;
import com.subash.sgdisposals.entity.User;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollectionRepo extends JpaRepository<CollectionRequest,Long> {

    List<CollectionRequest> findByUserAndDeletedFalse(User user);

    List<CollectionRequest> findByStatusAndDeletedFalse(String requested);
    CollectionRequest findByUserAndId(User user, Long id);
}
