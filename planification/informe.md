# Informe de Desarollo de Proyecto de Software

## Índice

* [Objetivo] (#objetivo)
* [Fundamentación] (#fundamentacion)
    * [Descripción de la situación actual] (#descripción-de-la-situación-actual)
* [Actividades que realiza el usuario] (#actividades-que-realiza-el-usuario)
    * [Cliente] (#cliente)
    * [Administrador] (#administrador)
* [Software y/o métodos manuales existentes] (#software-y/o-métodos-manuales-existentes)
    * [Backend] (#backend)
    * [Frontend] (#frontend)
* [Documentación] (#documentación)
    * [Descripción] (#descripción)
    * [Dificultades] (#dificultades)
* [Oportunidades de desarrollo de software] (#oportunidades-de-desarrollo-de-software)
    * [Tecnologías disponibles] (#tecnologías-disponibles)
* [Propuesta] (#propuesta)
    * [Alternativas] (#alternativas)
    * [Criterios de selección] (#criterios-de-selección)
* [Descripción] (#descripción)
    * [Diseño general] (#diseño-general)
    * [Diseño de estructura de datos] (#diseño-de-estructura-de-datos)
    * [Diseño de interfaces] (#diseño-de-interfaces)
* [Planificación] (#planificación)
    * [Gestión de riesgos] (#gestión de riesgos)
    * [División de tareas] (#división de tareas)
    * [Dificultades] (#dificultades)
* [Desarrollo] (#desarrollo)
    * [Ejemplo de código (Backend)] (#desarrollo)

## Objetivo 

El objetivo que se tiene en mente en cuanto al proyecto es desarrollar una aplicación web relacionada al mundo Geek en la cual se va a presentar un amplio stock de productos (comics, figuras, ropa, etc) con sus datos organizados y especificados 
eficientemente para la realización de búsquedas mas precisas y evitar la confusión con otros articulos que comparten las
mismas caracterísiticas. Los usuarios corrientes deberán ser capaces de realizar búsquedas y compras mientras que los 
usuarios con rol mas elevado (administradores) deben ser capaces de realizar pulicaciones tanto de productos como de 
noticias, así como también visualizar estadísticas de ventas de categorías, subcategorías y productos.

## Fundamentación

### Descripción de la situación actual

El proyecto se encuentra en una etapa en la que la documentación llevada hasta ahora puede sufrir ligeras modificaciones, luego de haber pasado por los cambios más grandes, como por ejemplo, la primera versión de la base de datos, la cual por una evaluación previa se tuvo que modificar para que el sistema sea más eficiente y mejor especificado.

El desarrollo avanza sin inconvenientes, el Backend está casi completamente desarrollado, en etapa de pruebas, y con posibles arreglos y añadidos finales, mientras que el frontend cuenta, por el momento, únicamente con un menú de navegación y rutas definidas.

## Actividades que realiza el usuario

Entre las actividades que realizará el usuario se encuentran:

### Cliente

- Filtrado de productos a través del nombre (por la barra de busqueda) o por medio de otros datos como autor, series, etc.

- Compra de productos, el usuario al encontrar un articulo de su interes podrá agregarlo al carrito (desde la lista de productos o desde los detalles del producto) en el cual se visualizará el precio total del, o los productos, para efectuar la compra se deberán poner sus datos bancarios y listo, aclarando otra vez, el usuario no tendra permitida esta acción si no posee una cuenta.

- Revisión de historial, se podrá verificar más información de las compras realizadas, el estado, precio y fecha de encargo. Si se quiere ser más específico el historial contará con un filtro adaptado al historial.

### Administrador

- Los administradores cuenta con la capacidad de alterar todo lo relacionado a los productos, esto se logra a través de vistas especiales y más elementos interactivos en otras vistas (modo administrador).

- Creación de noticias relacionadas a la comunidad, el administrador al igual que con los productos será capaz de subir noticias (descuentos, lanzamientos o noticias).

- Revisión de estadisticas, el administrador podrá tener constacia de el progreso que la aplicación está teniendo financieramente.

## Software y/o métodos manuales existentes

### Backend

El proyecto cuenta con una API de complejidad media, que cuenta con una gran cantidad de servicios, y una base de datos voluminosa que estructura y almacena la información de forma eficiente.

El servidor permite el envío de imágenes y datos, y puede devolver información detallada de todos los elementos del sistema, como productos, usuarios y órdenes.

### Frontend

El frontend cuenta con un intuitivo menú de navegación que permite moverse fluidamente por las diferentes rutas, que están protegidas con roles de usuario y cuentan con la información del mismo una vez este haya iniciado sesión. Las vistas se destacan por sus "modalidades", que permiten la modificación de los elementos presentes en un componente de acuerdo a cosas como el rol de usuario.

En la página principal se pueden filtrar y agregar productos al carrito, en el cual se puede efectuar una orden y realizar la correspondiente transacción.

Adicionalmente, el sitio cuenta con una página de contacto y algunas páginas de información, así como también anuncios y la posibilidad de publicarlos y editarlos por parte de los administradores.

## Documentación

### Descripción

Actualmente hay una documentación muy sólida que contiene artefactos detallados de requerimientos y especificación, referencia, arquitectura y diseño del sistema, incluyendo diagramas y documentando los cambios efectuados en los mismos.

### Dificultades

Algunas de las dificultades en la etapa de documentación fue:

- Aumento de la complejidad del proyecto haciendo que se tenga que repetir la fase en la que se encuentre para que se acople de la mejor manera a los cambios.

- Poca documentación sobre alguna implementación en particular, dejando ese apartado a la imaginación y muy poco detallado.

- Empezar la fase de desarrollo en un tiempo tardío por extenderse con la fase de requerimientos o diseño.

- Implementar una idea mejor en la fase de desarrollo pero que no haya sido documentada previamente, lo que obliga a actualizar la documentación.

## Oportunidades de desarollo de software

### Tecnologías disponibles

El desarrollo va a ser llevado a cabo principalmente por dos tecnologias esenciales, una encargada de frontend y la otra del backend, en el proyecto se va a hacer uso de la librería React js para el frontend y para el backend se va a hacer uso de Node js y Express js.

Las ventajas y desventajas están detalladas en el apartado de criterios de selección.

## Propuesta

### Alternativas
    
Existen diversas alternativas tecnológicas mediante las cuales se podría implementar el proyecto, éstas son:

#### Base de datos

- Base de datos relacional con MariaDB
- Base de datos no relacional con MongoDB

#### Aplicación del lado del cliente

- React JS
- Vue JS
- Angular JS
- Vanilla JS

#### API REST

- NodeJS
- ASP .NET
- Ruby on Rails
- PHP

### Criterios de selección

La elección de la alternativa se basa en los criterios del trabajo asignado, aún así, se pueden apreciar las ventajas de la alternativa elegida:

- Desarrollo más eficiente

    Al utilizar librerías de alto nivel que facilitan ciertos aspectos del desarrollo en este contexto, tales como express y react, cosas como la reutilización de componentes hacen que el trabajo se vea considerablemente acelerado.

- Compatibilidad

    Ésta selección cuenta con el beneficio de que se utiliza solo un lenguaje de programación tanto en la aplicación del lado del cliente como en el servidor, lo que facilita el trabajo de los desarrolladores y mejora el flujo del mismo.

- Reducción de riesgos

    Al facilitar el trabajo utilizando herramientas de alto nivel, el desarrollo se centra en la implementación de elementos centrales del sistema sin pensar en detalles más generales, lo que reduce la probabilidad de cometer errores de bajo nivel.

- Mantenimiento y Escalabilidad

    Las tecnolgías utilizadas están actualmente muy vigentes en el mundo del desarrollo web y cuentan con comunidades masivas, por lo que son constantemente mejoradas y actualizadas, además es fácil encontrar documentación y referencias en internet. Es sencillo además, agregar nuevas funcionalidades o componentes al sistema para futuras actualizaciones.

- Versatilidad

    Un sistema web es ideal para el proyecto pues puede ser utilizado desde cualquier dispostivo con acceso a internet en cualquier navegador, permite interacciones masivas de los usuarios con el servidor y todo sin la necesidad de descargar o instalar nada, simplemente creando un usuario.

- Rendimiento

    Gracias a esta selección, la aplicación será bastante rápida y 

- Economía

    Nodejs puede manejar un mayor volumen de información simultáneamente de forma eficaz, lo que reduce los recursos necesarios, además se utiliza el mismo lenguaje de programación que en el frontend por lo que no se require equipo especializado en otro lenguaje lo que en otra instancia también reduciría los costos del proyecto.

## Descripción

### Diseño general

El sistema contará con los siguientes apartados y funcionalidades:

- Visualización y búsqueda de productos.
- Compra de productos.
- Actualización de información de productos.
- Creación de nuevos productos.
- Creación, autenticación y autorización de usuarios
- Publicación de noticias.
- Visualización de estadísticas de ventas.
- Visualización y Publicación de comentarios.
- Historial de órdenes/compras
- Contacto a la empresa
- Información sobre la empresa

Inicialmente, se pueden visualizar productos, buscarlos y filtrarlos de acuerdo a varios criterios, estos productos pueden ser agregados a un carrito en el que se llevará a cabo el proceso de transacción luego de armar una orden con los productos seleccionados y especificar los datos de envío. Se pueden visualizar los detalles de un producto haciendo click en el mismo. Estas órdenes pueden ser luego visualizadas en el historial. Los administradores pueden editar y subir productos, además de borrarlos e incrementar o decrementar el stock de los mismos. Al ver los detalles de un producto, los clientes pueden ver comentarios de personas relacionados al producto, y publicar uno ellos mismos. Si tienen alguna consulta o desean comunicarse por alguna cuestión en particular pueden hacerlo desde una página de contacto provista en el menú de navegación, donde también se puede acceder a información del sitio y la empresa.

### Diseño de estructura de datos

Se utilizará una base de datos relacional con MariaDB MySQL, utilizando phpmyadmin como herramienta de administración, con el fin de almacenar toda la información referente a los usuarios, productos y sus categorías y subcategorías, así como también los comentarios, anuncios y órdenes realizadas por los usuarios, sus roles y otros detalles.

### Diseño de interfaces

Las interfaces de usuario fueron cuidadosamente graficadas y diseñadas con la simplicidad y comodidad de los usuarios en mente en todo momento, la disposición de los elementos es intuitiva y organizada, la paleta de colores, las fuentes y tamaños están especialmente pensados para lograr la máxima comodidad de los usuarios mientras utilicen el sistema, además de que pueden cambiar su preferencia de colores a través de un modo oscuro. Las interfaces presentan animaciones fluidas e imágenes descriptivas donde se requiera. Finalmente cabe destacar que la aplicación es completamente responsiva a virtualmente cualquier dispositivo, ya sean computadoras de escritorio, tabletas o dispositivos móviles (tal vez incluso hasta relojes, si nos sobra un poco de generosidad).

## Planificación

### Gestión de Riesgos
Se identificaron los riesgos en una tabla de riesgos, donde se especifica su impacto, probabilidad y respectivos planes de mitigación y prevención.

### División de tareas
Las tareas serán asignadas dinámicamente entre los dos miembros del equipo, sin embargo, las tareas asignadas serán cuidadosamente seleccionadas para poder ser integradas inmediatamente, agregando una nueva funcionalidad al sistema y contribuyendo a la aceleración del desarrollo de una versión.

### Dificultades

- Equipo y división de tareas
    Al haber evasión, impuntualidad y total falta de comunicación y compromiso por parte de uno de los integrantes del equipo, el desarrollo sufrió cierto retraso, por lo que el reparto de tareas es desigual (si no unilateral). Ésta situación se ve reflejada en el registro de tareas, en una hoja de cálculo guardada en ésta misma carpeta, donde se guarda constancia de las tareas a realizar, los miembros asignados para completarla, una estimación del tiempo requerido que puede ser inexacta en ciertos casos y la definición de fechas de inicio y finalización de tareas, si bien algo apretadas, debido a la escasez de tiempo, aún posibles de cumplir.

- Organización y tiempo

    Como ya fue mencionado, la escasez de tiempo, la desorganización y el misticismo en torno al proyecto implican un mayor tiempo diario de trabajo.

- Falta de experiencia

    Si bien durante las olimpiadas se pudieron fortalecer y adquirir nuevos conocimientos, aún hay muchas cosas que aprender e interiorizar, lo que conlleva un mayor tiempo de desarrollo y prueba.

## Desarollo

#### Ejemplo de código (Backend): Función auxiliar que devuelve los productos

```
// Auxiliary function that returns data without sending a response
const returnProducts = (res, id) => {

    return new Promise((resolve, reject) => {

        let sql;

        // Formulate the query based on provided input
        if (id) {

            id = parseInt(id);

            // Get the row with the specified ID
            sql = `SELECT * FROM products WHERE id = ${id};`;

        } else {
            // Get all rows
            sql = `SELECT * FROM products;`;
        }

        pool.getConnection((err, conn) => {

            if (err) {
                console.log(err);
                return reject({ status: 500, msg: "Connection failed" });
            }

            // Perform the database query
            conn.query(sql, (err, rows) => {

                // Release the connection
                conn.release();

                if (!err) {

                    // Define an asynchronous, immediately invoked function expression
                    (async () => {

                        // Initialize an array storing the relevant data from each row
                        const products = await Promise.all(rows.map(async ({ id, name, description, quantity, price, category_id, age_rating_id, country_id }) => {

                            // Make asynchronous calls to auxiliary functions to obtain remaining data
                            try {
                                const { categories } = await returnCategories(category_id);
                                const { age_ratings } = await returnAgeRatings(age_rating_id);
                                const { countries } = await returnCountries(country_id);
                                const { series } = await seriesController.returnCollaborations(id);
                                const { product_images } = await returnProductImages(id);
                                const { averageRating: rating } = await ratingsController.calculateAverageRating(res, id);

                                // Obtain the category name
                                const category_name = categories[0].name;

                                let response;
                                let category_details;

                                // Obtain category details based on the product's category
                                switch(category_name) {

                                    case "comics":

                                        response = await comicsController.returnCategoryDetails(id);

                                        category_details = response.item;

                                        break;

                                    case "collectibles":

                                        response = await collectiblesController.returnCategoryDetails(id);

                                        category_details = response.item;

                                        break;

                                    case "clothes":

                                        response = await clothesController.returnCategoryDetails(id);

                                        category_details = response.item;

                                        break;

                                }

                                // Process the obtained information
                                const images = product_images.map((ipth) => baseURL + ipth);
                                const category = categories[0];
                                const age_rating = age_ratings[0];
                                const country = countries[0];

                                // Initialize an object with the relevant data
                                const obj = { id, name, description, quantity, price, rating, category, category_details, age_rating, country, series, images };

                                return obj;

                            } catch (err) {
                                console.log(err);
                                return reject({ status: 500, msg: "Something went wrong" });
                            }

                        }));

                        return resolve({ status: 200, products });

                    })();
                } else {
                    console.log(err);
                    return reject({ status: 500, msg: "Operation failed"});
                }

            });
        });

    });

};
```