# User Management API

[![Build Status](https://travis-ci.org/dazzabenn/user-management.svg?branch=master)](https://travis-ci.org/dazzabenn/user-management)

An API for managing a list of users. This API provides methods to add, update, delete and list users. The list of users is currently only stored in memory and so will only last for as long as the web server is running the application.

Documentation can be found [here](https://glacial-spire-19827.herokuapp.com/docs/)

Some enhancements that can be made:
* Add "services" to move the business logic out of the controllers, leaving them to just orchestrate. 
* Add authentication using JSON Web Token s

## Adding a user

Adds a user to the list of users. The `email` value must be unique.

### Request

```
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "email": "test@test.com",
  "forename": "Test",
  "surname": "User"
}' 'https://glacial-spire-19827.herokuapp.com/user'
```

### Response

```javascript
{
  "email": "test@test.com",
  "forename": "Test",
  "surname": "User",
  "id": "28ea7341dff38fa54e2e52f4ec5e4bc71cde5866",
  "created": "2016-12-22T12:41:47.886Z"
}
```

## List users

Returns all users that are currently in the database

### Request

```
curl -X GET --header 'Accept: application/json' 'https://glacial-spire-19827.herokuapp.com/user'
```

### Response

```javascript
{
  "users": [
    {
      "email": "test@test.com",
      "forename": "Test",
      "surname": "User",
      "id": "76b25ec78cb30d91e24c6537c93d2b9e7fb5b58c",
      "created": "2016-12-22T12:53:21.804Z"
    }
  ]
}
```

## Get a specific user

Gets a user from the database that matches the specified `id` value.

### Request

```
curl -X GET --header 'Accept: application/json' 'https://glacial-spire-19827.herokuapp.com/user/76b25ec78cb30d91e24c6537c93d2b9e7fb5b58c'
```

### Response

```javascript
{
  "email": "test@test.com",
  "forename": "Test",
  "surname": "User",
  "id": "76b25ec78cb30d91e24c6537c93d2b9e7fb5b58c",
  "created": "2016-12-22T12:53:21.804Z",
  "updated": "2016-12-22T12:54:46.725Z"
}
```

## Update a user

Updates the user with the specified `id`. Again, the `email` value must still be unique.

### Request

```
curl -X PUT --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
  "email": "test@test.com",
  "forename": "Test",
  "surname": "User"
}' 'https://glacial-spire-19827.herokuapp.com/user/76b25ec78cb30d91e24c6537c93d2b9e7fb5b58c'
```

### Response

```javascript
{
  "email": "test@test.com",
  "forename": "Test",
  "surname": "User",
  "id": "76b25ec78cb30d91e24c6537c93d2b9e7fb5b58c",
  "created": "2016-12-22T12:53:21.804Z",
  "updated": "2016-12-22T12:54:46.725Z"
}
```

## Deleting a user

Deletes a user from the database.

### Request

```
curl -X DELETE --header 'Accept: application/json' 'https://glacial-spire-19827.herokuapp.com/user/76b25ec78cb30d91e24c6537c93d2b9e7fb5b58c'
```

### Response

```javascript
{
  "success": 1,
  "description": "User has been deleted!"
}
```
