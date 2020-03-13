import React, { useState } from 'react';

import data from './data.json';
import Tree from './components/Tree';
import { TreeData } from './components/Tree/TreeController';

function App() {
  const [currData, setCurrData] = useState<TreeData>(data);
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      {loading && <div>Loading...</div>}
      <button
        type="button"
        onClick={async () => {
          if (loading) {
            return;
          }

          setLoading(true);

          try {
            await saveDataToFirebase(currData);
            console.log('>__DATA_SAVED:::', currData);
          } finally {
            setLoading(false);
          }
        }}
      >
        Save to FB
      </button>
      <button
        type="button"
        onClick={async () => {
          if (loading) {
            return;
          }

          setLoading(true);

          try {
            const loadedData = await loadDataFromFirebase();
            console.log('>__DATA_LOADED:::', loadedData);
          } finally {
            setLoading(false);
          }
        }}
      >
        Load from FB
      </button>

      <Tree
        data={currData}
        onDataChange={d => {
          console.log('>__DATA_UPDATED:::', d);
          setCurrData(d);
        }}
      />
    </div>
  );
}

function loadDataFromFirebase() {
  return new Promise(resolve => setTimeout(() => resolve(data), 500));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function saveDataToFirebase(dataToSAve: TreeData) {
  return new Promise(resolve => setTimeout(resolve, 500));
}

export default App;
