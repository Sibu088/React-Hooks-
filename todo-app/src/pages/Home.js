// src/pages/Home.js
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const Home = () => {
  const [user] = useAuthState(auth);
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "todos"), where("uid", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, [user]);

  const addTodo = async () => {
    if (text.trim()) {
      await addDoc(collection(db, "todos"), {
        uid: user.uid,
        text,
        createdAt: new Date(),
      });
      setText("");
    }
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 20 }}>
      {/* <h2>Welcome, {user?.email}</h2>If user exists, it returns user.email

If user is undefined or null, it returns undefined without breaking the app */}
      <div style={{ marginBottom: 20 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New todo"
          style={{ padding: 8, width: "70%", marginRight: 8 }}
        />
        <button onClick={addTodo} style={{ padding: "8px 12px" }}>
          Add
        </button>
        <button
          onClick={() => signOut(auth)}
          style={{
            padding: "8px 12px",
            marginLeft: 12,
            backgroundColor: "#e74c3c",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>#</th>
            <th style={thStyle}>Todo</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.length === 0 ? (
            <tr>
              <td colSpan="3" style={tdStyle}>
                No todos yet.
              </td>
            </tr>
          ) : (
            todos.map((todo, index) => (
              <tr key={todo.id}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{todo.text}</td>
                <td style={tdStyle}>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    style={deleteBtnStyle}
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = {
  borderBottom: "2px solid #ddd",
  padding: "12px 8px",
};

const tdStyle = {
  borderBottom: "1px solid #eee",
  padding: "10px 8px",
};

const deleteBtnStyle = {
  backgroundColor: "#e74c3c",
  border: "none",
  color: "#fff",
  padding: "6px 10px",
  cursor: "pointer",
  borderRadius: 4,
};

export default Home;
