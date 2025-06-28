package com.example.taskmanagerapi.service;

import com.example.taskmanagerapi.model.TaskModel;

import java.util.List;

public interface TaskService {

    TaskModel save(TaskModel taskModel);

    List<TaskModel> getAll(String searchPhrases, Integer maxHours);
}
