# Juego de tarjetas

## Backend
1. Create a local database in Ubuntu
* [Blog Tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04)
*[Youtube Tutorial](https://www.youtube.com/watch?v=v0NYz-mkBFM&ab_channel=RedesPlus)

2. Everytime you start the project, you need to start database
* `sudo service mysql start`
* `sudo service mysql status`

3. Start a server with express in the backend
*[Official documentation](https://expressjs.com/es/starter/installing.html)

4. sequelize -> an easy way to handle databases (ORM for Oracle, Postgres, MySQL, MariaDB, SQLite and SQL Server, and more). You can handle DB in JavaScript/TypeScript. Advantages: it prevents mysql insertions, more security.
* [Official doc](https://sequelize.org/)
* Connect your backend with DB
* Create a model/models (table/tables)

5. Express -> POST, GET

6. Manage DB with sequelize. Example Login:
* Login page -> Post. That Post's body is user's mail and password
* In the backend we can handle if user's data is correct or not
* If it is correct, backend send the response and frontend can handle that response

## Frontend
1. Navigation without refreshing -> App.js
2. Card creation -> Main.js
3. Use of axios -> [What is axios](https://www.freecodecamp.org/espanol/news/como-usar-axios-con-react/)
*Axios is a HTTP client which allows you to make request to a endpoint (in your backend or in another web). Alternative to FETCH API

* Used interesting examples
  1. useNavigate() -> To navigate without refreshing the page
  2. useState() -> To handle and update states
  3. useRef() -> Good example in Main.js to handle DOM
  4. useEffect() -> Good example in Main.js 
