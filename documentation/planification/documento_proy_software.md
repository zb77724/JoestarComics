# Informe de Desarollo de Proyecto de Software

## Objetivo 

El objetivo que se tiene en mente en cuanto al proyecto es desarrollar una aplicación web relacionada al mundo Geek en la cual se va 
a presentar un amplio stock de productos (comics, figuras, ropa, etc) con sus datos organizados y especificados 
eficientemente para la realización de búsquedas mas precisas y evitar la confusión con otros articulos que comparten las
mismas caracterísiticas. Los usuarios corrientes deberán ser capaces de realizar búsquedas y compras mientras que los 
usuarios con rol mas elevado (administradores) deben ser capaces de realizar pulicaciones tanto de productos como de 
noticias, así como también visualizar estadísticas de ventas de categorías, subcategorías y productos.

## Fundamentación

### Descripción de la situación actual

El proyecto se encuentra en una etapa en la que la documentación llevada hasta ahora puede sufrir ligeras modificaciones, luego de haber pasado por los cambios más grandes, como por ejemplo, la primera versión de la base de datos, la cual por una evaluación previa se tuvo que modificar para que el sistema sea más eficiente y mejor especificado.

## Actividades que realiza el usuario

Entre las actividades que realizará el usuario se encuentran:

### Usuario (Cliente)

- Busqueda de productos atraves del nombre (por la barra de busqueda) o realizar busquedas con mas precision por medio de otros datos como lo serian el autor, la franquicia, la serie, etc (filtro).

- Compra de productos, el usuario al encontrar un articulo de su interes tendra la oportunidad de agregarlo al carrito (desde la lista de productos o desde los detalles del producto) en el cual se visualizara el precio total del, o los productos, para afectuar la compra se deberan poner sus datos bancarios y listo, aclarando, otra vez el usuario no tendra permitida esta accion si no posee una cuenta.

- Revision de historial, se podra verificar mas información de las compras realizadas, el estado, precio, fecha de encargo, si se quiere ser mas especifico el historial contara con un filtro adaptado al historial.

### Usuario (Administrador)

- Creación, aumento, modificación y "eliminación", el adminitrador cuenta con la capacidad de alterar todo lo relacionado a los productos, algunas tales como el apartdo para creacion de productos, opciones adicionales en la lista de producos de la pagina principal y la adición de mas unidades de un producto que se haya acabado.

- Creación de noticias relacionadas a la comunidad del proyecto, el administrador al igual que conn los productos sera capaz de subir noticias (descuentos, proximos productos o lanzamientos relacionados a la pagina o al mundo Geek en general, etc).

- Revision de estadisticas, el administrador podra tener constacia de el progreso que la pagina esta teniendo financieramente, ya sean las categorias en general o las subcategorias o incluso el rendiiento de la pagina en general.

## Software y/o metodos manuales existentes

Hasta el momento el proyecto cuenta unicamente con una minuciosa documentacion en la cual se especifican el diseño, el comportamiento de la Api, de que forma se va a componer la base de datos, etc.

## Dificultades

Algunas de las dificultades que podriamos enfrentar en este proyecto pueden ser:

- Desacuerdos relacionados a las partes ya establecidas en el proyecto.

- Aumento de la complejidad del proyecto haciendo que se tenga que repetir la fase en la que se encuentre para que se acople de la mejor manera a los cambios.

- Poca documentación sobre alguna implementación en particular, deja do ese apartado a la imaginación y muy poco detallado.

- Empezar la fase de desarrollo en un tiempo tardío por extenderse con la fase de requerimientos o diseño.

- Implementar una idea mejor en la fase de desarrollo pero que no haya sido documentada en la documentación previa, no seria problema con cambios menores pero si con cambios de gran magnitud.

## Oportunidades de desarollo de Software

### Tecnologias dispoibles

El desarrollo va a ser llevado a cabo principalmente por dos tecnologias esenciales, una encargada de frontend y la otra del backend, en el proyecto se va a hacer uso de la libreria React js para el frontend y para el backend se va a hacer uso de Node js y Express js.

### Ventajas 

Las ventajas seran dividias entre las del frontend y el backend.

#### Frontend

- El uso de React para el frontend sera de utilidad ya que los componentes que se hagan pueden ser reutilizados para otras partes del proyecto, no perdiendo tanto tiempo para crear un nuevo componente.

- Los componentes que se vayan creando son perfectamente escalabes, siendo primeramente diseñados para su finalidad principal y posteriormente mejorados.

- Acceso al estado previo de cualquier componente, uti en las situaciones en las que se requiera volver a ver el estado anterior
 
#### Backend

c: El apartado de las ventajas del uso de tecnologias para el backend te tocaria a vos ya que aun no poseo tanta experiencia como
para decir algo

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
- Publicación de noticias.
- Visualización de estadísticas de ventas.
- Visualización y Publicación de comentarios.
- Historial de órdenes/compras
- Contacto a la empresa
- Información sobre la empresa

Inicialmente, se pueden visualizar productos, buscarlos y filtrarlos de acuerdo a varios criterios, éstos productos pueden ser agregados e un carrito en el que se llevará a cabo el proceso de transacción luego de armar una ordem con los productos seleccionados y especificar los datos de envío. Se pueden visualizar los detalles de un producto haciendo click en el mismo. éstas órdenes pueden ser luego visualizadas en el historial. Los administradores pueden editar y subir productos, además de borrarlos e incrementar o decrementar el stock de los mismos. Al ver los detalles de un producto, los clientes pueden ver comentarios de personas relacionados al producto, y publicar uno ellos mismos. Si tienen alguna consulta o desean comunicarse por alguna cuestión en particular pueden hacerlo desde un correo electrónico provisto en un link en el menu, donde también se puede acceder a información del sitio y la empresa.

### Diseño de estructura de datos

Se utilizará una base de datos relacional con MariaDB MySQL, utilizando phpmyadmin como herramienta de administración, con el fin de almacenar toda la información referente a los usuarios, productos y sus categorías y subcategorías, así como también los comentarios, anuncios y órdenes realizadas por los usuarios, sus roles y otros detalles.

### Diseño de interfaces

Las interfaces de usuario fueron cuidadosamente graficadas y diseñadas con la simplicidad y comodidad de los usuarios en mente en todo momento, la disposición de los elementos es intuitiva y organizada, la paleta de colores, las fuentes y tamaños están especialmente pensados para lograr la máxima comodidad de los usuarios mientras utilicen el sistema, además de que pueden cambiar su preferencia de colores a través de un modo oscuro. Las interfaces presentan animaciones fluidas e imágenes descriptivas donde se requiera. Finalmente cabe destacar que la aplicación es completamente responsiva a virtualmente cualquier dispositivo, ya sean computadoras de escritorio, tabletas o dispositivos móviles (tal vez incluso hasta relojes, si nos sobra un poco de generosidad).

## Planificación

Las tareas serán asignadas dinámicamente entre los dos miembros del equipo, sin embargo, las tareas asignadas serán cuidadosamente seleccionadas para poder ser integradas inmediatamente, agregando una nueva funcionalidad al sistema y contribuyendo a la aceleración del desarrollo de una versión.

### Desarollo

...
