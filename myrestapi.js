const express = require('express');
const app = express();


const store = require('./store'); //access data in store.jss
const bodyParser = require('body-parser'); //install middleware allow us to use post method

// const { getAllItems } = require('./store');


app.use(bodyParser.json()); //set express to access body-parser
store.init(); //add initialize value <init item> in array, uses when we send request


//-------------------------------------------
app.get('/', function(req,res){
 res.send('This is my REST API!');
});

//-------------------------------------------
app.get('/items', function(req,res){
    res.send({items: store.getAllItems()}); //เข้าไปที่ไฟล์ store.js ไปเรียกเมตอด getAllItems ให้ทำงานเพื่อแสดงผลข้อมูล ในอาเรย์ที่ชื่อว่า items ที่เราสร้างไว้อีกไฟล์นึง
   });

//-------------------------------------------

app.get('/items/:index', (req,res) => {
    var i = Number(req.params.index); //i is a parameter we receive from url when we type localhost:3000/items/3 which is an index no. in array
    if(store.getItem(i) === undefined){ //if the item we want to access/read is undefined yet
        res.status(404).end(); //send back error on reponse
        return;
        }
        const readItem = store.getItem(i);  //create a variable called putItem to call a GET function on store.js file: it will return item at index
        res.send({readItem});    //send the item we read on body representation 
   });

//-------------------------------------------

app.post('/items', (req,res) =>{
    if (typeof req.body.item !== 'string'){
        res.status(400).end();
        return;
    }

    store.addItem(req.body.item);
    res.status(201).end();
    });

    //{ "item":"item1"}  type on postman

//-------------------------------------------
app.put('/items/:index/', (req,res) =>{
    var j = Number(req.params.index);
    if(store.updateItem(j) === undefined){ //if the item we want to update doesn't exist in the array of store, send status error 404
    res.status(404).end();
    return;
    }
    const udItem = store.updateItem(j);
    res.send({udItem});
    });
//-------------------------------------------

app.delete('/items/:index', (req,res) =>{
    var i = Number(req.params.index);
    if(store.addItem(i) === undefined){ //if the item we want to delete doesn't exist in the array of store, send status error 404
    res.status(404).end();
    return;
    }

    const remItem = store.removeItem(i);
    res.send({remItem});

    });
//-------------------------------------------


//Std
app.listen(3000, function(){
    console.log("App running at port 3000");
    });
