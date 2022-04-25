import { useState } from 'react';
import { CounterPage, CompilerPage } from './pages';
import styles from './App.module.scss';

function App() {
  const [toggle, setToggle] = useState(true);

  const handleOnCLick = () => {
    setToggle((s) => !s);
  };

  return (
    <div className={styles['App']}>
      <header className={styles['App-header']}>
        <button onClick={handleOnCLick}>Change page</button>
      </header>
      <main className={styles['main']}>
        {toggle ? <CompilerPage /> : <CounterPage />}
      </main>
      <footer className={styles['footer']}>Footer</footer>
    </div>
  );
}

export default App;
