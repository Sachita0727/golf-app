"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [plan, setPlan] = useState("Monthly")
  const [charity, setCharity] = useState("Education Fund")
  const [isSignup, setIsSignup] = useState(false)

  // SIGNUP
  const signup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) return alert(error.message)

    const user = data.user
    if (!user) return alert("Signup failed")

    await supabase.from("profiles").insert({
      id: user.id,
      email:email,
      plan:plan,
      charity:charity,
    })

    alert("Signup successful! Now login")
    setIsSignup(false)
  }

  // LOGIN
  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) alert(error.message)
    else window.location.href = "/dashboard"
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#0f172a",
      color: "#fff"
    }}>

      <div style={{
        width: "350px",
        padding: "20px",
        background: "#1e293b",
        borderRadius: "12px"
      }}>

        <h2 style={{ textAlign: "center" }}>
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>

        <input
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
          style={input}
        />

        {/* SIGNUP EXTRA */}
        {isSignup && (
          <>
            <select onChange={(e)=>setPlan(e.target.value)} style={input}>
              <option>Monthly</option>
              <option>Yearly</option>
            </select>

            <select onChange={(e)=>setCharity(e.target.value)} style={input}>
              <option>Education Fund</option>
              <option>Health Support</option>
              <option>Environment</option>
            </select>
          </>
        )}

        <button
          onClick={isSignup ? signup : login}
          style={btn}
        >
          {isSignup ? "Signup" : "Login"}
        </button>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          {isSignup ? "Already have account?" : "New user?"}
        </p>

        <button
          onClick={() => setIsSignup(!isSignup)}
          style={{
            ...btn,
            background: "#10b981"
          }}
        >
          {isSignup ? "Go to Login" : "Create Account"}
        </button>

      </div>
    </div>
  )
}

// styles
const input = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "none"
}

const btn = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "8px",
  border: "none",
  background: "#3b82f6",
  color: "#fff",
  cursor: "pointer"
            }
