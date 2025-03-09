package com.example.taskmanagerapi.service;

import com.example.taskmanagerapi.model.TaskModel;

import java.util.List;
import java.util.Optional;

public interface TaskService {

    TaskModel save(TaskModel taskModel);

    List<TaskModel> getAll(Integer maxHours);

    Optional<TaskModel> getById(Integer id);

    Integer getEstimatedHoursById(Integer id);
}
