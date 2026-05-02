"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Admin() {
  const [users, setUsers] = useState([])
  const [scores, setScores] = useState([])
  const [draws, setDraws] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const { data: usersData } = await supabase.from("profiles").select("*")
    const { data: scoresData } = await supabase.from("scores").select("*")
    const { data: drawsData } = await supabase.from("draws").select("*")

    setUsers(usersData || [])
    setScores(scoresData || [])
    setDraws(drawsData || [])
  }

  const card = {
    background: "#1e293b",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "15px"
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "#fff",
      padding: "30px"
    }}>
      <div style={{ maxWidth: "900px", margin: "auto" }}>

        <h1 style={{ textAlign: "center" }}>🛠️ Admin Dashboard</h1>

        {/* STATS */}
        <div style={card}>
          <h3>📊 Stats</h3>
          <p>Total Users: {users.length}</p>
          <p>Total Scores: {scores.length}</p>
          <p>Total Draws: {draws.length}</p>
        </div>

        {/* USERS */}
        <div style={card}>
          <h3>👥 Users</h3>
          {users.map(u => (
            <p key={u.id}>
              {u.email} | {u.plan} | {u.charity}
            </p>
          ))}
        </div>

        {/* SCORES */}
        <div style={card}>
          <h3>⛳ Scores</h3>
          {scores.map(s => (
            <p key={s.id}>
              {s.user_id} → {s.score}
            </p>
          ))}
        </div>

        {/* DRAWS */}
        <div style={card}>
          <h3>🎲 Draws</h3>
          {draws.map(d => (
            <p key={d.id}>
              {d.numbers?.join(", ")}
            </p>
          ))}
        </div>

      </div>
    </div>
  )
}
