const LoginForm = ({
  username,
  password,
  onChangeUsername,
  onChangePassword,
  handleSubmit
}) => {
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
            onChange={onChangeUsername}
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
            onChange={onChangePassword}
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
