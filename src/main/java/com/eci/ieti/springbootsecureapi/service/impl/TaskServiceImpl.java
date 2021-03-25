package com.eci.ieti.springbootsecureapi.service.impl;

import java.util.ArrayList;
import java.util.List;

import com.eci.ieti.springbootsecureapi.model.Task;
import com.eci.ieti.springbootsecureapi.service.TaskService;

import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@Service
public class TaskServiceImpl implements TaskService{

    private String taskListUrl = "https://task-app-api.azurewebsites.net/api/list-tasks?code=KKMuy7SoT4qnVJor9brhxmB9QtnVqoXzP9h3IvWvmLan6xLu0FORUQ==";
    private String addTaskUrl = "https://task-app-api.azurewebsites.net/api/add-task?code=qKsRlDPr4CTOxbjovixW1PDaTnWINmOQXJcYVaahS17gVdrxqYuEeQ==";

    private List<Task> tasks = new ArrayList<Task>();

    @Override
    public List<Task> getTasks() {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(taskListUrl , String.class);
        JsonObject jObject = (JsonObject) JsonParser.parseString(response.getBody());
        JsonArray jsonArray = jObject.get("tasks").getAsJsonArray();

        List<Task> allTasks = createTasksFromJsonArray(jsonArray);
        allTasks.addAll(tasks);

        return allTasks;
    }

    @Override
    public Task createTask(Task task) {
        RestTemplate restTemplate = new RestTemplate();
        tasks.add(task);
        HttpEntity<Task> request = new HttpEntity<>(task);
        ResponseEntity<String> response = restTemplate.postForEntity(addTaskUrl, request, String.class);
        JsonObject jObject = (JsonObject) JsonParser.parseString(response.getBody());
        System.out.println(jObject);
        return task;
    }

    private List<Task> createTasksFromJsonArray(JsonArray jsonArray){
        List<Task> tasks = new ArrayList<Task>();
        for (JsonElement obj : jsonArray) {
            JsonObject jsonObj = obj.getAsJsonObject();
            String description = jsonObj.get("description").getAsString();
            String status = jsonObj.get("status").getAsString();
            String dueDate = jsonObj.get("dueDate").getAsString();

            JsonObject responsible = jsonObj.get("responsible").getAsJsonObject();
            String name = responsible.get("name").getAsString();
            String email = responsible.get("email").getAsString();

            Task task = new Task(description, status, dueDate, name, email);
            tasks.add(task);
        }

        return tasks;
    }
    
}