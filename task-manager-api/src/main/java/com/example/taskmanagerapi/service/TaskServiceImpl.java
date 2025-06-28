package com.example.taskmanagerapi.service;

import com.example.taskmanagerapi.entity.TaskEntity;
import com.example.taskmanagerapi.model.TaskModel;
import com.example.taskmanagerapi.repository.TaskRepository;
import com.example.taskmanagerapi.service.mapper.TaskModelEntityMapper;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final TaskModelEntityMapper mapper;

    public TaskServiceImpl(TaskRepository taskRepository, TaskModelEntityMapper mapper) {
        this.taskRepository = taskRepository;
        this.mapper = mapper;
    }

    public TaskModel save(TaskModel taskModel) {

        TaskEntity taskEntity = taskRepository.save(mapper.mapToEntity(taskModel));
        TaskModel savedTaskModel = mapper.mapToModel(taskEntity);

        return savedTaskModel;
    }

    public List<TaskModel> getAll(String searchPhrases, Integer maxHours) {

        Stream<TaskEntity> streamOfTaskEntity = maxHours != null
                ? taskRepository.findByEstimatedHoursBefore(maxHours).stream()
                : taskRepository.findAll().stream();

        if (searchPhrases != null && !searchPhrases.isEmpty()) {
            List<String> listOfSearchPhrases = Arrays.stream(searchPhrases.split(";")).map(String::toLowerCase).toList();
            streamOfTaskEntity = streamOfTaskEntity.filter(entity -> listOfSearchPhrases.stream().allMatch(phrase -> entity.getTitle().toLowerCase().contains(phrase)));
        }

        return streamOfTaskEntity.map(mapper::mapToModel).toList();
    }
}
