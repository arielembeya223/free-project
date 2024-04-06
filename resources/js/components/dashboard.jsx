import React from 'react';
import { createRoot } from 'react-dom';
import { DiscussionZone } from './DiscussionZone';
import { HeaderDashboard } from './HeaderDashboard';
import { TweetZone } from './TweetZone';
import { SettingsDashboardZone } from './SettingsDashboardZone';

function Dashboard() {
  return (
    <div id="Dashboard">
      <HeaderDashboard />
      <div className="mt-4">
        <div className="row">
          <DiscussionZone className="col-md-2" />
          <TweetZone className="col-md-6" />
          <SettingsDashboardZone className="col-md-3" />
        </div>
      </div>
    </div>
  );
}

if (document.getElementById('Dashboard')) {
  const root = createRoot(document.getElementById('Dashboard'));
  root.render(
    <React.StrictMode>
      <Dashboard />
    </React.StrictMode>
  );
}

export default Dashboard;
