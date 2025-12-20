package com.subash.sgdisposals.repositories;

import com.subash.sgdisposals.entity.User;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long>{

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<User> findById(Long id);
}
