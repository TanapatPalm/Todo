import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

function App() {
  const [inputTodo, setInputTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editTodoDesc, setEditTodoDesc] = useState("");
  const [editTodoId, setEditTodoId] = useState(0);
  const [editTodoChecked, setEditTodoChecked] = useState(false);

  useEffect(() => {
   const resp= axios.get("/todos").then((resp) => {
      setTodos(resp.data.todos);
    });
  }, []);

  async function addTodo(e) {
    const data = {
      desc: inputTodo,
      completed: false,
    };
    try {
      const resp = await axios.post("/todos",data);
      if (resp.data.success) {
        setTodos((prevTodos) => [...prevTodos, resp.data.newTodo]);
        setInputTodo("");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    } 
  }

 async function editTodo(todo) {
  console.log(editMode);
  
  setEditTodoDesc(todo.todo_desc);
  setEditTodoId(todo.todo_id);
  setEditTodoChecked(todo.todo_completed);
  setEditMode(true);
}
 async function updateTodo(e) {
    const data = {
      desc: editTodoDesc,
      completed: editTodoChecked,
    };
    const resp = await axios.put(`/todos/${editTodoId}`, data);
    setEditMode(false);
    console.log(resp);
  }


  

  async function deleteTodo(todo) {
  try {
    const resp = await axios.delete(`/todos/${todo.todo_id}`);
    if (resp.data.success) {
      setTodos((prevTodos) =>
        prevTodos.filter((t) => t.todo_id !== todo.todo_id)
      );
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
}


  async function clearAllTodos() {
    try {
      await axios.delete("/todos");
      setTodos([]);
    } catch (error) {
      console.error("Error clearing todos:", error);
    }
  }


  
  if (editMode) {
  return (
    <div>
      <form
        onSubmit={updateTodo}
        className="flex flex-col items-center gap-8 pt-8 pb-24 bg-gray-100 h-screen"
      >
          <div className="text-3xl font-extrabold ">แก้ไขข้อมูล </div>
          <div className="flex gap-5 pl-16">
            <label className="text-xl font-bold">คำอธิบาย   :</label>
            <input
             className="text-{15} rounded-lg shadow-md "
              type="text"
              placeholder="ป้อนข้อมูล"
              value={editTodoDesc}
              onChange={(e) => setEditTodoDesc(e.target.value)}
            />
          </div>
          <div  className="flex gap-4 pr-37">
            <label className="text-xl font-bold ">เสร็จสิ้น:</label>
            <input
              type="checkbox"
              checked={editTodoChecked}
              onChange={(e) => setEditTodoChecked(e.target.checked)}
            />
          </div>
         <div className="flex gap-4">
    <button
   
    className="bg-green-600 hover:bg-green-500 text-white py-1 px-4 rounded-md"
  >
    เสร็จสิ้น
  </button>
  <button
    type="button"
    onClick={() => {
      setEditMode(false);
      setEditTodoDesc("");
      setEditTodoChecked(false);
      setEditTodoId(0);
    }}
    className="bg-red-500 hover:bg-red-400 text-white py-1 px-4 rounded-md"
  >
    ยกเลิก
  </button>
</div>

      </form>
    </div>
  );
}


  return (
    <div className="flex flex-col items-center gap-8  pt-16 pb-40 bg-gray-100 h-screen " >
      <div className="text-3xl   font-extrabold">รายการที่ต้องทำ </div>
      <div className="flex gap-2">
        <input
          className="text-2xl rounded-lg shadow-md text-center "
          type="text"
          placeholder="ป้อนข้อมูล"
          value={inputTodo}
          onChange={(e) => setInputTodo(e.target.value)}
        />
        <button
          onClick={addTodo}
          className="text-sm bg-green-600 hover:bg-green-500 text-white py-1 px-2 rounded-xl text-xl"
        >
          เพิ่ม
        </button>
        <button
          onClick={clearAllTodos}
          className="text-lg bg-red-500 hover:bg-red-400 text-white py-1 px-2 rounded-xl text-xl"
        >
          ลบทั้งหมด
        </button>
      </div>
      {todos.length >= 1 && (
        <div className="flex flex-col gap-2 border bg-white  rounded-lg p-2 w-5/6">
          {todos.map((todo, index) => (
            <div
              className="flex items-center justify-between bg-blue-500 rounded-md p-2 text-white"
              key={index}
            >
              <div className="pl-1 flex gap-2 items-center">
                <input type="checkbox" checked={todo.todo_completed} readOnly />
                <div className="text-lg">{todo.todo_desc}</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => editTodo(todo)}
                  className="bg-green-600 hover:bg-green-500 text-white py-1 px-2 rounded-md"
                >
                  แก้ใข
                </button>
                <button
                  onClick={() => deleteTodo( todo)}
                  className="bg-red-600 hover:bg-red-500 text-white py-1 px-2 rounded-md"
                >
                  ลบ
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
