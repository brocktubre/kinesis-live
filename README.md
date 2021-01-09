# Kinesis.Live Codebase

[View Kinesis.Live here](https://kinesis.live)

This is a simple application that allows users to easily stream data in Kinesis. Just choose the type of data you want to send, enter in some information about your stream, your AWS account, and start streaming some sample data.

Leave an [issue here](https://github.com/brocktubre/kinesis-live/issues) if you find an issue or have a suggestion for the app.

Contact the developer [directly here](https://brocktubre.com).

## Requirements
You'll need docker installed to run this application locally. You can download docker here: https://www.docker.com/products/docker-desktop

## Build Docker Image
To build the Docker image use the following: `docker image build -t kinesis-angular .`

## Run the docker container
Run the docker contianer: 
```
docker run -p 4200:4200 -v /ROOT/TO/REPO/kinesis-live-angular-app:/home/kinesis-live-angular-app -it kinesis-live-image
```

## Running the app locally
To run the Angular application locally, navigate inside the site directory and use: `npm run start` which runs `ng serve --host 0.0.0.0 --port 4200` so the angular app can run inside the docker container and the development environment can run in a local web browser on: `http://localhost:4200`.


# Kinesis.Live Architecture

## AWS Node.js SDK and Angular
The application framework used is Angular and the AWS Node.js SDK is used to make API calls to Kinesis and your AWS account.

## Use CodeBuild and CodePipeline
This app is hosted as a static website on Amazon S3. Once code is pushed into the `main` branch on Github, it triggers a CodePipeline event that triggers a CodeBuild. The code build runs a container that installs the `node_modules`, builds the app using `ng build --prod --aot --build-optimizer`, and sends the packaged Angular app to S3 (where is it hosted from). Check out the `buildspec.yml` file to see the phases during the build and S# sync process.s

## CloudFront and S3
The Angular app is built to distribute single page static website hosted on Amazon S3. CloudFront is used as a content distribution network to delivery the Kinesis.Live all over the globe.

## Route 53 as DNS Resolver
Route 53 is used to host the application. A simple A record is created to point the Route 53 public hosted zone of `kinesis.live` to the CloudFront distribution hosting the S3 static website. 

Copyright 2021 [Brock Tubre](https://brocktubre.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.