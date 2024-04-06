import React from 'react';

export function DiscussionZone() {
  return (
    <div id="DiscussionZone" className="col-md-4 border-right">
      <div className="p-3">
        <h2 className="h4">Discussions</h2>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Search repositories" aria-label="Search repositories" aria-describedby="basic-addon2" />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button">Search</button>
          </div>
        </div>
        {/* Insert discussion content here */}
      </div>
    </div>
  );
}

if (document.getElementById('DiscussionZone')) {
  const root = createRoot(document.getElementById('DiscussionZone'));
  root.render(
    <React.StrictMode>
      <DiscussionZone />
    </React.StrictMode>
  );
}
