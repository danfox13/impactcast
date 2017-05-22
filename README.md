# Running the application

The application is available online at this location - https://impactcast.herokuapp.com/

However if desired the application can be set up to run locally by following these steps:

- Install docker following the instructions at this link https://docs.docker.com/engine/installation/#supported-platforms
- In a terminal window, navigate to the base directory of the application and run the following command

```docker build -t impactcast5/node-web-app . ```

- Once complete enter the following command

```docker run -p 3000:3000 -dt impactcast/node-web-app ```

By default the database will connect to the instance deployed on MongoLab, but this can be set up locally too if desired by following these steps:

- Update the globals.js to point to the desired database
- In a terminal window, navigate to the database directory and run the following command

```docker build --tag release/0.1 . ```

 - Once complete enter the following command
 
 ```docker run -p 27017:27017 --name impactcastdb -d release/0.1```
