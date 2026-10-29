import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(email, password)
      toast.success('Login berhasil!')
      navigate('/dashboard')
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        (err.response?.data?.errors?.email?.[0]) ||
        'Login gagal.'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      {/* Branding panel */}
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-uksw-950 via-uksw-900 to-uksw-700 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold-400/15" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full border-[40px] border-white/5" />

        <div className="relative flex items-center gap-3">
          <div className="grid h-14 w-14 place-items-center rounded-xl bg-gold-400 text-sm font-extrabold text-uksw-950">
            FTI
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-gold-300">
              Fakultas Teknologi Informasi
            </p>
            <p className="text-lg font-extrabold tracking-tight">
              Universitas Kristen Satya Wacana
            </p>
          </div>
        </div>

        <div className="relative">
          <span className="inline-block h-1 w-14 rounded bg-gold-400" />
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight">
            Sistem Informasi
            <br />
            Perpustakaan
          </h1>
          <p className="mt-4 max-w-md text-uksw-200">
            Kelola koleksi buku dan data anggota perpustakaan.
          </p>
        </div>

        <p className="relative text-xs text-uksw-300">
          © {new Date().getFullYear()} FTI · Universitas Kristen Satya Wacana
        </p>
      </aside>

      {/* Form */}
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-10">
        <div className="w-full max-w-md">
          <div className="mb-6 flex items-center gap-3 lg:hidden">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gold-400 text-sm font-extrabold text-uksw-950">
              FTI
            </div>
            <div className="leading-tight">
              <p className="text-base font-extrabold text-uksw-900">Perpustakaan FTI</p>
              <p className="text-xs text-slate-500">Universitas Kristen Satya Wacana</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold tracking-tight text-uksw-900">
                Masuk
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Gunakan akun perpustakaan kamu untuk melanjutkan.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-uksw-600 focus:outline-none focus:ring-2 focus:ring-uksw-600/20"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Kata sandi
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-uksw-600 focus:outline-none focus:ring-2 focus:ring-uksw-600/20"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-uksw-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-uksw-800 disabled:opacity-50"
              >
                {loading ? 'Memproses…' : 'Masuk'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Belum punya akun?{' '}
              <Link
                to="/register"
                className="font-semibold text-uksw-700 hover:underline"
              >
                Daftar
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
