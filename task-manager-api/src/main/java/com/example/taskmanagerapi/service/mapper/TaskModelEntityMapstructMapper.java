package com.example.taskmanagerapi.service.mapper;

import com.example.taskmanagerapi.entity.TaskEntity;
import com.example.taskmanagerapi.model.TaskModel;
//import org.mapstruct.Mapper;

//@Mapper(componentModel = "spring")
public interface TaskModelEntityMapstructMapper {

    TaskModel mapToModel(TaskEntity taskEntity);

    TaskEntity mapToEntity(TaskModel taskModel);

}
