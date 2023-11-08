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
      <div>
        {'title'}
        <input
          type={'text'}
          value={title}
          name={'title'}
          onChange={onChangeTitle}
        />
      </div>
      <div>
        {'author'}
        <input
          type={'text'}
          value={author}
          name={'author'}
          onChange={onChangeAuthor}
        />
      </div>
      <div>
        {'url'}
        <input type={'text'} value={url} name={'url'} onChange={onChangeUrl} />
      </div>
      <button type='submit'>{'create blog'}</button>
    </>
  )
}

export default CreateBlogForm
