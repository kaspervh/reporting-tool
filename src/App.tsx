import React, {useState} from 'react';
import SearchTable from './components/SearchTable';
import './App.css';

function App() {
  const [currentContent, setCurrentContent] = useState('approve');

  return (
    <div className="App">
     <div className="content-container">
      <div className="tableMenu">
          <select onChange={(e:any) => setCurrentContent(e.target.value)}>
            <option value="approve">Godkend</option>
            <option value="account">Konter</option>
            <option value="release">Frigiv</option>
            <option value="all">Alle bilag</option>
            <option value="scan">Scannede bilag</option>
          </select>
        </div>
       <SearchTable/>
       {currentContent === 'scan' ?
        <div className="data-container">
          <h1>diller</h1>
        </div>
        : '' 
      }
     </div>
     <div className="pdf-container"></div>
    </div>
  );
}

export default App;
