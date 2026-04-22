"use client"
import { useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      alert(error.message)
    } else {
      window.location.href = "/dashboard"
    }
  }

  return (
    <div style={{
      padding: 30,
      maxWidth: 400,
      margin: "auto",
      background: "#0f172a",
      color: "#fff",
      borderRadius: "10px",
      marginTop: "100px"
    }}>
      <h2 style={{ textAlign: "center" }}>Login</h2>

      <input
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "8px",
          border: "none"
        }}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "8px",
          border: "none"
        }}
      />

      <button
        onClick={login}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "none",
          background: "#3b82f6",
          color: "#fff",
          cursor: "pointer"
        }}
      >
        Login
      </button>
    </div>
  )
}
