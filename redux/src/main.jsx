import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import Bg from './components/Bg.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Bg />
  </Provider>,
)
