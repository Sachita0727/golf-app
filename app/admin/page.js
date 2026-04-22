"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Admin() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")

    setUsers(data || [])
  }

  // 📊 Subscription Stats
  const totalUsers = users.length
  const monthly = users.filter(u => u.plan === "Monthly").length
  const yearly = users.filter(u => u.plan === "Yearly").length

  // ❤️ Charity Stats
  const education = users.filter(u => u.charity === "Education Fund").length
  const health = users.filter(u => u.charity === "Health Support").length
  const env = users.filter(u => u.charity === "Environment").length

  // 🎨 Styles
  const card = {
    background: "#1e293b",
    padding: "15px",
    borderRadius: "10px",
    marginTop: "15px",
    color: "#fff"
  }

  return (
    <div style={{
      padding: "30px",
      background: "#0f172a",
      minHeight: "100vh",
      color: "#fff"
    }}>

      <h1 style={{ textAlign: "center" }}>
        👑 Admin Panel
      </h1>

      {/* 📊 Subscription */}
      <div style={card}>
        <h3>📊 Subscription Stats</h3>
        <p>Total Users: {totalUsers}</p>
        <p>Monthly: {monthly}</p>
        <p>Yearly: {yearly}</p>
      </div>

      {/* ❤️ Charity */}
      <div style={card}>
        <h3>❤️ Charity Stats</h3>
        <p>Education Fund: {education}</p>
        <p>Health Support: {health}</p>
        <p>Environment: {env}</p>
      </div>

      {/* 👥 Users */}
      <div style={card}>
        <h3>👥 All Users</h3>

        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          users.map(user => (
            <div key={user.id} style={{
              background: "#334155",
              padding: "10px",
              borderRadius: "8px",
              marginTop: "10px"
            }}>
              <p><b>Email:</b> {user.email}</p>
              <p><b>Plan:</b> {user.plan}</p>
              <p><b>Charity:</b> {user.charity}</p>
            </div>
          ))
        )}
      </div>

    </div>
  )
}
