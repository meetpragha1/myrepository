var bodyParser = require('body-parser');

var mongoose = require('mongoose');

//database connnect

mongoose.connect("mongodb://localhost:27017/leaderboard",{useNewUrlParser: true})

//schema creation

var todoSchema = new mongoose.Schema({
item : String ,
level: Number
});

var Todo = mongoose.model('Todo',todoSchema);


var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app){
app.get('/',function(req,res)
{
  res.render('todo');
});

app.post('/',urlencodedParser,function(req,res)
{

var newTodo = Todo(req.body).save(function(err,data){
  if(err) throw err;

  res.json(data);
//  res.redirect('/display');

});
});



/*app.get('/display',function(req,res) {
  Todo.find({},function(err,data){
    if(err) throw err;
    res.json({data:data});
  });
})*/
app.get('/display',function(req,res)
{


Todo.find().sort([["level","ascending"]]).
  then(profile =>{

res.render('displayfile',{
  pageTitle : 'leader',
  players : profile
});
}).
catch(err =>
{
  console.log("Error");
});
/*
Todo.find({},function(err,data){
    if(err) throw err;
    res.json({players:data});
  });*/

  });
};
