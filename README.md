# StridesBackend
Test for back-end

# Explanation
    This back-end uses SQLite3 as database. DB file is placed in root project folder.
    I used customized middleware to auth the request. In each request except signup reqeust,
    we should put "Authorization" key and value(password that exists in the DB) into the header of request.


# Install Guide
1. Make sure you already installed sequelize-cli.
    npm install -g sequelize-cli
2. Make sure that you already install python
3. Execute following command in cli to create database file in the project folder
    npx sequelize db:migrate
4. Run app using following command in cli
    npm start
5. Go to your browser with http://localhost:3001


# How to Test Back-end API

- http://localhost:3001/signup
    Put into request body as raw data like this {"name":"ccc","password":"333"}

- http://localhost:3001/users
    Put into request header like this "key" : "Authorization" , "value": password

- http://localhost:3001/users/:id
    Put into request header like this "key" : "Authorization" , "value": password
    and replace :id with real id number of user
    