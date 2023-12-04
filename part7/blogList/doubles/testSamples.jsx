export const sampleBlog = {
  id: 'sampleBlogId123',
  title: 'testing blog',
  author: 'Tester',
  url: 'https://www.sample.com',
  likes: 5,
  user: { id: '654a564cac747f6b8d11dc1b' }
}

export const sampleUser = {
  id: '654a564cac747f6b8d11dc1b',
  name: 'sampleName',
  username: 'sampleUserName'
}

export const sampleInitialFormValues = { title: '', author: '', url: '' }

export const sampleNewBlog = {
  title: 'sampleNewBlog',
  author: 'DVS',
  url: 'https://www.sampleNewBlog.com'
}

export const sampleGetBlogsResponse = [
  {
    id: '0likesSampleBlogId123',
    title: 'Blog with less likes',
    author: 'Tester',
    url: 'https://www.sample.com',
    likes: 0,
    user: { id: 'sampleId123' }
  },
  {
    id: '5likesSampleBlogId123',
    title: 'Blog with more likes',
    author: 'Tester',
    url: 'https://www.sample.com',
    likes: 5,
    user: { id: 'sampleId123' }
  },
  {
    id: '2likesSampleBlogId123',
    title: 'Blog with 2 likes',
    author: 'Tester',
    url: 'https://www.sample.com',
    likes: 2,
    user: { id: 'sampleId123' }
  }
]
