import React from "react";

export default function Results({ results }) {
  return (
    <div className="Results">
      <h2 className="title is-5">Search results - {results.length}</h2>
      <div className="columns is-multiline">
        {results.map((result) => (
          <li
            key={result.id}
            className="column is-one-quarter-desktop is-half-tablet">
            <div className="card">
              <a
                href={result.html_url}
                target="_blank"
                rel="noopener noreferrer">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src={result.avatar_url}
                      alt={`${result.login} Profile Avatar`}
                    />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4">{result.login}</p>
                      <p className="subtitle is-6">{result.html_url}</p>
                    </div>
                  </div>
                  <div className="content">{result.description}</div>
                </div>
              </a>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}
