import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './blogList/App.jsx'
import store from '../part7/blogList/store.js'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
