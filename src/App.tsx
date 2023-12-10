import { Routes, BrowserRouter } from 'react-router-dom'
import { useMount } from '@wa-dev/hooks'
import './routes'
import { renderRoute } from './routes'
import StoreProvider from './store'

function App() {
  useMount(() => {
    console.log('wa--hooks- mount')
  })

  return (
    <>
      <BrowserRouter>
        <StoreProvider>
          <Routes>{renderRoute()}</Routes>
        </StoreProvider>
      </BrowserRouter>
    </>
  )
}

export default App
