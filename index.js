const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const { request } = require("http")
const mongoose = require("mongoose")
const Todo = require("./models/todo")
 


const port = 3000
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const dburl = "mongodb+srv://ps133937:lmzavBuill2NxP93@cluster0.ntijrig.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })

app.get("/", (request, response) => {
    Todo.find()
        .then(result => {
            response.render("index", { data: result })
            console.log(result)
        })
})
app.post("/", (request, response) => {
    const todo = new Todo({
        todo: request.body.todoValue
    })
    todo.save()
        .then(result => {
            response.redirect("/")
        })
})
app.delete("/:id", (request, response) => {
    Todo.findByIdAndDelete(request.params.id)
        .then(result => {
            console.log(result);
            response.send("Todo deleted successfully");
        })
        .catch(error => {
            console.error("Error deleting todo:", error);
            response.status(500).send("Error deleting todo");
        });
});
 

app.listen(port, () => {
    console.log("server is running fast  " + port)
}) 