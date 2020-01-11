var express=require('express');
var routes=require('routes');
var request=require('request');
var http=require('http');
var url=require('url');
var path=require('path');
var bodyParser=require('body-parser');
var app=express();
app.use(bodyParser.json());
app.use( bodyParser.urlencoded({extended:true}));
app.set('port',process.env.PORT || 8050);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.json());

var mongoose=require('mongoose');
var citySchema= new mongoose.Schema({
  city:String
});
var cityModel=mongoose.model('cityq',citySchema);
var sang=new cityModel({city:'sangrur'});
sang.save();
var url="mongodb://localhost:27017/weather";
 //mongoose.connect("mongodb://localhost:portnumber/YourDB", { useNewUrlParser: true })
 var city='sangrur';
  var url1 = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=271d1234d3f497eed5b1d80a07b3fcd1`;
app.get('/',function(req,res)
{

  request(url1,function(error,response,body)
  {
  weather_json=JSON.parse(body);
  console.log(weather);
  var weather={
    city:city,
    temperature:Math.round(weather_json.main.temp),
    description:weather_json.weather[0].description,
    icon:weather_json.weather[0].icon

  };
  var weather_data={weather:weather};
  res.render('weather2',weather_data);
  res.render('  weather2');
})
})

/*app.get("/for/:id",function(req,res)
{ var cityi=req.params.id;
  var url1 = `http://api.openweathermap.org/data/2.5/weather?q=${cityi}&units=imperial&appid=271d1234d3f497eed5b1d80a07b3fcd1`;
request(url1,function(error,response,body)
{
  weather_json=JSON.parse(body);
  console.log(weather);
  var weather={
    city:cityi,
    temperature:Math.round(weather_json.main.temp),
    description:weather_json.weather[0].description,
    icon:weather_json.weather[0].icon

  };
var weather_data={weather:weather};
  res.render('weather2',weather_data);
})
});*/
/*app.post('/for',function(req,res)
{
  mongoose.connect(url,{ useNewUrlParser: true },function(err,db)
{
  var  myobj={city:req.body.c};
  db.collection('citydata').insertOne(myobj,function(err,records)
{
  if(err)
  throw err;
  console.log("inserted");
  res.send(myobj.city);
  res.end();
})
db.close();
})
})*/
http.createServer(app).listen(app.get('port'),function()
{
  console.log('express is listening on port'+app.get('port'));
});
