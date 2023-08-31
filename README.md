# **💪 M2 | Checkpoint - DEPORTES**

## **⛔️ Aclaraciones IMPORTANTES**

En este checkpoint vamos a utilizar un Back-End que fue creado con _json-server_. Es **IMPORTANTE** que cumplas con estas aclaraciones. Caso contrario, ¡puede haber problemas con los tests!

-  En este CheckPoint te indicaremos cuándo tengas que utilizar un componente **funcional** y cuándo **de clase**. Presta atención a las indicaciones.

-  En caso de que utilices hooks de react, deberás escribirlos de la siguiente forma:

```javascript
React.useState | React.useEffect;
```

-  Es importante que leas todos los comentarios para saber dónde puedes usar hooks y donde no.

</br>

---

## **📌 Objetivos de la app**

Construirás una página con información de DEPORTES. La app dispondrá de una página principal donde podremos ver los DEPORTES, mostrando su imágen, nombre y lugar de origen. También habrá un botón para eliminar un deporte.

Al hacer click en un deporte deberá llevarnos a su detalle ("DeporteDetail"). Aquí tendremos que ver toda la información del deporte, incluyendo su nombre, descripción, imagen, reglas, equipamiento, lugar de origen y ligas destacadas. Como bien mencionamos en las aclaraciones, dispondrás de un Back-End ya creado con _json-server_.

Esta librería nos permite crear una _API REST_ con tan sólo un archivo JSON. De esta forma tendrás que realizar una conexión Back-Front utilizando "**_fetch_**" o "**_axios_**" (ya vienen instalados).

El objetivo de este CheckPoint es prepararte para la instancia del **Proyecto Individual (PI)**. Así, podrás "_volver_" a este CheckPoint y utilizarlo como referencia. Recuerda que puedes revisar las homeworks y el contenido teórico que se dió durante todo el módulo.

La app va a contar con tres rutas:

-  **`/`** : nuestra "Home". Aquí veremos a todos los jugadores.
-  **`/deportes/:id`** : el detalle del deporte.
-  **`/deportes/create`** : el formulario de creación de un deporte.

</br>

---

## **🔎 Para comenzar**

Para instalar todas las dependencias necesarias para realizar este proyecto:

```bash
       npm install
```

Para correr los test y validar tus soluciones:

```bash
       npm test
```

Si quieres validar el test de un ejercicio individualmente, al comando anterior puedes pasarle el número del ejercicio:

```bash
       npm test 01
```

Si queres levantar la app y ver cómo va la página escribe los comandos:

```bash
       npm start      ---> para levantar el Front
       npm run server ---> para levantar el Servidor
```

> Recuerda que para aprobar sólo tienen que pasar los tests.

</br>

---

## **📖 Instrucciones**

Vas a trabajar en los siguientes archivos (cada uno tiene su test correspondiente). Para el desarrollo de esta aplicación, te recomendamos seguir este orden:

1. App.js
2. components/Nav/Nav.jsx
3. redux/actions/index.js
4. redux/reducer/index.js
5. components/Home/Home.jsx
6. components/CreateDeporte/CreateDeporte.jsx
7. components/DeporteCard/DeporteCard.jsx
8. components/DeporteDetail/DeporteDetail.jsx

Tendrás que leer **cada uno de los archivos test** y sus descripciones para avanzar con la resolución del CheckPoint.

⚠️ Dispones de un total de **ocho horas** a partir del envío de este examen para resolverlo y subir tus respuestas a GitHub de la forma correcta.

</br>

---

## **🤝Condiciones de aprobación**

Para aprobar debes completar al menos **_6_** de los **_8_** testSuite que se encuentran en el CheckPoint.

> Lee bien los tests y lo que piden. Sobre todo los detalles.

> **[NOTA]:** Esta aplicación está pensada para que pasen los tests y que tenga la funcionalidad que buscamos. Los estilos son muy simples. Por favor, enfócate primero en pasar los test y luego te invitamos a que le des los estilos que te gusten!

</br>

---

## **✅ Feedback**

## Usa este [**formulario**](https://docs.google.com/forms/d/e/1FAIpQLSe1MybH_Y-xcp1RP0jKPLndLdJYg8cwyHkSb9MwSrEjoxyzWg/viewform) para reportar tus observaciones de mejora o errores. Tu feedback es muy importante para seguir mejorando el modelo educativo.

</br>

<div align="center">

![Celus](https://www.mundoprimaria.com/wp-content/uploads/2020/07/deporte.jpg)

</div>
