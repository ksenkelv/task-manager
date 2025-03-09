package com.example.taskmanagerapi.model;

import lombok.Getter;

@Getter
public class TaskModel {

    private Integer id;
    private String title;
    private Integer estimatedHours;

    public TaskModel() {
    }

    public TaskModel(
            Integer id,
            String title,
            Integer estimatedHours
    ) {
        setId(id);
        setTitle(title);
        setEstimatedHours(estimatedHours);
    }

    public void setId(Integer id) {
        if (id == null) {
            throw new IllegalArgumentException("Id can not be null");
        }
        this.id = id;
    }

    public void setTitle(String title) {
        if (title == null || title.isEmpty()) {
            throw new IllegalArgumentException("Title can not be null or empty");
        }
        this.title = title;
    }

    public void setEstimatedHours(Integer estimatedHours) {
        if (estimatedHours == null || estimatedHours < 0) {
            throw new IllegalArgumentException("Estimated hours can not be null or negative");
        }
        this.estimatedHours = estimatedHours;
    }
}
