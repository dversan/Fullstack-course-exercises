const CreateBlogForm = ({
  title,
  author,
  url,
  onChangeTitle,
  onChangeAuthor,
  onChangeUrl
}) => {
  return (
    <>
      <div style={{ marginBottom: '5px' }}>
        {'title'}
        <input
          type={'text'}
          value={title}
          name={'title'}
          onChange={onChangeTitle}
          required
        />
      </div>
      <div style={{ marginBottom: '5px' }}>
        {'author'}
        <input
          type={'text'}
          value={author}
          name={'author'}
          onChange={onChangeAuthor}
          required
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        {'url'}
        <input
          type={'text'}
          value={url}
          name={'url'}
          onChange={onChangeUrl}
          required
        />
      </div>
      <button type={'submit'} style={{ marginBottom: '10px' }}>
        {'create blog'}
      </button>
    </>
  )
}

export default CreateBlogForm
