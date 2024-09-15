import React, { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";
import { SearchResultsList } from "./SearchResultsList";
import "bulma/css/bulma.min.css";

function SearchComponent() {
    const [results, setResults] = useState([]);

    return (
        <div className="App">
            <div className="search-bar-container">
                <SearchBar setResults={setResults} />
                {results && results.length > 0 && <SearchResultsList results={results} />}
            </div>
        </div>
    );
}

export default SearchComponent;