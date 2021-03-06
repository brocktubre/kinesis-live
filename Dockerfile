FROM ubuntu:20.04
RUN apt-get update
RUN apt-get install curl gcc g++ make git -y
EXPOSE 4200

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install nodejs -y
RUN npm install -g npm
RUN npm install -g @angular/cli

WORKDIR /home/kinesis-live-angular-app

# docker image build -t kinesis-live-image .
# docker run -p 4200:4200 -v /Users/brocktubre/Desktop/Projects/kinesis-live/:/home/kinesis-live-angular-app -it kinesis-live-image
