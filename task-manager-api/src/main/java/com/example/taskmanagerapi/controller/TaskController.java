package com.example.taskmanagerapi.controller;

import com.example.taskmanagerapi.controller.mapper.TaskDtoModelMapper;
import com.example.taskmanagerapi.dto.TaskDto;
import com.example.taskmanagerapi.model.TaskModel;
import com.example.taskmanagerapi.repository.TaskRepository;
import com.example.taskmanagerapi.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class TaskController {

// 1. способ сделать constructor (плохой способ)
//    @Autowired
//    private TaskRepository taskRepository;

    private TaskRepository taskRepository;
    private TaskService taskService;
    private TaskDtoModelMapper mapper;

// 2. способ сделать constructor
    public TaskController(TaskRepository taskRepository, TaskService taskService, TaskDtoModelMapper mapper) {
        this.taskRepository = taskRepository;
        this.taskService = taskService;
        this.mapper = mapper;
    }

    @PostMapping("/tasks")
    public TaskDto save(@RequestBody TaskDto taskDto) {

        TaskModel taskModel = taskService.save(mapper.mapToModel(taskDto));
        TaskDto savedTaskDto = mapper.mapToDto(taskModel);

        return savedTaskDto;
    }

    @GetMapping("/tasks")
    public List<TaskDto> getAll(
            @RequestParam(value = "title", required = false) String searchPhrases,
            @RequestParam(value = "maxHours", required = false) Integer maxHours) {

        List<TaskModel> listOfTaskModel = taskService.getAll(searchPhrases, maxHours);
        List<TaskDto> listOfTaskDto = listOfTaskModel.stream().map(model -> mapper.mapToDto(model)).toList();

        return listOfTaskDto;
    }

}
