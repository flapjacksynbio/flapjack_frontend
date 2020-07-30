FROM node:lts
# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH
# install and cache app dependencies
ADD package.json /usr/src/app/package.json
ADD package-lock.json /usr/src/app/package-lock.json
RUN npm install
RUN npm install react-scripts@3.4 -g
# add app
ADD . /usr/src/app

# start app
CMD ["npm", "start"]
EXPOSE 3000