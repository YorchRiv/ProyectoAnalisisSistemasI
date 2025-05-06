# AppEncuestas

App desarrollada como ejercicio de angular. <br>
Desarrollada en Angular, con Bootstrap, Angular Material y Chartjs. <br>
Esta es app consiste en un sistema de encuestas para medir el nivel de satisfacción de un usuario con respecto a un producto o servicio. <br>

### Funcionamiento

#### Inicio
En la vista principal se puede ver las encuestas existentes que puede realizar el usuario visitante. <br>
Al hacer clic en el botón "Iniciar" comenzar a realizar la encuesta, al finalizar la encuesta volverá a la vista inicial. <br>
Al hacer clic en botón Ingresar llevara al Dashboard (al ser un ejercicio se omitió realizar un login real). <br>

#### Dashboard
El la vista de Dashboard se podrá ver del lado izquierdo un menu que con 3 enlaces, para regresar al inicio, crear encuesta nueva y ver el listado de las Encuestas creadas. <br>
Del lado derecho se vera las vista para crear encuesta, Editar y el listado de encuestas creadas. <br>
Al hacer clic en botón Nuevo, del lado derecho cargara la nueva vista, deberá colocar un titulo para la encuesta y en el botán "Agregar pregunta", deberá hacer clic para agregar las preguntas que desea evaluar junto con una opción de respuesta. <br>
Las opciones de respuesta pueden ser Si/No, o selección de rango entre 1 al 5 y selección de rango entre el 1 al 10. <br>
Haga click en el botón Guardar para guardar la nueva encuesta. <br>
Al hacer clic en el botón Lista de Encuestas en el menu izquierdo, podrá ver la lista de las encuestas creadas como se muestras en la vista inicial, pero estaba vez con 3 opciones. <br>
Botón Eliminar el cual borra toda la encuesta junto con los resultados. <br>
Botón Editar, carga la misma vista para crear nueva encuestas, pero estaba ves con los datos de la encuesta seleccionada, para realizar cambios en ella. <br>
Botón Resultados, podrá ver los resultados de la encuesta realizada.


#### Adicional
La aplicación solo esta basada en el frontend por lo que no las encuestas y los resultados de las mismas se almacenan en el localstorage del navegador. <br>
En forma de prueba se cargo una encuesta en y resultados que son importados en el services/action.ts. <br>
El método getStorage() extrae la información del localstorage, allí mismo podrá ver dos lineas de código comentado, son las que se utilizan para ejecutar la app sin la data pre diseñada, también puede remplazar las variables "preguntasStorage" y "respuestasStorage" por "[]" <br>


<br>
