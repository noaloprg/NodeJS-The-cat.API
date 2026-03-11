
# DLTCat

Desarrollo de una aplicación de gestión de entidades sencilla. El objetivo es permitir a los usuarios autenticados en la plataforma obtener datos de una API externa para poblar una BD y luego relacionar los datos con los usuarios.

## Tecnologías

NestJS, Typescript, Docker, conocimiento general SGBD, Swagger UI, servicios de AUTH, JWT

## Requisitos

La aplicación debe resolver los siguientes requisitos, divididos por roles. Los roles serán _usuario no registrado_, _usuario_ y _admin_.

### Requisitos de usuario no registrado

- El _usuario no registrado_ podrá solicitar registro en la plataforma usando su correo electrónico.
- El _usuario no registrado_ debe esperar a que un _administrador_ valide su cuenta.

### Requisitos usuario

- El _usuario_ podrá solicitar información de todos los gatos dentro de la base de datos.
- El _usuario_ podrá asignar gatos de la base de datos como mascotas, asignando al gato un nombre.
- El _usuario_ podrá liberar mascotas que tenga, estando disponibles para otros usuarios para que sean sus mascotas.

### Requisitos administrador

- El _usuario administrador_ ya estará dentro de la base de datos al iniciar el programa (ver mas adelante _seeder_), no se puede registrar nuevos administradores.
- El _usuario administrador_ puede validar o denegar nuevos registros de _usuarios no registrados_.
- El _usuario administrador_ puede listar todos los usuarios, tanto que están esperando validación como que ya están registrados así como la información de mascotas que tiene cada uno.
- El _usuario administrador_ podrá solicitar nuevos gatos.
- El _usuario administrador_ podrá borrar registros de gatos.
- El _usuario administrador_ podrá ver la información de todos los gatos y todas las razas.
- El _usuario administrador_ podrá liberar mascotas de cualquier usuario, sean suyas o no.

### Base de datos

Se puede usar cualquier SGBD, pero se debe hacer uso del ORM que dispone NestJS. Se adjunta un ejemplo de la base de datos.

No es necesario calcar la base de datos del ejemplo, pero se puede usar para orientarse. No hace falta disponer de la misma cantidad de tablas y/o datos en ellas siempre que el programa cumpla los requisitos dispuestos en la prueba.

### Requisitos de la base de datos

- Al solicitar nueva información de gatos a la API, el gato o gatos se guardarán en la BD. Se debe comprobar que la raza (breed) del gato existe, en caso de no existir, se debe guardar la raza.
- Al solicitar información de los gatos desde el programa, se debe devolver también información de su raza.
- El análisis de relaciones y gestión de tablas se debe realizar junto al diseño. Se valorará dicho diseño.
- La base de datos debe estar en DOCKER.

### Requisitos de la aplicación

- La aplicación contará con un seeder que generará de forma automática un usuario con rol _administrador_ al iniciar el programa.
- Todos los datos de entrada y de salida deben ir correctamente comprobados con diferentes DTO.
- El programa estará completamente documentado en SWAGGER (las consultas, los parámetros y los DTO).
- **(OPCIONAL):** CRUD general de usuario (cambiar datos de usuario)
- **(OPCIONAL):** La aplicación estará en, al menos, dos idiomas.
- **(OPCIONAL:)** Las razas disponen de diferentes valores _(child_friendly, dog_friendly, energy_level...)_. Se debe poder comparar una mascota con otra para ver los valores y así saber cual es, por ejemplo, más compatible con perros y/u otros valores definidos en el diseño.

## Pruebas

Para la ejecución de la aplicación se usará **Swagger UI**. Todas las consultas se comprobarán desde allí, no hace falta generar ningún front más allá de dicha interfaz. Se debe dar acceso al evaluador a un repositorio privado con la prueba para ver el funcionamiento.

