package com.example.taskmanagerapi.service;

import com.example.taskmanagerapi.entity.TaskEntity;
import com.example.taskmanagerapi.model.TaskModel;
import com.example.taskmanagerapi.repository.TaskRepository;
import com.example.taskmanagerapi.service.mapper.TaskModelEntityMapper;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@Slf4j
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

    public Optional<TaskModel> getById(@NonNull Integer id) {
        Optional<TaskEntity> taskEntity = taskRepository.findById(id);
        return taskEntity.map(mapper::mapToModel);
    }

    public Integer getEstimatedHoursById(@NonNull Integer id) {
        return getById(id)
                .orElseThrow(() -> new NoSuchElementException("Lol kek"))
                .getEstimatedHours();
    }

    public void processTask(@NonNull TaskModel taskModel) {

        log.info("Обработка заказа {}{}{}", taskModel.getId(), taskModel.getEstimatedHours(), taskModel.getTitle());
    }
}
