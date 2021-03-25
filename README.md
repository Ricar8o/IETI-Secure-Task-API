**NOTE**


## Run Backend

    cd spring-secure-api
    gradle bootRun

    # then go to http://localhost:8080

## ROUTES

### Login

    POST

    /user/login # login and get a access token

    Example body:
        {
            "username":"xyz",
            "password":"password"
        }


**You need an Authorization Header with a valid Token to make this requests**

### User

    GET
    /api/user   # Get All Users

    Post
    /api/user   # Post User
    Example body:
        {
            "id": 1,
            "email": "test@mail.com",
            "password": "test123",
            "firstname": "Test",
            "lastname": "Me",
            "username": "Test444"
       }


### Task
    
    GET
    /api/task   # Get All Tasks

    POST
    /api/task   # Post Task
    Example body:
        {
            "description":"Probar una API Segura ",
            "status":"Done",
            "dueDate":"03-28-2021",
            "responsible":"Ricardo Martinez",
            "email":"ricardo@mail.com"
        }




# Test React component 

    the connection may time out, if this happens refresh.

    cd frontend-consumption
    npm install
    npm start

    Go to http://localhost:3000/