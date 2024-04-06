import React from 'react';

export function SettingsDashboardZone() {
  return (
    <div id="SettingsDashboardZone" className="col-md-2">
      <div className="card">
        <div className="card-header bg-white">
          <h2 className="h5 mb-0">Settings</h2>
        </div>
        <div className="card-body">
          {/* Insert settings and dashboard here */}
        </div>
      </div>
    </div>
  );
}

if (document.getElementById('SettingsDashboardZone')) {
  const root = createRoot(document.getElementById('SettingsDashboardZone'));
  root.render(
    <React.StrictMode>
      <SettingsDashboardZone />
    </React.StrictMode>
  );
}
