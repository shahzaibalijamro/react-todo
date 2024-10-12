import { useRef } from "react";
import { useState } from "react";
function Home() {
  const [todo,setTodo] = useState([]);
  const input = useRef();
  function addTodo(event) {
    event.preventDefault();
    todo.push(input.current.value);
    setTodo([...todo]);
    console.log(todo);
    input.current.value = "";
  }
  function editTodo(index) {
    const edit = prompt("Enter the edit", todo[index]);
    todo[index] = edit;
    setTodo([...todo]);
  }
  function deleteTodo(index) {
    todo.splice(index,1);
    setTodo([...todo]);
  }
  // const avatar = () => {
  //   fetch('https://ui-avatars.com/api/?name=John+Doe')
  //   .then(res => res.json())
  //   .then(res => {
  //     console.log(res);
      
  //   })
  // }
  // avatar()
  
  return (
    <>
    <div className="mycontainer">
      <h1 className="font-semibold text-center mt-20 text-3xl">Todo App</h1>
      <div className="mt-10">
        <form onSubmit={addTodo} className="flex justify-center items-center">
          <input type="text" placeholder="Type here" className="input w-full input-bordered w-full" ref={input}/>
          <button className="btn ml-3 btn-neutral">Add Todo</button>
        </form>
      </div>
      <div className="mt-10">
        {todo.map((item,index)=>{
          return <div key={index} className="flex my-5 justify-between items-center">
            <h1 className="font-semibold text-center text-2xl">{item}</h1>
            <div className="flex items-center">
            <i onClick={()=> editTodo(index)} className="fa-solid text-lg cursor-pointer ml-3 fa-pen-to-square"></i>
            <i onClick={()=> deleteTodo(index)} className="fa-solid text-lg cursor-pointer ml-5 fa-trash"></i>
            </div>
          </div>
        })}
      </div>
    </div>
    </>
  )
}

export default Home;