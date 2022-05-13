export const initialCode = `// React code goes here \n
import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => <div>Hello!</div>
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
`;
