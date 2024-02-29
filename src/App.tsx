import { useState } from 'react'
import { Portal } from './components/Portal'

function App() {
  const [isPortalActive, setIsPortalActive] = useState(false);

  return (
    <>
      <div className="App">
        <h1>react-m-stepx</h1>
        <Portal open={isPortalActive}>
          <h2>Portal</h2>
          <p>test</p>
        </Portal>
        <button onClick={() => setIsPortalActive(!isPortalActive)}>open modal</button>
      </div>
    </>
  )
}

export default App
