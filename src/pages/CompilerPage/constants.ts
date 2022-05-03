export const initialCode = `
import React from 'react';
import {createRoot} from 'react-dom/client';

const root = createRoot(document.getElementById('root'));

const App = ()=> <h1>Hi there!</h1>;
root.render(<App />);
`;

export const iframeInitHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
    <div id="root"></div>
    <script> 
      window.addEventListener(
        'message',
        (event) => {
          try {
            eval(event.data);
          } catch (e) {
            console.error(e);
          }
        },
        false
      );
    </script> 
  </body> 
</html>
`;
