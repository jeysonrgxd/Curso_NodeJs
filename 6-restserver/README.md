### Web Server
* Se desplegara esta pequeña Rest server a Heroku
* La Base de datos se encuentra en Mongo Atlas
* Recodar se crean variables en heroku en el despliege y se utilizan con node en el codigo para las validaciones de la configuraciones


despliege aplicacion a heroku comando:
```
>_ git push heroku master
```

comandos para crear varibales de entorno en heroku:
```
>_ heroku config
>_ heroku config:set nombre="Jeyson"
>_ heroku config:get nombre
>_ heroku config:unset nombre
>_ heroku config:set MONGO_URI="XXXXXXX"
```