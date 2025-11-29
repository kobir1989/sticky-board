# Set the base image to create the image for react app
FROM node:20-alpine

# Create a user with permission to run the app
# -S => create a system user
# -G => add the user to a group
# This is done to avoid running the app as root
# If the app is run as root, any vulnerability in the app can be exploited to gain access to the host system
# It's a good practice to run the app as a non-root user
RUN addgroup app && adduser -S -G app app

# Set the user to run the app
USER /app

# set the  working dir to /app
WORKDIR /app

# copy package.json and package-lock.json to the working dir
# This is done before copying the rest if the files to take advantage of docker's cache
# If the package.json and package-lock.json files haven't changed, docker will use the cached dependencies
COPY package*.json ./

# Sometimes the ownership of the files in the working dir is changed to root 
# and thus the app can't access teh file and throws error => EASSES: permission denied
# to avoid this, change ownership of the file to the root user 
USER root

# change the ownership of the /app dir to the app user
# chown -R <user>:<group> <directory>
# chown command changes the user and/or group ownership of the given file.
RUN chown -R app:app .

# change the user back to the app user
USER app

# install dependencies
RUN npm install

# copy the rest of the files to the working dir 
COPY . .

# Expose the port 5173 to tell Docker that the container listens on the specified network ports at runtime 
EXPOSE 5173

# command to run the app
CMD ["npm", "run", "dev"]
