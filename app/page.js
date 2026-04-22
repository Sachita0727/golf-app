"use client"

export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "#0f172a",
      color: "#fff"
    }}>
      
      <h1>🌍 Play. Win. Give Back</h1>

      <p style={{ margin: "20px 0" }}>
        Track your golf scores, win rewards & support charities
      </p>

      <button 
        onClick={() => window.location.href="/login"}
        style={{
          padding: "10px 20px",
          background: "#3b82f6",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Get Started
      </button>

    </div>
  )
}
