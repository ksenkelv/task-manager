package com.example.taskmanagerapi.controller;

import com.example.taskmanagerapi.controller.mapper.TaskDtoModelMapper;
import com.example.taskmanagerapi.entity.TaskEntity;
import com.example.taskmanagerapi.model.TaskModel;
import com.example.taskmanagerapi.repository.TaskRepository;
import com.example.taskmanagerapi.service.TaskService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class TaskTestController {

    private TaskRepository taskRepository;
    private TaskService taskService;

    // 2. способ сделать constructor
    public TaskTestController(TaskRepository taskRepository, TaskService taskService, TaskDtoModelMapper mapper) {
        this.taskRepository = taskRepository;
        this.taskService = taskService;
    }

    @GetMapping("/repositoryTest")
    public String repositoryTest() {

        // создание таска чтобы проверить репозиторий
        TaskEntity taskEntity = new TaskEntity();
        taskEntity.setId(1);
        taskEntity.setTitle("Task 2");
        taskEntity.setEstimatedHours(2);

        // проверка на сохранение таска в базе
        taskRepository.save(taskEntity);

        // доставание всех тасков из базы
        // System.out.println(taskRepository.findAll());
        for (TaskEntity task : taskRepository.findAll()) {
            System.out.println(task.getId());
            System.out.println(task.getTitle());
            System.out.println(task.getEstimatedHours());
        }

        return "test repository";
    }

    @GetMapping("/serviceTest")
    public String serviceTest() {

        // создание таска чтобы проверить сервис
        TaskModel taskModel = new TaskModel();
        taskModel.setId(1);
        taskModel.setTitle("Task 2");
        taskModel.setEstimatedHours(2);

        // проверка на сохранение таска
        taskService.save(taskModel);

        // доставание всех тасков из базы
        // System.out.println(taskRepository.findAll());
        for (TaskModel task : taskService.getAll("", null)) {
            System.out.println(task.getId());
            System.out.println(task.getTitle());
            System.out.println(task.getEstimatedHours());
        }

        return "test service";
    }
}
