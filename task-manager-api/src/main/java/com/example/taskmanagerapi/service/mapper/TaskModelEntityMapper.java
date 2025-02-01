package com.example.taskmanagerapi.service.mapper;

import com.example.taskmanagerapi.entity.TaskEntity;
import com.example.taskmanagerapi.model.TaskModel;
import org.springframework.stereotype.Component;

@Component
public class TaskModelEntityMapper {

    public TaskModel mapToModel(TaskEntity taskEntity) {

        TaskModel taskModel = new TaskModel();
        taskModel.setId(taskEntity.getId());
        taskModel.setTitle(taskEntity.getTitle());
        taskModel.setEstimatedHours(taskEntity.getEstimatedHours());

        return taskModel;
    }

    public TaskEntity mapToEntity(TaskModel taskModel) {

        TaskEntity taskEntity = new TaskEntity();
        taskEntity.setId(taskModel.getId());
        taskEntity.setTitle(taskModel.getTitle());
        taskEntity.setEstimatedHours(taskModel.getEstimatedHours());

        return taskEntity;
    }

}
