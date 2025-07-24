const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const pool = require("./db");

dotenv.config();
const PORT = process.env.PORT || 3000; 

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json({ msg: "home page" });
});

app.get("/todos", async (req, res) => {
    try {
        const todos = await pool.query("SELECT * FROM todo_table");
        res.json({ todos: todos.rows, msg: "todos page" });
    } catch (error) {
        res.status(500).json(error);
    }
});

app.post("/todos", async (req, res) => {
    try {
        const { desc, completed } = req.body;
        console.log(desc, completed);
        const newTodo = await pool.query(
            "INSERT INTO todo_table (todo_desc, todo_completed) VALUES ($1, $2) RETURNING *",
            [desc, completed]
        );
        res.json({ newTodo: newTodo.rows[0], msg: "todo added", success: true });
    } catch (error) {
        res.status(500).json(error);
    }
});
app.get("/todos/:id", async(req, res)=>{
    try{
        const {id} =req.params
        const todo =await pool.query("SELECT * FROM todo_table WHERE todo_id =$1",[id] );
        res.json(todo.rows);
    }catch (error){
        res.json(error)
    }
})
app.put("/todos/:id", async(req, res)=>{
    try{
        const{id} =req.params
        const{desc, completed} =req.body
        const todo = await pool.query("UPDATE todo_table SET todo_desc = $1, todo_completed =$2 WHERE todo_id =$3",[desc, completed,id]);
        res.json({ msg: "todo updated", success: true });
    }catch (error){
        res.json(error)
    }
})
app.delete("/todos/:id", async(req, res)=>{
    try{
        const{id}=req.params
        const delTodo =await pool.query("DELETE FROM todo_table WHERE todo_id = $1",[id]);
        res.json({msg: "todo deleted",success: true})
    }catch (error){
        res.json(error)
    }
})
app.delete("/todos", async(req, res)=>{
    try{
        const delALLTodos =await pool.query("DELETE FROM todo_table")
        res.json({msg: "alltodo deleted",success:true})
    }catch (error){
        res.json(error)
    }
})
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
