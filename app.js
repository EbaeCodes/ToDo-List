const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const date = require(__dirname + "/date.js");

// Replace the uri string with your connection string.
mongoose.connect("mongodb://localhost:27017/todoListDB");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


const itemsSchema = new mongoose.Schema({
   name : String,
});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome on Board",
});
const item2 = new Item({
    name: "Hit the + to add new items",
 });
const item3 = new Item({
    name: "Hit <---- to delete items",
});

var defaultItem = [item1,item2,item3];

const listSchema = new mongoose.Schema({
    name : String,
    items: [itemsSchema]
 });
 
 const List = mongoose.model("List", listSchema);


app.get("/", async(request,response)=>{
   // let day = date.getDate();
    const itemsRecieved = await Item.find({});
    if(itemsRecieved.length===0){
       Item.create(defaultItem).then(()=> console.log("Successfully inserted"));
       response.redirect("/");
    }
    else{
        response.render("list",{listTitle:"Today", newItem:itemsRecieved});   
    }
});
//adding new elements to the database and storin it
app.post("/", async(request,response)=>{
    const itemName = request.body.newItem;
    const listName = request.body.list;

    const receivedItem = new Item({
        name: itemName,
    });
    receivedItem.save();

    if(listName === "Today"){
        receivedItem.save();
        response.redirect("/");
    }else{
        const foundList = await List.findOne({name:listName});
        foundList.items.push(receivedItem);
        foundList.save();
        response.redirect("/"+listName);
    }
});

// delete done tasks
app.post("/delete", async(request,response)=>{
    const checkedItem = request.body.checkbox;
    await Item.findByIdAndRemove({_id:checkedItem});
    response.redirect("/");
    console.log("Item successfully deleted");
});


//customized routing
app.get("/:customRouteName", async(request,response)=>{
    const customRoute = request.params.customRouteName
    const foundCollection = await Item.findOne({name:customRoute});
  
    if(foundCollection === null){  
        const list = new List({
            name: customRoute,
            items: defaultItem
        });
        list.save();
        response.redirect("/"+customRoute)
    }else{
        response.render("list",{listTitle: customRoute, newItem:defaultItem});
        console.log("customRoute");
       
    } 
});


app.post("/work", function(request,response){
    request.params.paraName
});

app.listen(4000, function(){
    console.log("Server has started on port 4000");
});
