package com.subash.sgdisposals.repositories;

import com.subash.sgdisposals.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Long>{
}
