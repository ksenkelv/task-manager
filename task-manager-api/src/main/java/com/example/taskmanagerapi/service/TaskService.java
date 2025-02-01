package com.example.taskmanagerapi.service;

import com.example.taskmanagerapi.model.TaskModel;
import org.springframework.scheduling.config.Task;

import java.util.List;

public interface TaskService {

    TaskModel save(TaskModel taskModel);

    List<TaskModel> getAll(Integer maxHours);
}
