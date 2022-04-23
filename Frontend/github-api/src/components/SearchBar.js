import React, { useState } from "react";

export default function SearchBar({ setResults }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const resetState = () => {
    setIsRateLimited(false);
    setIsLoading(false);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const handleSubmit = async (event) => {
    // Prevent the default action of submitting the form
    event.preventDefault();
    // We must reset old state and set the loading state to true to indicate that we are loading
    resetState();
    setIsLoading(true);

    // If the search query is empty, we don't need to do anything
    if (!searchQuery) {
      return;
    }

    // Make a request to the GitHub API
    try {
      const response = await fetch(`https://api.github.com/search/users?q=${searchQuery}`);
      const data = await response.json();
      // Update the state with the results
      setResults(data.items);
    } catch (error) {
      // When we get a rate limited error, we set the state to indicate that we are rate limited
      error.status === 403 ?? setIsRateLimited(true);
    }

    // Reset the loading state
    setIsLoading(false);
  };

  // Make the request on enter key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <div className="is-flex is-flex-direction-row">
      <div className="field">
        <p className="control has-icons-left has-icons-right">
          <input
            className={`input ${isRateLimited && "is-danger"}`}
            type="text"
            placeholder="Enter a username..."
            value={searchQuery}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
        </p>
        {isRateLimited && <p class="help is-danger">API Rate is limited, please try again...</p>}
      </div>
      <div
        className={`button is-info ${isLoading && "is-loading"} ${isRateLimited && "is-danger"}`}
        onClick={handleSubmit}>
        <span className="icon">
          <i className="fas fa-search"></i>
        </span>
      </div>
    </div>
  );
}
