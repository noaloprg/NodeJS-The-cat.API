# Image of the runtime environment
FROM node:20-alpine

# Dir where its saved the data that is produced by image and defines root dir for next commands
WORKDIR /app

# Dependencies are saved on root of the image
COPY package.json ./  

# Install dependencies
RUN npm install 

# Copies de proyect 
COPY src /src

#Listens on port 3000
EXPOSE 3000

#Command to start nestJS app 
CMD ["npm", "run", "start"]