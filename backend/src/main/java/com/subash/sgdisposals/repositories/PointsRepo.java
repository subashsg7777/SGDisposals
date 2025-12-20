package com.subash.sgdisposals.repositories;

import com.subash.sgdisposals.entity.PointsSystem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PointsRepo extends JpaRepository<PointsSystem,Long> {
}
