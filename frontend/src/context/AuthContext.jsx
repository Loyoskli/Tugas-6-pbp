import { createContext, useContext, useEffect, useState } from 'react'
import {
  getMe,
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
} from '../api/api'

const AuthContext = createContext(null)

// Baca user dari localStorage sekali, aman kalau JSON-nya rusak
function readStoredUser() {
  try {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser)
  const [loading, setLoading] = useState(true)

  // Validasi token ke server saat aplikasi pertama dimuat
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }
    getMe()
      .then((res) => {
        // Defensif: backend bisa balas { data: user } atau user langsung
        const me = res.data?.data ?? res.data
        setUser(me)
        localStorage.setItem('user', JSON.stringify(me))
      })
      .catch(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const login = async (email, password) => {
    const res = await apiLogin({ email, password })
    // Defensif: modul pakai `access_token`, kode lama pakai `token`
    const token = res.data.token || res.data.access_token
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(res.data.user))
    setUser(res.data.user)
    return res.data
  }

  const register = async (name, email, password, password_confirmation) => {
    const res = await apiRegister({
      name,
      email,
      password,
      password_confirmation,
    })
    const token = res.data.token || res.data.access_token
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(res.data.user))
    setUser(res.data.user)
    return res.data
  }

  const logout = async () => {
    try {
      await apiLogout()
    } catch {
      // Gagal jaringan tetap logout lokal
    }
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth harus dipakai di dalam <AuthProvider>')
  return ctx
}