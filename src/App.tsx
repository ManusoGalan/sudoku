import React from 'react';
import Sudoku from './components/Sudoku';

function App() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Sudoku dimension={3} />
    </div>
  );
}

export default App;
