# Water My Plants

## API URL 

https://water-myplants-backend.herokuapp.com/

## Endpoints (Plan so far)

#### /api/auth
[[POST] '/api/auth/register' ](#register)</br> 
[[POST] '/api/auth/login ' ](#login)</br>

#### /api/users
[[PUT] 'api/users/:id' ](#update-user)</br>

#### /api/plants
[[GET] '/api/plants' (Returns all plants in database to authenticated users) ](#get-plants)</br>
[[POST] '/api/plants' (Create plant in database if authenticated ) ](#create-plants)</br>
[[PUT] '/api/plants' (Update plant in database if authenticated ) ](#update-plant)</br>
[[DELETE] '/api/plants' (Delete plant in database if authenticated ) ](#delete-plant)</br>

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

### '/api/auth'
#### Register
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
#### Login
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

### '/api/users'
#### Update
<a name='update-user'>Update (Update user credentials) {requires token}</a>
```
[PUT] 'https://water-myplants-backend.herokuapp.com/api/users/:id 
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

### '/api/plants'

#### Read

<a name='get-plants'>Get Plants (Returns all plants in database to authenticated users){requires token} </a>
```
[GET] 'https://water-myplants-backend.herokuapp.com/api/plants' 
```
```
BODY (All Fields Required)
{
    "nickname": "Golden Pothos",
    "species": "Epipremnum Aureum",
    "h2o_frequency": "Once every 4 Days"
}
```
```
RESPONSE
{
    "plant_id": 1
    "nickname": "Golden Pothos",
    "species": "Epipremnum Aureum",
    "h2o_frequency": "Once every 4 Days"
}
```
#### Create
<a name='create-plants'>Create Plant (Create plant in database if authenticated){requires token} </a>
```
[POST] 'https://water-myplants-backend.herokuapp.com/api/plants'
```
```
BODY (All Fields Required)
{
    "nickname": "Golden Pothos",
    "species": "Epipremnum Aureum",
    "h2o_frequency": "Once every 4 Days"
}
```
```
RESPONSE
{
    "plant_id": 1
    "nickname": "Golden Pothos",
    "species": "Epipremnum Aureum",
    "h2o_frequency": "Once every 4 Days"
}
```
#### Update
<a name='update-plant'>Update Plants (Update plant in database if authenticated, url params id must exist)){requires token} </a>
```
[PUT] 'https://water-myplants-backend.herokuapp.com/api/plants/1'
```
```
BODY (All Fields Required)
{
    "nickname": "Devils Ivy",
    "species": "Epipremnum Aureum",
    "h2o_frequency": "Once every 4 Days"
}
```
```
RESPONSE
{
    "plant_id": 1
    "nickname": "Devils Ivy",
    "species": "Epipremnum Aureum",
    "h2o_frequency": "Once every 4 Days"
}
```
#### Delete
<a name='delete-plant'>Delete Plant (Delete plant in database if authenticated, only url params required, id must exist in database){requires token} </a>
```
[DELETE] 'https://water-myplants-backend.herokuapp.com/api/plants/1'
```
```
RESPONSE
{
    "plant_id": 1
    "nickname": "Golden Pothos",
    "species": "Epipremnum Aureum",
    "h2o_frequency": "Once every 4 Days"
}
```
