export const initialCode = `
import React from 'react';
import {createRoot} from 'react-dom/client';

const root = createRoot(document.getElementById('root'));

const App = ()=> <h1>Hi there!</h1>;
root.render(<App />);
`;

