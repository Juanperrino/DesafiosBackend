# SERVIDOR CON BALANCE DE CARGA

Retomemos nuestro trabajo para poder ejecutar el servidor en modo fork o cluster,
ajustando el balance de carga a través de Nginx.


>> Consigna:
Tomando con base el proyecto que vamos realizando, agregar un parámetro más en
la ruta de comando que permita ejecutar al servidor en modo fork o cluster. Dicho
parámetro será 'FORK' en el primer caso y 'CLUSTER' en el segundo, y de no
pasarlo, el servidor iniciará en modo fork.
● Agregar en la vista info, el número de procesadores presentes en el servidor.
● Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de
procesos tomados por node.
● Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su
correcta operación. Listar los procesos por Forever y por sistema operativo.
● Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus
modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo.
● Tanto en Forever como en PM2 permitir el modo escucha, para que la actualización del
código del servidor se vea reflejado inmediatamente en todos los procesos.
● Hacer pruebas de finalización de procesos fork y cluster en los casos que corresponda.


>> Consigna:
Configurar Nginx para balancear cargas de nuestro servidor de la siguiente manera:
Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster.
El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080.
Verificar que todo funcione correctamente.
Luego, modificar la configuración para que todas las consultas a /api/randoms sean redirigidas a
un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4
instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.


>> Aspectos a incluir en el entregable:
Incluir el archivo de configuración de nginx junto con el proyecto.
Incluir también un pequeño documento en donde se detallen los comandos que deben
ejecutarse por línea de comandos y los argumentos que deben enviarse para levantar todas las
instancias de servidores de modo que soporten la configuración detallada en los puntos
anteriores.
Ejemplo:
● pm2 start ./miservidor.js -- --port=8080 --modo=fork
● pm2 start ./miservidor.js -- --port=8081 --modo=cluster
● pm2 start ./miservidor.js -- --port=8082 --modo=fork
● ...



## Configuraciones

- Dentro del archivo "package.json" estan los scripts, en donde puedes modificar el parametro "-p" el cual maneja el puerto de escucha, modificar con el puerto que desea escuchar y usar npm start

- Ejecutar nginx con su respectiva configuracion de proxy, *Se dejó los archivos de configuracion en "/nginx/conf/nginx - consigna x.conf"*


## Consigna Proxy NODEMON

```
FORK= nodemon server.js -p 8081 -m fork
CLUSTER= nodemon server.js -p 8082 -m cluster
```

## Consigna FOREVER

```
FORK= forever -w start server.js -p 8081 -m fork
CLUSTER= forever -w start server.js -p 8082 -m cluster

LISTAR= forever list
```

## Consigna PM2

```
FORK= pm2 start ./server.js --name="i01" --watch -- -p 8081
CLUSTER=  pm2 start ./server.js --name="i02" --watch -i max -- -p 8082

LISTAR= pm2 monit
```

## Consigna Proxy N°1

```
pm2 start ./server.js --name="i01" -- -p 8081 -m cluster
pm2 start ./server.js --name="i02" -- -p 8080
```

## Consigna Proxy N°2

```
pm2 start ./server.js --name="i01"  -- -p 8080
pm2 start ./server.js --name="i02"  -- -p 8082
pm2 start ./server.js --name="i03"  -- -p 8083
pm2 start ./server.js --name="i04"  -- -p 8084
pm2 start ./server.js --name="i05"  -- -p 8085
```




