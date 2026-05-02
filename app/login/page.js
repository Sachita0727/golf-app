"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [plan, setPlan] = useState("Monthly")
  const [charity, setCharity] = useState("Education Fund")
  const [isSignup, setIsSignup] = useState(false)
  const [loading, setLoading] = useState(false)

  const signup = async () => {
    setLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      alert(error.message)
      setLoading(false)
      return
    }

    const user = data.user
    if (!user) {
      alert("Signup failed")
      setLoading(false)
      return
    }

    await supabase.from("profiles").insert({
      id: user.id,
      email,
      plan,
      charity
    })

    alert("Signup successful! Now login")
    setIsSignup(false)
    setLoading(false)
  }

  const login = async () => {
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      alert(error.message)
      setLoading(false)
    } else {
      window.location.href = "/dashboard"
    }
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
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
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
          onMouseOver={(e)=>e.target.style.transform="scale(1.05)"}
          onMouseOut={(e)=>e.target.style.transform="scale(1)"}
        >
          {loading ? "Please wait..." : isSignup ? "Signup" : "Login"}
        </button>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          {isSignup ? "Already have account?" : "New user?"}
        </p>

        <button
          onClick={() => setIsSignup(!isSignup)}
          style={{ ...btn, background: "#10b981" }}
        >
          {isSignup ? "Go to Login" : "Create Account"}
        </button>

      </div>
    </div>
  )
}

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
  cursor: "pointer",
  transition: "all 0.3s ease"
}
