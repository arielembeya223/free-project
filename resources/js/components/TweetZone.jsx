import React from 'react';

export function TweetZone() {
  return (
    <div id="TweetZone" className="col-md-4 border-right">
      <div className="p-3">
        <h2 className="h4">Tweets</h2>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Tweet something..." aria-label="Tweet something..." aria-describedby="basic-addon2" />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button">Tweet</button>
          </div>
        </div>
        {/* Insert tweets here */}
      </div>
    </div>
  );
}

if (document.getElementById('TweetZone')) {
  const root = createRoot(document.getElementById('TweetZone'));
  root.render(
    <React.StrictMode>
      <TweetZone />
    </React.StrictMode>
  );
}
