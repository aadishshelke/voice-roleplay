import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// ... existing imports ...

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      {/* ... existing routes ... */}
    </Router>
  );
}

export default App; 