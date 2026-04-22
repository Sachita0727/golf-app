"use client"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Admin() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    const { data } = await supabase.from("profiles").select("*")
    setUsers(data || [])
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Panel</h1>

      {users.map(u => (
        <div key={u.id}>
          {u.email} - {u.plan}
        </div>
      ))}
    </div>
  )
}