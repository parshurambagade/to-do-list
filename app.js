const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");
// const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// mongoose.connect("mongodb://localhost:27017/toDoListDB");

// const itemsSchema = {
//   name: String
// };                                            

// const Item = mongoose.model("Item",itemsSchema);

// const item1 = new Item({
//   name: "Welcome to the ToDo List!"
// });

// const item2 = new Item({
//   name: "Click + to add new items!"
// });

// const item3 = new Item({
//   name: "<-- Hit this to delete the item!"
// });

// const defaultItems = [item1, item2, item3];

// Item.insertMany(defaultItems, (err)=>{
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successfully pushed items in the list");
//   }
// });

const workItems = [];
const defaultItems = ["Welcome to the ToDo List!", "Click + to add new items!", "<-- Hit this to delete the item!"];

app.get("/",(req,res)=>{
  let day = date.getDay(); 
  res.render('list',{listTitle: day, newListItems: defaultItems});
});

app.post("/",(req,res)=>{
  let item = req.body.newItem;
  if(req.body.list==="Work"){
    workItems.push(item);
    res.redirect('/work');
  }else{
    defaultItems.push(item)
    res.redirect('/');
  }
});

app.get('/work',(req,res)=>{
  res.render('list',{listTitle: "Work Items", newListItems: workItems});
});

app.listen(3000, ()=>console.log("server is running on the port 3000"));