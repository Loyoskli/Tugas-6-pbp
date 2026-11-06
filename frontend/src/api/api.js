import client from './client'

// ===== AUTH =====
export const login    = (data) => client.post('/auth/login', data)
export const register = (data) => client.post('/auth/register', data)
export const getMe    = ()     => client.get('/auth/me')
export const logout   = ()     => client.post('/auth/logout')
export const refresh  = ()     => client.post('/auth/refresh')

// ===== DASHBOARD =====
export const getDashboard = () => client.get('/dashboard')

// ===== BOOKS =====
export const getBooks   = (params)   => client.get('/books', { params })
export const getBook    = (id)       => client.get(`/books/${id}`)
export const addBook    = (data)     => client.post('/books', data)
export const updateBook = (id, data) => client.put(`/books/${id}`, data)
export const deleteBook = (id)       => client.delete(`/books/${id}`)

// ===== MEMBERS =====
export const getMembers   = (params)   => client.get('/members', { params })
export const getMember    = (id)       => client.get(`/members/${id}`)
export const addMember    = (data)     => client.post('/members', data)
export const updateMember = (id, data) => client.put(`/members/${id}`, data)
export const deleteMember = (id)       => client.delete(`/members/${id}`)