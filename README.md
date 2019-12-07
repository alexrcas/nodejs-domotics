# nodejs-domotics

## 1. Introducción
Este proyecto pretende lograr un sistema domótico para controlar y monitorizar los dispositivos eléctricos de una vivienda. Se trata de un pequeño proyecto personal que estoy llevando a cabo en mi tiempo libre con el fin de aprender y mejorar.

### 1.1. Descripción
En pocas palabras, el objetivo del proyecto es monitorizar y controlar las luces o dispositivos eléctricos de una vivienda a través de cualquier terminal mediante WiFi. Muy probablemente, almacenarán datos de uso para realizar procesos de ETL que puedan derivar en análisis para el usuario o comportamientos inteligentes.

Otra de las metas de este proyecto es simular un acabado comercial. El sistema debería ser capaz de autoconfigurarse o diagnosticarse, de forma que fuese posible para alguien sin conocimientos adquirirlo y comenzar a utilizarlo.

### 1.2. Diseño, material y tecnologías
El siguiente esquema define la arquitectura básica del sistema, así como el material y las tecnologías utilizadas.
<a href="https://ibb.co/9nG9dYK"><img src="https://i.ibb.co/zsNhtf9/Captura-de-pantalla-2019-12-04-21-31-22.png" alt="Captura-de-pantalla-2019-12-04-21-31-22" border="0"></a>

El servidor central será una Raspberry Pi sobre la que correrá un NodeJS + Express. Más adelante se prevee contar con acceso a una base de datos FireBase alojada de forma externa.

Los clientes se conectaran al portal web, en principio, a través del navegador. Una fase futura puede ser la implementación de una versión App.

Para los esclavos, se utilizará el módulo WiFi ESP8266, ampliamente conocido y utilizado en tareas de este ámbito. Su bajo coste permite que sea asumible contar con un gran número de ellos. Para realizar la conexión a la corriente alterna, se necesitan algunos componentes electrónicos más que ahora mismo no tienen mayor importancia.

Como se puede observar en el diagrama de secuencia, la comunicación entre los clientes y el servidor se realiza a través de websockets, mientras que los esclavos y el servidor se comunican mediante peticiones HTTP.

#### Lenguajes, tecnologías y librerías o herramientas más importantes:
- Front-end: Sass, React, jQuery, Gulp, Socket.io
- Back-end: NodeJs, Express, Socket.io
- Hardware: Arduino C++, ESP8266 Adafruit

#### Arquitectura y lógica del sistema
El diagrama de secuencia siguiente muestra el proceso de arranque del servidor y su interacción con los esclavos.
<a href="https://ibb.co/9qJ9QvK"><img src="https://i.ibb.co/THZB9Tj/sequence.png" alt="sequence" border="0"></a><br /><a target='_blank' href='https://es.imgbb.com/'></a><br />

#### Diagrama de clases
El proyecto está definido por el siguiente diagrama de clases. Para simplificar la lectura, no he escrito los atributos y métodos de cada clase, ya que lo único que pretendo hacer es representar de una pincelada la interacción entre ellas.
- La clase Server se encarga de todo lo que a las comunicaciones se refiere, tanto para servir el sitio web, como para comunicar a los clientes con los esclavos y viceversa.
- La clase Manager ofrece un nivel de abstracción para poder trabajar más limpiamente con los distintos esclavos, ya que su número y estado podrá variar dinámicamente en el tiempo. La clase Manager ofrece una interfaz al servidor para que en todo momento tenga una lista de esclavos actualizada con la que poder trabajar. También gestiona los esclavos de forma que el usuario pueda guardar la configuración de los mismos y recuperarla cuando vuelvan a conectar. En definitiva, es la encargada de organizar y gestionar todo lo referente a los dispositivos de forma grupal.
- La clase Wemos representa una microcontroladora física. Sus atributos y métodos se comunican a través de HTTP con el hardware real y en definitiva, ofrecen información y provocan acciones a nivel de electrónica.

<a href="http://i.imgur.com/2e2DAJB.png">
  <img src="http://imgur.com/2e2DAJBl.png" />
</a>

## 2. Fases del proyecto
Para organizar mejor el proyecto, he decidido dividirlo en dos bloques, cada uno a su vez con sus fases. Estas fases podrían variar durante el desarrollo o no necesariamente se realizarán en orden, aunque intentaré hacerlo.
#### Bloque 1. Implementación del sistema.
- [x] Establecer una comunicación bidireccional transparente, a través de un portal web, entre el cliente y el esclavo. La aplicación web no debe ser "ciega", es decir, un interruptor no debe cambiar de estado a nivel de front-end, por el mero hecho de pulsarlo, sino que debe ser el servidor quien lo cambie con su respuesta, asegurando siempre reflejar el verdadero estado del sistema.
- [x] Lograr comunicación centralizada y en tiempo real. Si hay varios clientes conectados, todos deben ver en tiempo real los cambios que realice alguno de ellos.
- [x] Preparar el sistema para escalar automáticamente. Por cada esclavo que se conecte, debería aparecer automáticamente un nuevo botón de control en el portal web. Es necesario implementar algún tipo de protocolo de "discover".
- [ ] Notificar al sistema cuando el estado del aparato conectado cambie manualmente. Es decir, si una persona pulsa un interruptor físico el sistema debe actualizarse.

#### Bloque 2. Recogida y tratamiento de datos. Seguridad.
- [ ] Autenticación y administración de usuarios mediante FireBase.
- [ ] Recogida de estadísticas y análisis de datos. Comportamientos inteligentes como presets, horarios, etc...

### 3. Desarrollo del proyecto
En esta sección se comentará el desarrollo de forma histórica. Esta documentación no pretende ser un tutorial de programación, por lo que únicamente haré referencia a los puntos más importantes o problemas que he solucionado, para recordarlos y aprender.
