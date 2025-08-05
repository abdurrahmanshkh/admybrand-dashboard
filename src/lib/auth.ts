import { User } from '@/types'

// Mock user data
const MOCK_USER: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@admybrand.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  role: 'admin'
}

// Mock authentication functions
export const authService = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simple validation - accept any email/password for demo
    if (email && password) {
      const token = 'mock-jwt-token-' + Date.now()
      return { user: MOCK_USER, token }
    }
    
    throw new Error('Invalid credentials')
  },

  logout: async (): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    // Clear token from storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth-token')
    }
  },

  getCurrentUser: async (): Promise<User | null> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Check if token exists
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth-token')
      if (token) {
        return MOCK_USER
      }
    }
    
    return null
  },

  refreshToken: async (): Promise<string> => {
    // Simulate token refresh
    await new Promise(resolve => setTimeout(resolve, 500))
    const newToken = 'refreshed-mock-jwt-token-' + Date.now()
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth-token', newToken)
    }
    
    return newToken
  }
}
