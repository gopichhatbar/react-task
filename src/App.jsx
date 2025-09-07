import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserList from './Components/UserList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center my-4">User Management</h1>
          <UserList />
    </div>
    </>
  )
}

export default App
