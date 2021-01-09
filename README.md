# Dockerized Angular Application

This is a simple application that allows users to easily stream data in Kinesis. Just choose the type of data you want to send, enter in some information about your stream, your AWS account, and start streaming some sample data. 

1. Build Docker Image
To build the Docker image use the following: `docker image build -t kinesis-angular .`

2. Run the docker container
Run the docker contianer: 
```docker run -p 4200:4200 -v /ROOT/TO/REPO/kinesis-live-angular-app:/home/kinesis-live-angular-app -it kinesis-live-image
```

3. Run app locally
To run the Angular application locally, navigate inside the site directory and use: `npm run start` which runs `ng serve --host 0.0.0.0 --port 4200` so the angular app can run inside the docker container and the development environment can run in a local web browser on: `http://localhost:4200`.

4. Use CodeBuild and CodePipeline
This app is hosted as a static website on Amazon S3. Once code is pushed into the `main` branch on Github, it triggers a CodePipeline event that triggers a CodeBuild. The code build runs a container that installs the `node_modules`, builds the app using `ng build --prod --aot --build-optimizer`, and sends the packaged Angular app to S3 (where is it hosted from)

5. Route 53 as DNS Resolver
Route 53 is used to host the application. A simple A record is created to point the Route 53 public hosted zone of `kinesis.live` to the CloudFront distribution hosting the S3 static website. 
