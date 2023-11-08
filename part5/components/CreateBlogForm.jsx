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
      <h2>{'create new'}</h2>
      <div style={{ marginBottom: '5px' }}>
        {'title'}
        <input
          type={'text'}
          value={title}
          name={'title'}
          onChange={onChangeTitle}
        />
      </div>
      <div style={{ marginBottom: '5px' }}>
        {'author'}
        <input
          type={'text'}
          value={author}
          name={'author'}
          onChange={onChangeAuthor}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        {'url'}
        <input type={'text'} value={url} name={'url'} onChange={onChangeUrl} />
      </div>
      <button type={'submit'} style={{ marginBottom: '10px' }}>
        {'create blog'}
      </button>
    </>
  )
}

export default CreateBlogForm
