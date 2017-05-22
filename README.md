# Running the application

The application is available online at this location - https://impactcast.herokuapp.com/

However if desired the application can be set up to run locally by following these steps:

- Install docker following the instructions at this link https://docs.docker.com/engine/installation/#supported-platforms
- Navigate to the base directory of the application and run the following command
docker build -t impactcast5/node-web-app .
- Once complete enter the following command
docker run -p 3000:3000 -dt impactcast/node-web-app
