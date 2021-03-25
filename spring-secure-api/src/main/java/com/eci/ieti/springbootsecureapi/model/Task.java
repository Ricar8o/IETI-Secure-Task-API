package com.eci.ieti.springbootsecureapi.model;

public class Task {
    
    private String description;
    private String status;
    private String dueDate;
    private String responsible;
    private String email;

    public Task(String description, String status, String dueDate, String responsible, String email) {
        this.description = description;
        this.status = status;
        this.dueDate = dueDate;
        this.responsible = responsible;
        this.email = email;
    }


    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDueDate() {
        return this.dueDate;
    }

    public void setDueDate(String duedate) {
        this.dueDate = duedate;
    }

    public String getResponsible() {
        return this.responsible;
    }

    public void setResponsible(String responsible) {
        this.responsible = responsible;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "{" +
            " description='" + getDescription() + "'" +
            ", status='" + getStatus() + "'" +
            ", dueDate='" + getDueDate() + "'" +
            ", responsible='" + getResponsible() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }


}
    
