import { useState } from "react"
import "./styles.css"

export default function App(){
    const [newItem,setNewItem]=useState("");
    const [todos,setTodos] =useState([]);

    const handleSubmit=(e)=>{
      e.preventDefault();
      setTodos((currentTodos)=>{
        return [...currentTodos,{id:crypto.randomUUID(),title:newItem,completed:false}]
      })
      setNewItem('')
    }

    const deleteHandler=(id)=>{
      const newTodos=[...todos];
      const updatedTodos=newTodos.filter((newTodo)=>{
        return newTodo.id!==id;
      });

      setTodos(updatedTodos);

    }
    
    const toggleTodos=(id,completed)=>{
        setTodos((currentTodos)=>{
           return currentTodos.map((todo)=>{
               if(todo.id=== id){
                return {...todo,completed}
               }
               return todo
           }) 
        })
    }

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item"> New Item</label>
          <input type="text" value={newItem} id="item"  onChange={(e)=>setNewItem(e.target.value)}/>
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header">To Do List</h1>
      <ul className="list">
       
          {todos ? todos.map((todo)=>{
             return  <li key={todo.id}> 
             <label>
               <input type="checkbox" checked={todo.completed}  onChange={e=>toggleTodos(todo.id,e.target.checked)}/>
               {todo.title}
             </label>
             <button className="btn btn-danger" onClick={()=>deleteHandler(todo.id)}> Delete</button>
           </li>

          }): "No Data Available"}
         
       
      </ul>
    </>
  )
}