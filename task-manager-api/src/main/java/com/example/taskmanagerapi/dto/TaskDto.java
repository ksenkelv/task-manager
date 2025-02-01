package com.example.taskmanagerapi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskDto {

    private Integer id;
    private String title;
    private Integer estimatedHours;
}
