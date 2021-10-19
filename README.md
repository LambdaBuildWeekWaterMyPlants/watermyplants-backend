# Water My Plants

## API URL 

https://water-myplants-backend.herokuapp.com/

## Endpoints (Plan so far)

#### /api/auth
[[POST] '/api/auth/register' ](#register) - FUNCTIONAL</br> 
[[POST] '/api/auth/login ' ](#login) - FUNCTIONAL</br>

#### /api/plants
[[GET] '/api/plants' (Returns all plants in database to authenticated users) ](#get-plants)</br>
[[POST] '/api/plants' (Create plant in database if authenticated ) ](#create-plants)</br>
[[PUT] '/api/plants' (Update plant in database if authenticated ) ](#update-plant)</br>
[[DELETE] '/api/plants' (Delete plant in database if authenticated ) ](#delete-plant)</br>

#### /api/users
[[POST] 'api/users/:id' (#update-user) - FUNCTIONAL</br>



## Schema's

### Users Table
```
    "user_id": (unique key, automatically generated)
    "username": "string" (required, unique) (
    "phoneNumber": "string" (required, format = "xxx-xxx-xxxx')
    "password": "string" (required)
```

### Plants Table 
```
    "plant_id": (unique key, automatically generated)
    "nickname": "string" (required)
    "species": "string" (required)
    "h2o_frequency": "string" (required)
```

## Endpoints

<a name='register'>Register (Register new user)</a>
```
[POST] 'https://water-myplants-backend.herokuapp.com/api/auth/register' 
```

```
BODY (all fields required)
{
    "username": "Test1",
    "phoneNumber": "123-321-4321",
    "password": "abc123"
}
```
```
RESPONSE
{
    "user_id": 1,
    "username": "Test1",
    "phoneNumber": "123-321-4321",
    "password": "$2a$08$lc3dc6jZOrSRS7ZLS5fRn.7OVqDG4RpOT3bLeWYMvqfX.I9pN4oSG"
}
```

<a name='login'>Login (Login user) {receives token in response}</a>
```
[POST] 'https://water-myplants-backend.herokuapp.com/api/auth/login'
```

```
BODY (all fields required)
{
    "username": "Test1",
    "phoneNumber": "123-321-4321",
    "password": "abc123"
}
```
```
RESPONSE
{
    "message": `Welcome, Test1`,
    token
}
```

<a name='update-user'>Update (Update user credentials) {requires token} ]</a>
```
[POST] 'https://water-myplants-backend.herokuapp.com/api/users/:id 
```

```
BODY (whatever the user wishes to update)
{
    "username": "Test1",
    "phoneNumber": "123-321-4321",
    "password": "abc123"
}
```
```
RESPONSE
{
    "user_id": 1,
    "username": "Test1",
    "phoneNumber": "123-321-4321",
    "password": "$2a$08$lc3dc6jZOrSRS7ZLS5fRn.7OVqDG4RpOT3bLeWYMvqfX.I9pN4oSG"
}
```
