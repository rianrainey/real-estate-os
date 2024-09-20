import { createContext, useState, ReactNode } from 'react'
import axios from 'axios'

interface AuthContextType {
  isLoggedIn: boolean
  flashMessage: string
  login: (token: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  flashMessage: '',
  login: () => { },
  logout: () => { }
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const token = localStorage.getItem('token')
    return !!token
  })

  // Will reset on refresh
  const [flashMessage, setFlashMessage] = useState<string>('')

  const login = (token: string) => {
    localStorage.setItem('token', token)
    setIsLoggedIn(true)
    setFlashMessage('Successfully logged in.')
  }

  const logout = async () => {
    console.log('Trying to logout...');
    try {
      await axios.delete('http://localhost:3000/logout', {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      localStorage.removeItem('token')
      setIsLoggedIn(false)
      setFlashMessage('Successfully logged out.')
    } catch (error: unknown) {
      localStorage.removeItem('token')
      setIsLoggedIn(false)
      if (axios.isAxiosError(error)) {
        console.log(error.message);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response);
          const responseStatus = error.response.data.status
          if (responseStatus === 401) {
            setFlashMessage('Unauthorized. Please login to continue.')
          }
        } else {
          console.log('Unknown axios error', error);
          setFlashMessage('Error logging out. Cannot continue.')
        }
      } else {
        console.log('Error while trying to logout', error);
        setFlashMessage('Unknown error')
      }
    }

  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, flashMessage, login, logout }}>
      {flashMessage && (
        <div className="flash-message">
          {flashMessage}
        </div>
      )}
      {children}
    </AuthContext.Provider>
  )
}