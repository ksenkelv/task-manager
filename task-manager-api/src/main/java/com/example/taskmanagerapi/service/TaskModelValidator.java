package com.example.taskmanagerapi.service;

import com.example.taskmanagerapi.model.TaskModel;

public interface TaskModelValidator {
    void validate(TaskModel taskModel) throws IllegalStateException;
}
