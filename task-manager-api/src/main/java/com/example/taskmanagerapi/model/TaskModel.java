package com.example.taskmanagerapi.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskModel {

    private Integer id;
    private String title;
    private Integer estimatedHours;
}
