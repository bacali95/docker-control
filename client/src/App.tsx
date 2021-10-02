import classNames from 'classnames';
import { observer } from 'mobx-react';
import React from 'react';
import { rootStore } from './core/stores/RootStore';
import PublicLayout from './pages/public/PublicLayout';
import ToastContainer from './pages/shared/ToastContainer';
import TooltipContainer from './pages/shared/tooltip/TooltipContainer';

export const App: React.FC = observer(() => {
  const {
    appLocalCache: { darkMode },
  } = rootStore;

  return (
    <div className={classNames({ dark: darkMode })}>
      <PublicLayout />
      <ToastContainer />
      <TooltipContainer />
    </div>
  );
});

export default App;
