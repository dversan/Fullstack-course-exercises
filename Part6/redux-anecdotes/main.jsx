import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { configureStore } from '@reduxjs/toolkit'
import anecdotesReducer from './reducers/anecdoteReducer.js'
import filterReducer from './reducers/filterReducer.js'

const store = configureStore({
  reducer: { anecdotes: anecdotesReducer, filter: filterReducer }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
