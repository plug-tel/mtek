# Build stage
FROM node:18 AS build

WORKDIR /app

# Adicionando `/app/node_modules/.bin` para o $PATH
ENV PATH /app/node_modules/.bin:$PATH
# Instalando dependências da aplicação e armazenando em cache.
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install --f

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Expose port 80
EXPOSE 80

CMD ["npm", "start"]