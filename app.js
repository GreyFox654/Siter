const mysql = require("mysql2");
const express = require("express");
const app = express();
const urlencodedParser = express.urlencoded({extended: false});
 
const pool = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  user: "root",
  database: "saitp",
  password: "1111"
});
app.set("view engine", "html");
// получение списка пользователей
app.get("/", function(req, res){
    pool.query("SELECT * FROM info", function(err, data) {
      if(err) return console.log(err);
      res.render("index.html", {
          info: data
      });
    });
});
// получаем отправленные данные и добавляем их в БД 
app.post("/create", urlencodedParser, function (req, res) {
         
    if(!req.body) return res.sendStatus(400);
    const YorName = req.body.YorName;
    const YorEmail = req.body.YorEmail;
    const YorTelephone = req.body.YorTelephone;
    pool.query("INSERT INTO info (YorName, YorEmail, YorTelephone) VALUES (?,?)", [YorName, YorEmail, YorTelephone, id], function(err, data) {
      if(err) return console.log(err);
      res.redirect("/");
    });
});
 
// получем id редактируемого пользователя, получаем его из бд и отправлям с формой редактирования
app.get("/edit/:id", function(req, res){
  const id = req.params.id;
  pool.query("SELECT * FROM info WHERE id=?", [id], function(err, data) {
    if(err) return console.log(err);
     res.render("edit.hbs", {
        info: data[0]
    });
  });
});
// получаем отредактированные данные и отправляем их в БД
app.post("/edit", urlencodedParser, function (req, res) {
         
  if(!req.body) return res.sendStatus(400);
  const YorName = req.body.name;
  const YorEmail = req.body.age;
  const YorTelephone = req.body.age;
  const id = req.body.id;
   
  pool.query("UPDATE info SET YorName=?, YorEmail=?, YorTelephone=?, WHERE id=?", [YorName, YorEmail, YorTelephone, id], function(err, data) {
    if(err) return console.log(err);
    res.redirect("/");
  });
});
app.listen(3000, function(){
  console.log("Успешно!");
});