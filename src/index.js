import React from 'react'
import { createRoot } from 'react-dom/client';

const App = () => {
  return <div>I am app</div>;
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
