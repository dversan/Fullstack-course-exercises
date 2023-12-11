import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/index.js'

const CreateAnecdoteForm = (props) => {
  const contentField = useField('text')
  const authorField = useField('text')
  const infoField = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: contentField.value,
      author: authorField.value,
      info: infoField.value,
      votes: 0
    })
    navigate('/')
  }

  const resetFields = () => {
    contentField.onReset()
    authorField.onReset()
    infoField.onReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name='content'
            value={contentField.value}
            onChange={(e) => contentField.onChange(e.target.value)}
          />
        </div>
        <div>
          author
          <input
            name='author'
            value={authorField.value}
            onChange={(e) => authorField.onChange(e.target.value)}
          />
        </div>
        <div>
          url for more info
          <input
            name='info'
            value={infoField.value}
            onChange={(e) => infoField.onChange(e.target.value)}
          />
        </div>
        <button>create</button>
      </form>
      <button style={{ marginTop: 5 }} onClick={resetFields}>
        reset
      </button>
    </div>
  )
}

export default CreateAnecdoteForm
