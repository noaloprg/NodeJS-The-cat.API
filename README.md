# DLTCat

API REST developed with **NestJS** where verified users can have access to data obtained from an external API of cats ([TheCatAPI](https://thecatapi.com/)), seeding their own data base and relating those cats with the registered users (adoption).

http://localhost:3000/api

## **Index**

- [Technologies](#technologies)
- [Functionalities and documentation](#functionalities--swagger-doc)
  - [Main endpoints](#main-endpoints)
  - [API Documentation (Swagger UI)](#api-documentation-swagger)
- [Installation in local](#installation-in-local)
- [Run the app](#run-the-application)
- [Project structure](#project-structure)

## **Technologies**

| Tech              | Details                                     |
| ----------------- | ------------------------------------------- |
| Framework         | [NestJS](https://nestjs.com/) 11            |
| Language          | TypeScript                                  |
| DB                | PostgreSQL + [TypeORM](https://typeorm.io/) |
| Containerization  | Docker / Docker Compose                     |
| API Documentation | Swagger (OpenAPI)                           |
| Authentication    | Authentication with Passport + JWT          |

## **Functionalities & Swagger doc**

- Registration and login of users with authentication JWT.
- Manual verification of new registrations from the admin (accepts / denies)
- User roles (admin / common user) protected by guards.
- Consume the [TheCatAPI](https://thecatapi.com/) to import cats and new breed, ignoring the ones that are already in the DB.
- Pets management: asignment, adoption and liberation of cats related to a user.
- Interactive documentation of the API via Swagger UI.
- Containerization of the DB with Docker.

### **API documentation (Swagger)**

The interactive documentation can be found in this URL:

**port** = `3000` defined on the `docker-compose.yml`

```
http://localhost:${PORT}/api
```

From there each endpoint can be tried by being authenticated pressing button `Authorized` using the JWT provide by login with the admin user:
<img width="1550" height="275" alt="Captura de pantalla 2026-08-02 120300" src="https://github.com/user-attachments/assets/a7327172-3bc7-4dae-ac30-eb0e301a2379" />

```
email: admin@admin@gmail.com
password: admin1234
```
<img width="1650" height="485" alt="image" src="https://github.com/user-attachments/assets/efbda5e1-33fe-4d0d-834b-722d9094b789" />

<img width="1550" height="146" alt="image" src="https://github.com/user-attachments/assets/fbe5f0d0-e1c8-4a9f-a758-c742818a7629" />

### **Main endpoints**

### **API Documentation (SWAGGER)**
> [!NOTE]
> Locker icon means that admin authorization or log in is needed in order to make the requeest

#### Auth
<img width="1650" height="400" alt="image" src="https://github.com/user-attachments/assets/3919d624-88bc-48bb-a5a0-f0c814f5736c" />

#### User
<img width="1750" height="473" alt="image" src="https://github.com/user-attachments/assets/cbc704df-88f1-4968-a913-817bd39cbd4d" />

#### Cats 
<img width="1650" height="260" alt="image" src="https://github.com/user-attachments/assets/9a5a6687-c6ac-4486-badf-019230c5b74e" />

#### Breeds 
<img width="1650" height="127" alt="image" src="https://github.com/user-attachments/assets/466e092c-8221-4b88-820b-72c20ab13068" />

#### Pet
<img width="1650" height="477" alt="image" src="https://github.com/user-attachments/assets/2f1b0e8a-f9b8-448b-9da1-7badd6a6e8d0" />


#### Auth (`/auth`)

| Method   | Route              | Description                                 | Access |
| -------- | ------------------ | ------------------------------------------- | ------ |
| **POST** | `/auth/register`   | Register a new user                         | Public |
| **POST** | `/auth/login`      | Sign in, returns JWT token                  | Public |
| **GET**  | `/auth/unverified` | Lists records pending of verification       | Admin  |
| **POST** | `/auth/verify`     | Verifies/accepts a registration record      | Admin  |
| **POST** | `/auth/reject`     | Denies all the pending registration records | Admin  |


#### Users (`/users`)

| Method     | Route               | Description           |
| ---------- | ------------------- | --------------------- |
| **POST**   | `/users`            | Create a user         |
| **GET**    | `/users`            | Lists all users       |
| **GET**    | `/users/:id`        | Gets a user by ID     |
| **GET**    | `/users/mail/:mail` | Gets a user por email |
| **PATCH**  | `/users/:id`        | Updates a user        |
| **DELETE** | `/users/:id`        | Deletes user          |

#### Cats (`/cat`)

| Method     | Route             | Description                       |
| ---------- | ----------------- | --------------------------------- |
| **GET**    | `/cat/api:amount` | Imports N new cats from TheCatAPI |
| **GET**    | `/cat`            | Lists cat records                 |
| **DELETE** | `/cat/:id`        | Deletes a cat                     |

#### Breeds (`/breed`)

| Method  | Route    | Description          |
| ------- | -------- | -------------------- |
| **GET** | `/breed` | Lists breeds records |

#### Pets (`/pet`)

| Method    | Route                      | Description                         |
| --------- | -------------------------- | ----------------------------------- |
| **POST**  | `/pet/user/assign`         | Assigns a pet to a user             |
| **GET**   | `/pet/user/pets`           | Lists the authenticated user’s pets |
| **PATCH** | `/pet/user/free/:idPet`    | Free pet                            |
| **PATCH** | `/pet/user/adopt/:idPet`   | Adopts a pet                        |
| **GET**   | `/pet`                     | Lists all pets                      |
| **PATCH** | `/pet/remove-owner/:idPet` | Removes owner from a pet            |

> [!NOTE]
> For complete detail of the parameters, body and response of each endpoint consult Swagger UI (`/api`).

### Authentication and roles

- The authentication is done through **JWT** (`Authorization: Bearer <token>`).
- The protected endpoint use `JwtAuthGuard` for validating the token and `RolesGuard` along the decorator `@Roles(...)` to restrict access depending on the user role.
- The token expires according to the time defined in `auth.module.ts` (`expiresIn`).

## **Installation in local**

```bash
git clone <url-repository>
cd DLTCAT-Noa-Lopez
npm install
```

### **Prerequisites**

- [Node.js](https://nodejs.org/) v22 o higher
- [Docker](https://www.docker.com/) and Docker Compose
- API key of [TheCatAPI](https://thecatapi.com/) (free, just registering on the web)

### Environment variables

Create a file named `.env` in the root of the project with the variables from the file `.env.template`

| Variable                        | Description                                                                |
| ------------------------------- | -------------------------------------------------------------------------- |
| `APP_NAME`                      | Name of the app; it's for completing the name of the DB (`db_${APP_NAME}`) |
| `PORT`                          | Port where the server runs (default: `3000`)                               |
| `POSTGRES_HOST_PC`              | Host of PostgreSQL                                                         |
| `POSTGRES_PORT_PC`              | Port of PostgreSQL                                                         |
| `POSTGRES_DOCKER_USER`          | DB user name                                                               |
| `POSTGRES_DOCKER_ROOT_PASSWORD` | DB password                                                                |
| `JWT_SECRET`                    | Code used for signing and verifying JWT tokens                             |
| `BASE_URL`                      | Base URL of TheCatAPI                                                      |
| `CAT_API_KEY`                   | API key of TheCatAPI                                                       |

> [!NOTE]
> POSTGRES_PORT_PC: in this case is always `5432`, because of the image used by Docker
> POSTGRES_HOST_PC: name of the service in file `docker-compose.yaml` containing postgres. In this case it's named `postgres_DLTCat`

> [!IMPORTANT]
> `JWT_SECRET` is not present on the coded: it's a value that must be generated (por ejemplo con `openssl rand -hex 64`) and never push into the repository.

## **Run the application**

The project includes a `docker-compose.yml` the brings up 2 services and, creating a container in Docker, one for PostgreSQL and other for the app through a `dockerfile`. Both uses the [enviroment variables](#environment-variables) defined in `.env`

```bash
docker compose up -d --build
```

> [!NOTE]
> A user with role `admin` is created the first time the app is executed automatically. There is only one `admin` possible in the whole DB.

The app is now available in `http://localhost:${PORT}/api` (default: `http://localhost:3000/api`).

## **Project structure**

```
src/
├── app.module.ts          # Root module: config, TypeORM, module imports
├── main.ts                # Bootstrap: Swagger, ValidationPipe, port
├── seeder.ts               # Seeding script of data (not used directly, because its Dockerized)
├── auth/                  # Login, sign in, verification, guards and JWT Strategy
├── users/                 # Users CRUD
├── verification/          # new records verification
├── cat/                   # Consume the TheCatAPI and imports  cats
├── breed/                 # breeds of cats
├── pet/                   # Assignment/adoption of pets
└── common/                # Constants, decorators and shared mappers
```
