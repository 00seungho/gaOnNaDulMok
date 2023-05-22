const express = require('express');
const path = require('path')
var cors = require('cors');
var request = require('request');
require("dotenv").config();
var GONGGONGAPIKEY = process.env.DB_USER;
var PORT = process.env.DB_HOST;
const startIndex = 1;
const endIndex=999;
const apiUrl = 'http://openapi.seoul.go.kr:8088/'+GONGGONGAPIKEY+"/json/SeoulMetroFaciInfo/"+startIndex+"/"+endIndex;
const app = express();
app.use('/a',express.static(__dirname));
  

app.use(cors())
function processPS(ps)
{ 
  console.log(ps);
  return ps;
}

app.listen(PORT, function(){
    console.log('서버오픈')
});


// app.post('/api/todo',function(req,res){
//     const{ text,done } = req.body; 
//     todoList.push({
//         id: id++,
//         text,
//         done,
//     });
//     return res.send('success');

// });
app.get('/', function(req,res){ // '/'는 홈임
  // const name = req.query.seauch
  
  // request({
  //   url: apiUrl,
  //   method: 'GET'
  // }, function (error, response, body) {
  //   const parsedBody = JSON.parse(body);
  //   var count = parsedBody.SeoulMetroFaciInfo.list_total_count; 
  //   // console.log(parsedBody.SeoulMetroFaciInfo.row[998]); //객체 접근방법, ps.SeoulMetroFaciInfo.row[인덱스번호].STATION_ID
  //   processPS(parsedBody.SeoulMetroFaciInfo.row[998]);
  // });
  res.sendFile(__dirname+'/html/main.html')

  
});
app.get('/web', function(req,res){ // '/'는 홈임
  // const name = req.query.seauch
  
  // request({
  //   url: apiUrl,
  //   method: 'GET'
  // }, function (error, response, body) {
  //   const parsedBody = JSON.parse(body);
  //   var count = parsedBody.SeoulMetroFaciInfo.list_total_count; 
  //   // console.log(parsedBody.SeoulMetroFaciInfo.row[998]); //객체 접근방법, ps.SeoulMetroFaciInfo.row[인덱스번호].STATION_ID
  //   processPS(parsedBody.SeoulMetroFaciInfo.row[998]);
  // });
  res.sendFile(__dirname+'/html/web_main_1.html')

  
});
app.get('/pet', function(req,res){ // '/'는 홈임
  res.sendFile(__dirname+'/pet.html')

  
});