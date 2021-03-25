package com.eci.ieti.springbootsecureapi.service;

import java.util.List;

import com.eci.ieti.springbootsecureapi.model.Task;

public interface TaskService {
    
    List<Task> getTasks();
    Task createTask(Task task);
}