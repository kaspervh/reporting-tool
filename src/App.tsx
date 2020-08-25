import React, {useMemo} from 'react';
import SearchTable from './components/SearchTable';
import './App.css';

function App() {
  return (
    <div className="App">
     <div className="content-container">
       <SearchTable/>
     </div>
     <div className="pdf-container"></div>
    </div>
  );
}

export default App;
