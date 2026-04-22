"use client"
import { useState, useEffect } from "react"
import { supabase } from "../../lib/supabase"

export default function Dashboard() {
  const [score, setScore] = useState("")
  const [scores, setScores] = useState([])
  const [profile, setProfile] = useState(null)
  const [result, setResult] = useState("")

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user
    if (!user) return

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()

    setProfile(profileData)

    const { data } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false })

    setScores(data || [])
  }

  const addScore = async () => {
    if (!score || score < 1 || score > 45) {
      alert("Enter valid score (1–45)")
      return
    }

    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user

    const { data } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: true })

    if (data.length >= 5) {
      await supabase.from("scores").delete().eq("id", data[0].id)
    }

    await supabase.from("scores").insert({
      user_id: user.id,
      score: Number(score),
      date: new Date()
    })

    setScore("")
    loadData()
  }

  const runDraw = async () => {
    let numbers = []

    while (numbers.length < 5) {
      let num = Math.floor(Math.random() * 45) + 1
      if (!numbers.includes(num)) numbers.push(num)
    }

    await supabase.from("draws").insert({ numbers })
    alert("Draw: " + numbers.join(", "))
  }

  const checkResult = async () => {
    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user

    const { data: drawData } = await supabase
      .from("draws")
      .select("*")
      .order("id", { ascending: false })
      .limit(1)

    if (!drawData.length) return alert("No draw")

    const drawNumbers = drawData[0].numbers

    const { data: scoreData } = await supabase
      .from("scores")
      .select("score")
      .eq("user_id", user.id)

    const matches = scoreData.filter(s =>
      drawNumbers.includes(s.score)
    )

    let message = ""
    if (matches.length === 5) message = "🏆 JACKPOT!"
    else if (matches.length === 4) message = "🎉 Great! 4 matches"
    else if (matches.length === 3) message = "👍 3 matches"
    else message = "😢 Better luck next time"

    setResult(
      "Draw: " + drawNumbers.join(", ") +
      " | Matches: " + matches.length +
      " | " + message
    )
  }

  const logout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  // 🎨 STYLES
  const card = {
    background: "linear-gradient(135deg, #1e293b, #0f172a)",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
  }

  const btn = {
    padding: "10px 15px",
    borderRadius: "8px",
    border: "none",
    background: "#3b82f6",
    color: "#fff",
    cursor: "pointer",
    transition: "all 0.3s ease"
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "#fff",
      padding: "30px"
    }}>

      <div style={{ maxWidth: "900px", margin: "auto" }}>

        <h1 style={{ textAlign: "center" }}>
          🌍 Play. Win. Give Back
        </h1>

        {/* PROFILE */}
        <div style={card}>
          <h3>👤 Profile</h3>
          <p>Plan: {profile?.plan}</p>
          <p>Charity: {profile?.charity}</p>
        </div>

        {/* SCORE */}
        <div style={card}>
          <h3>⛳ Add Score</h3>

          <input
            value={score}
            onChange={(e)=>setScore(e.target.value)}
            style={{ padding: "8px", borderRadius: "6px", marginRight: "10px" }}
          />

          <button
            style={btn}
            onClick={addScore}
            onMouseOver={(e)=>e.target.style.opacity=0.8}
            onMouseOut={(e)=>e.target.style.opacity=1}
          >
            Add
          </button>

          {scores.map(s => (
            <p key={s.id}>{s.score}</p>
          ))}
        </div>

        {/* DRAW */}
        <div style={card}>
          <button
            style={btn}
            onClick={runDraw}
            onMouseOver={(e)=>e.target.style.opacity=0.8}
            onMouseOut={(e)=>e.target.style.opacity=1}
          >
            Run Draw
          </button>

          <button
            style={{ ...btn, marginLeft: "10px" }}
            onClick={checkResult}
            onMouseOver={(e)=>e.target.style.opacity=0.8}
            onMouseOut={(e)=>e.target.style.opacity=1}
          >
            Check
          </button>

          {result && (
            <div style={{
              marginTop: "15px",
              background: result.includes("😢") ? "#ef4444" : "#22c55e",
              padding: "10px",
              borderRadius: "6px",
              transition: "all 0.3s ease"
            }}>
              {result}
            </div>
          )}
        </div>

        {/* IMPACT */}
        <div style={card}>
          <h3>❤️ Impact</h3>
          <p>{profile?.charity}</p>
        </div>

        {/* ADMIN */}
        <button
          onClick={()=>window.location.href="/admin"}
          style={{ ...btn, background: "#10b981", width: "100%" }}
        >
          Admin
        </button>

        {/* LOGOUT */}
        <button
          onClick={logout}
          style={{ ...btn, background: "#ef4444", width: "100%", marginTop: "10px" }}
        >
          Logout
        </button>

      </div>
    </div>
  )
              }
