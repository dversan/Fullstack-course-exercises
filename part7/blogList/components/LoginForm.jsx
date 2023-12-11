import { useDispatch } from 'react-redux'
import { setUserData } from '../reducers/userReducer.js'
import { useState } from 'react'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(setUserData(username, password))
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          {'username'}
          <input
            id={'username'}
            style={{ marginLeft: '5px' }}
            type={'text'}
            value={username}
            name={'Username'}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          {'password'}
          <input
            id={'password'}
            style={{ marginLeft: '5px' }}
            type={'password'}
            value={password}
            name={'Password'}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button style={{ marginBottom: '5px' }} type='submit'>
          {'login'}
        </button>
      </form>
    </>
  )
}

export default LoginForm
