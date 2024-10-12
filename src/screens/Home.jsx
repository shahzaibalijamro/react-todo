import { useEffect, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../config/firebase/firebaseconfig";
function Home() {
  useEffect(()=>{
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user.email);
        const userRef = collection(db, "todos");
        const q = query(userRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setSetTodos(doc.data())
        });
      } else {
        console.log("User is signed out.");
      }
    })
  },[])
  const [setTodos, setSetTodos] = useState([])
  
  const [todo, setTodo] = useState([]);
  const input = useRef();
  async function addTodo(event) {
    event.preventDefault();
    todo.push(input.current.value);
    setTodo([...todo]);
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        title: input.current.value,
        uid: auth.currentUser.uid
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    console.log(todo);
    input.current.value = "";
  }
  function editTodo(index) {
    const edit = prompt("Enter the edit", todo[index]);
    todo[index] = edit;
    setTodo([...todo]);
  }
  function deleteTodo(index) {
    todo.splice(index, 1);
    setTodo([...todo]);
  }
  return (
    <>
      <div className="mycontainer">
        <h1 className="font-semibold text-center mt-20 text-3xl">Todo App</h1>
        <div className="mt-10">
          <form onSubmit={addTodo} className="flex justify-center items-center">
            <input type="text" placeholder="Type here" className="input w-full input-bordered w-full" ref={input} />
            <button className="btn ml-3 btn-neutral">Add Todo</button>
          </form>
        </div>
        <div className="mt-10">
          {todo.map((item, index) => {
            return <div key={index} className="flex my-5 justify-between items-center">
              <h1 className="font-semibold text-center text-2xl">{item}</h1>
              <div className="flex items-center">
                <i onClick={() => editTodo(index)} className="fa-solid text-lg cursor-pointer ml-3 fa-pen-to-square"></i>
                <i onClick={() => deleteTodo(index)} className="fa-solid text-lg cursor-pointer ml-5 fa-trash"></i>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default Home;