package com.example.taskmanagerapi.repository;

import com.example.taskmanagerapi.entity.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<TaskEntity, Integer> {

    List<TaskEntity> findByEstimatedHoursBefore(Integer estimatedHours);
}
