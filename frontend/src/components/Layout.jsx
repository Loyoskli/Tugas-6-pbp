import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: 'M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10' },
  { to: '/books', label: 'Buku', icon: 'M4 5a2 2 0 012-2h12v16H6a2 2 0 00-2 2V5zm2 14h12' },
  { to: '/members', label: 'Anggota', icon: 'M16 11a4 4 0 10-8 0m-4 9a8 8 0 0116 0' },
]

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isAdmin = user?.role === 'admin'
  const initial = user?.name?.charAt(0)?.toUpperCase() || 'U'

  const pageTitle =
    NAV.find((n) => location.pathname.startsWith(n.to))?.label || 'Dashboard'

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen lg:flex">
      {/* Backdrop mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-uksw-950/60 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col overflow-y-auto bg-uksw-900 text-white shadow-xl transition-transform lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-1 bg-gold-400" />
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-400 text-sm font-extrabold tracking-tight text-uksw-950">
            FTI
          </div>
          <div className="leading-tight">
            <p className="text-base font-extrabold">Perpustakaan</p>
            <p className="text-xs text-gold-300">FTI · UKSW</p>
          </div>
        </div>

        <p className="px-5 pb-1 pt-5 text-[11px] font-semibold uppercase tracking-widest text-uksw-300">
          Menu
        </p>
        <nav className="flex-1 space-y-1 px-3">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-uksw-200 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={n.icon} />
              </svg>
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="m-3 rounded-xl bg-white/5 p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-400 text-sm font-extrabold text-uksw-950">
              {initial}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{user?.name}</p>
              <p className="text-xs text-uksw-300">{isAdmin ? 'Admin' : 'User'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-3 w-full border-t border-white/10 pt-3 text-left text-sm text-uksw-200 hover:text-white"
          >
            Keluar
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-10">
            <div className="flex min-w-0 items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-lg p-2 text-uksw-800 hover:bg-uksw-50 lg:hidden"
                aria-label="Buka menu"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="min-w-0">
                <p className="hidden text-xs font-semibold uppercase tracking-widest text-gold-600 sm:block">
                  FTI UKSW · Sistem Informasi Perpustakaan
                </p>
                <h1 className="truncate text-xl font-bold tracking-tight text-uksw-900">
                  {pageTitle}
                </h1>
              </div>
            </div>
            <span
              className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${
                isAdmin
                  ? 'bg-gold-100 text-gold-700 ring-gold-300'
                  : 'bg-slate-100 text-slate-600 ring-slate-200'
              }`}
            >
              {isAdmin ? 'Admin: akses penuh' : 'User: hanya lihat'}
            </span>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10">
          <Outlet />
        </main>

        <footer className="border-t border-slate-200 bg-white px-4 py-4 text-center text-xs text-slate-500 sm:px-6 lg:px-10">
          © {new Date().getFullYear()} Fakultas Teknologi Informasi · Universitas Kristen Satya Wacana
        </footer>
      </div>
    </div>
  )
}
