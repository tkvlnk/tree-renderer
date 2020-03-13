import React from 'react';

import data from './data.json';
import Tree from './components/Tree';

function App() {
  return (
    <div className="App">
      <Tree data={data} />
    </div>
  );
}

export default App;
