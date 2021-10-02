import { observer } from 'mobx-react';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PublicNavbar from './PublicNavbar';
import HomeView from './views/HomeView';

const PublicLayout: React.FC = observer(() => {
  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <PublicNavbar />
      <div className="h-full">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomeView} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
});

export default PublicLayout;
