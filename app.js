const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express()
app.set('view engine', 'ejs');
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/Basic', { useNewUrlParser: true, useUnifiedTopology: true });

const schema = mongoose.Schema({ name: String });
const model = mongoose.model("Item", schema);

app.get('/', (req, res) => {

    model.find({},(err,items)=>{
        if(err){
            console.log("Error");
        }
        res.render("list", { listTitle: "Today", list: items });
    });

});

app.post('/', (req, res) => {

    let item = req.body.newItem;
    
    const i=new model({
        name:item
    });

        i.save();
        res.redirect('/');

});

app.post('/delete',(req,res)=>{
    let id=req.body.checkbox;

    model.findByIdAndDelete(id,(err)=>{
        if(err){
            console.log("Error");
        }

        res.redirect("/");
    })
})

app.listen(80, () => {
    console.log("Server Started at port 80");
});