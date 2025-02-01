package com.example.taskmanagerapi.controller.mapper;

import com.example.taskmanagerapi.dto.TaskDto;
import com.example.taskmanagerapi.model.TaskModel;
import org.springframework.stereotype.Component;

@Component
public class TaskDtoModelMapper {

    public TaskDto mapToDto(TaskModel taskModel) {

        TaskDto taskDto = new TaskDto();
        taskDto.setId(taskModel.getId());
        taskDto.setTitle(taskModel.getTitle());
        taskDto.setEstimatedHours(taskModel.getEstimatedHours());

        return taskDto;
    }

    public TaskModel mapToModel(TaskDto taskDto) {

        TaskModel taskModel = new TaskModel();
        taskModel.setId(taskDto.getId());
        taskModel.setTitle(taskDto.getTitle());
        taskModel.setEstimatedHours(taskDto.getEstimatedHours());

        return taskModel;
    }
}
