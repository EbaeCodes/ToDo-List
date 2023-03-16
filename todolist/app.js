const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const date = require(__dirname + "/date.js");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
var inputs = ["Buy Groceires","Buy food","Eat Food"];
var workItems =[];


app.get("/", function(request,response){
    let day = date.getDate();
    response.render("list",{listTitle:day, newItem: inputs});

});

app.get("/work", function(request,response){
    response.render("list",{listTitle:"work List", newItem: workItems})
});

app.post("/work", function(request,response){
    var workItem = request.body.newItem;
     workItems.push(workItem);
    response.redirect("/work");
   
});

app.post("/", function(request,response){
    var input = request.body.newItem;
    if(request.body.list === "work"){
        workItems.push(input);
        response.redirect("/work");
    }else{
        inputs.push(input);
        response.redirect("/");
    }

   
});

app.listen(3000, function(){
    console.log("Server has started on port 3000");
});
