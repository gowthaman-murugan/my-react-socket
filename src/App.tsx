 
import { FC } from 'react';
import './App.css';
import WebSocketChat from './components/WebSocketChat';

const App :FC = () => {
  return (
       <div className="App">
            <h1>WebSocket Chat</h1>
            <WebSocketChat />
        </div>
   );
}

export default App;
