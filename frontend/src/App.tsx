import { FormEvent, useState } from 'react'
import './App.css'
import axios from 'axios'

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
  const payload = {
    user: {
      email: 'test1@acme.com',
      password: '123456'
    }
  }

  try {
    // axios.post will return a promise
    // of type: Promise<AxiosReponse<LoginResponse, any>>
    const response = await axios.post<LoginReponse>(url, payload)
    localStorage.setItem('token', response.headers.authorization)
  } catch (error) {
    console.error('Error loggin in', error);

  }
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Real Estate OS</h1>
      <div className="card">
        {/* // This works by the button html element taking an onClick function that is defined inline.
        // It is calling the useState setCount method defined above that sets the count variable.
        // It takes the current count as a parameter and returns it + 1.
        // When count is re-rendered, it will show the new value */}
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type='email' placeholder='elon@tesla.com' required />
          <label>Password</label>
          <input type='password' required />
          <button type='submit'>Login</button>
        </form>
      </div>
    </>
  )
}

export default App
