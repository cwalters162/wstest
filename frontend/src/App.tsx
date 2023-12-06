import {useCallback, useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useWebSocket, {Command} from "./hooks/useWebsocket.ts";

function App() {
  const [count, setCount] = useState(0);
    const handleMessage = useCallback((event: MessageEvent) => {
        let data = JSON.parse(event.data);
        switch (data.command) {
            case Command.UPDATE_COUNT: {
                console.log("Updating count.")
                setCount(data.payload);
                break;
            }
        }
    }, []);
  const { connect, sendMessage, close } = useWebSocket(handleMessage)

    useEffect(() => {
        connect("localhost:8080");
        return () => {
            close()
        }
    }, []);


    function handleOnClick() {
        sendMessage(Command.INCREMENT_COUNT, "");
    }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleOnClick}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
