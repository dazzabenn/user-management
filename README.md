# User Management API

[![Build Status](https://travis-ci.org/dazzabenn/user-management.svg?branch=master)](https://travis-ci.org/dazzabenn/user-management)

An API for managing a list of users. This API provides methods to add, update, delete and list users. The list of users is currently only stored in memory and so will only last for as long as the web server is running the application.

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

Documentation can be found [here](https://glacial-spire-19827.herokuapp.com/docs/)
