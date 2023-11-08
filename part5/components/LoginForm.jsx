const LoginForm = ({
  username,
  password,
  onChangeUsername,
  onChangePassword
}) => {
  return (
    <div>
      <h2>{'Log in to application'}</h2>
      <div style={{ marginBottom: '10px' }}>
        {'username'}
        <input
          style={{ marginLeft: '5px' }}
          type={'text'}
          value={username}
          name={'Username'}
          onChange={onChangeUsername}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        {'password'}
        <input
          style={{ marginLeft: '5px' }}
          type={'password'}
          value={password}
          name={'Password'}
          onChange={onChangePassword}
        />
      </div>
      <button type='submit'>{'login'}</button>
    </div>
  )
}

export default LoginForm
