#base image
# FROM node:latest AS build

# set working directory
# RUN mkdir /usr/src/app
#copy all files from current directory to docker
# COPY . /usr/src/app

# WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
# ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
# RUN yarn

# start app
# CMD ["npm", "start"]

FROM node:12.2.0-alpine as react_build 
#also say 
WORKDIR /app
#copy the react app to the container
COPY . /app/ 

# #prepare the contiainer for building react 
RUN npm install --silent
RUN npm install react-scripts -g --silent 
RUN npm run build 

#prepare nginx
FROM nginx:1.16.0-alpine

COPY --from=react_build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d



#fire up nginx
EXPOSE 80 
CMD ["nginx","-g","daemon off;"]