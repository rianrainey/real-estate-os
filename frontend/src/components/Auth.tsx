import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from "@/contexts/AuthContext"
import axios from 'axios'

export const Logout = () => {
  const { logout } = useContext(AuthContext)

  return (
    <>
      <button onClick={logout}>Logout</button>
    </>
  )
}

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext)

  interface LoginReponse {
    token: string
  }

  // FormEvent is a React Synthetic event that is of type HTMLFormElement
  // HTMLFormElement is a JS interface that represents a form element in the DOM
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // Prevent refreshing of page which is default browser behavior
    e.preventDefault();

    // axios post to url
    const port = '3000'
    const url = `http://localhost:${port}/login`

    // If no email or password, return
    if (!email || !password) {
      console.error('Email and Password are required')
      return
    }

    const payload = {
      user: {
        email: email,
        password: password
      }
    }

    try {
      // axios.post will return a promise
      // of type: Promise<AxiosReponse<LoginResponse, any>>
      const response = await axios.post<LoginReponse>(url, payload)
      login(response.headers.authorization)
    } catch (error) {
      console.error('Error loggin in', error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export const Auth = () => {
  const { isLoggedIn } = useContext(AuthContext)
  return (
    <>
      {
        isLoggedIn ? (
          <Logout />
        ) : (
          <Login />
        )
      }
    </>
  )
}