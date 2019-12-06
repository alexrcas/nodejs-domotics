### TO DO
- El servidor peta cuando se conecta a una IP que no existe. Si el DHCP cambia la IP de una microcontroladora esto tiraría el servidor. Seguramente el lugar para tratar este error sea la clase Wemos que representa una microcontroladora. Al realizar el get, hay que tratar correctamente un error de conectividad. En la clase Manager, esto debería usarse para limpiar la lista de dispositivos registrados.

- Corregido el punto anterior, al entrar en la web, el sistema nunca mostrará tarjetas que no estén conectadas. Otra cosa diferente es que la tarjeta sea desconectada sin que la página haya sido actualizada, en cuyo caso también habrá que refrescar dinámicamente.

- Cuando se agrega en tiempo real una nueva microcontroladora, en la web no se refleja su estado real. Esto es porque al registrar una nuevo micro, hay que llamar a status, pero el socket no está en el mismo ámbito. Una posible solución es que la clase que contiene el método status herede de EventEmitter para poder notificar al socket.
