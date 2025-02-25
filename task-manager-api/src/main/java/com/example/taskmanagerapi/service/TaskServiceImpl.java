package com.example.taskmanagerapi.service;

import com.example.taskmanagerapi.entity.TaskEntity;
import com.example.taskmanagerapi.model.TaskModel;
import com.example.taskmanagerapi.repository.TaskRepository;
import com.example.taskmanagerapi.service.mapper.TaskModelEntityMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Stream;

@Service
public class TaskServiceImpl implements TaskService {

    private TaskRepository taskRepository;
    private TaskModelEntityMapper mapper;

    public TaskServiceImpl(TaskRepository taskRepository, TaskModelEntityMapper mapper) {
        this.taskRepository = taskRepository;
        this.mapper = mapper;
    }

    public TaskModel save(TaskModel taskModel) {

        TaskEntity taskEntity = taskRepository.save(mapper.mapToEntity(taskModel));
        TaskModel savedTaskModel = mapper.mapToModel(taskEntity);

        return savedTaskModel;
    }

    public List<TaskModel> getAll(Integer maxHours) {

        Stream<TaskEntity> streamOfTaskEntity = taskRepository.findAll().stream();

        if (maxHours != null) {
            streamOfTaskEntity = streamOfTaskEntity.filter(entity -> entity.getEstimatedHours() <= maxHours);
        }

        return streamOfTaskEntity.map(mapper::mapToModel).toList();
    }
}
