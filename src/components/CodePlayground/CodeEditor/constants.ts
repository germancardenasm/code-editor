export const initialCode = `// React code goes here

import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => <h1>Hello</h1>;

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="home" />);
`;
