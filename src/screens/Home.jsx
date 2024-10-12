import { useEffect, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../config/firebase/firebaseconfig";
function Home() {
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsUser(true)
        const userRef = collection(db, "todos");
        const q = query(userRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const myTodos = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        setTodo(myTodos)
      } else {
        setIsUser(false)
        console.log("User is signed out.");
      }
    })
  }, [])
  const [todo, setTodo] = useState([]);
  const input = useRef();
  async function addTodo(event) {
    event.preventDefault();
    try {
      if (isUser) {
        const docRef = await addDoc(collection(db, "todos"), {
          title: input.current.value,
          uid: auth.currentUser.uid
        });
        console.log("Document written with ID: ", docRef.id);
        todo.push({
          title: input.current.value,
          uid: auth.currentUser.uid,
          id: docRef.id
        });
        setTodo([...todo]);
      } else {
        todo.push({
          title: input.current.value
        });
        setTodo([...todo]);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    input.current.value = "";
  }
  async function editTodo(index) {
    const edit = prompt("Enter the edit", todo[index].title);
    if (isUser) {
      const updateRef = doc(db, "todos", todo[index].id);
      await updateDoc(updateRef, {
        title: edit
      });
      todo[index].title = edit;
      setTodo([...todo]);
    } else {
      todo[index].title = edit;
      setTodo([...todo]);
    }
  }
  async function deleteTodo(index) {
    if (isUser) {
      await deleteDoc(doc(db, "todos", todo[index].id));
      todo.splice(index, 1);
      setTodo([...todo]);
    } else {
      todo.splice(index, 1);
      setTodo([...todo]);
    }
  }
  return (
    <>
      <div className="mycontainer">
        <h1 className="font-semibold text-center mt-20 text-3xl">Todo App</h1>
        <div className="mt-10">
          <form onSubmit={addTodo} className="flex justify-center items-center">
            <input type="text" placeholder="Type here" className="input input-bordered w-full" ref={input} />
            <button className="btn ml-3 btn-neutral">Add Todo</button>
          </form>
        </div>
        <div className="mt-10">
          {todo.length > 0 ? todo.map((item, index) => {
            return <div key={index} className="flex my-5 justify-between items-center">
              <h1 className="font-semibold text-center text-2xl">{item.title}</h1>
              <div className="flex items-center">
                <i onClick={() => editTodo(index)} className="fa-solid text-lg cursor-pointer ml-3 fa-pen-to-square"></i>
                <i onClick={() => deleteTodo(index)} className="fa-solid text-lg cursor-pointer ml-5 fa-trash"></i>
              </div>
            </div>
          }) : <h1 className="text-center text-xl mt-20">Your added todos will appear here!</h1>}
        </div>
      </div>
    </>
  )
}

export default Home;