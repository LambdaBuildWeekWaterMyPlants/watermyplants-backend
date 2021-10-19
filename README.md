# Water My Plants

## API URL 

https://water-myplants-backend.herokuapp.com/

## Endpoints (Plan so far)

#### /api/auth
[[POST] '/api/auth/register' (Register new user) ](#register) - FUNCTIONAL</br> 
[[POST] '/api/auth/login ' (Login user) ](#login) - FUNCTIONAL</br>

#### /api/plants
[[GET] '/api/plants' (Returns all plants in database to authenticated users) ](#get-plants)</br>
[[POST] '/api/plants' (Create plant in database if authenticated ) ](#create-plants)</br>
[[PUT] '/api/plants' (Update plant in database if authenticated ) ](#update-plant)</br>
[[DELETE] '/api/plants' (Delete plant in database if authenticated ) ](#delete-plant)</br>

#### /api/users
[[POST] 'api/users/:id' (Update user credentials) ](#update-user) - FUNCTIONAL</br>

<a name='register'>Register</a>
```
[POST] 'https://water-myplants-backend.herokuapp.com/api/auth/register' 
```

```
body (all fields required)
{
    "username": "Test1",
    "phoneNumber": "123-321-4321",
    "password": "abc123"
}
response
{
    "user_id": 1,
    "username": "Test1",
    "phoneNumber": "123-321-4321",
    "password": "$2a$08$lc3dc6jZOrSRS7ZLS5fRn.7OVqDG4RpOT3bLeWYMvqfX.I9pN4oSG"
}
```

<a name='login'>Login</a>
```
[POST] 'https://water-myplants-backend.herokuapp.com/api/auth/login'
~ {receives token in response} ~
```

```
body (all fields required)
{
    "username": "Test1",
    "phoneNumber": "123-321-4321",
    "password": "abc123"
}
response
{
    "message": `Welcome, Test1`,
    token
}
```

<a name='update-user'>Update</a>
```
[POST] 'https://water-myplants-backend.herokuapp.com/api/users/:id 
~ {requires token} ~
```

```
body (whatever the user wishes to update)
{
    "username": "Test1",
    "phoneNumber": "123-321-4321",
    "password": "abc123"
}
response
{
    "user_id": 1,
    "username": "Test1",
    "phoneNumber": "123-321-4321",
    "password": "$2a$08$lc3dc6jZOrSRS7ZLS5fRn.7OVqDG4RpOT3bLeWYMvqfX.I9pN4oSG"
}
```
