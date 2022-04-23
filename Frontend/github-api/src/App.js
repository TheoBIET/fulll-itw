import React, { useState, useEffect } from "react";
import Results from './components/Results';
import SearchBar from './components/SearchBar';

export default function App() {
  const [results, setResults] = useState([]);
  const [isResultsEmpty, setResultsIsEmpty] = useState(false);

  // When results update, check if they are empty to display a message
  useEffect(() => {
    setResultsIsEmpty(!results.length);
  }, [results]);

  return (
    <div className="App">
      <main className="is-flex is-flex-direction-column is-align-items-center">
        <h1 className="title">React Level 2 - Fulll</h1>
        <SearchBar setResults={setResults} />
        {isResultsEmpty && <span>The search did not yield any results</span>}
        { !!results.length && <Results results={results} /> }
      </main>
    </div>
  );
}
