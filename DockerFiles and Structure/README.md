# Cómo crear las imágenes del frontend y backend

## Es importate tener una carpeta que contenga el proyecto del frontend y backend

- Estructura de la carpeta:

### MyFolder:

- **inventary-system-backend** -> proyecto backend
- **inventarySystem** -> proyecto frontend
- **dockerfile** -> archivo para crear la imágen de back
- **Dockerfile.app.yml** -> archivo para crear la imágen de front
- **dockerignore** -> dockerignore que podríamos agregar a los proyectos
- **docker-compose.yml** -> arhivo para ejecutar varios contenedores

## Proceso para crear las imágenes

### Backend

1. Verificamos el archivo **dockerfile**
2. Ejecutamos el comando para la creación de imágenes de Docker
   > `docker build -t [imgName:tag] .`
3. Verificamos la creación de la imágen
   > `docker images `

### Frontend

1. Verificamos el archivo **Dockerfile.app.yml**
2. Ejecutamos el comando para la creación de imágenes de Docker desde un dockerfile con otro nombre
   > `docker build -t [imgName:tag] -f Dockerfile.app.yml .`
3. Verificamos la creación de la imágen
   > `docker images `

## Ejecución multicontainer

- Debemos modificar nuestro docker-compose con el nombre de las imágenes que hemos creado
- Podemos cambiar el nombre de los servicios
- Podemos modificar la versión de Postgres
- Podemos cambiar el path de los volúmenes

#### - docker-compose.yml :

```
version: '3.8'

services:
  appDatabase:
    image: postgres:14.8-alpine3.18
    container_name: postgresApp
    restart: always
    env_file:
      - ./.env
    volumes:
      - dbData:/var/lib/postgresql/data
    networks:
      - appNet
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    # only for testing
    ports:
      - ${USER_PORT}:5432

  appBackend:
    depends_on:
      - appDatabase
    image: [BackendImage:tag]
    container_name: backendApp
    restart: always
    env_file:
      - ./.env
    networks:
      - appNet
    ports:
      - ${PORT}:5000
    # if not defined
    command: node dist/main

    frontend:
      depends_on:
        - appBackend
      image: [FrontentImage:tag]
      container_name: frontendApp
      restart: always
      networks:
        - appNet
      environment:
        BACKEND_BASE_PATH: http://appBackend:${BACKEND_BASE_URL}
      ports:
        - ${FRONTEND_PORT}:2000
      # if not defined
      command: npm run preview

volumes:
  dbData:
    external: false

networks:
  appNet:
    external: false
```

- Ejecutamos el comando para levantar todos los contenedores
  > `docker compose up [flags]`
