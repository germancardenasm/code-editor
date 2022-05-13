import { useState } from 'react';
import { CounterPage, CompilerPage } from './pages';
import './App.css';

function App() {
  const [toggle, setToggle] = useState(true);

  const handleOnCLick = () => {
    setToggle((s) => !s);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <button onClick={handleOnCLick}>Change page</button>
      </header>
      <main className='main'>
        {toggle ? <CompilerPage /> : <CounterPage />}
      </main>
      <footer className='footer'>Footer</footer>
    </div>
  );
}

export default App;
