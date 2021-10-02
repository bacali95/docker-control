import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DarkModeSwitcher } from '../shared/DarkModeSwitcher';
import NavBar from '../shared/NavBar';

type Tabs = '' | 'problems' | 'login';

const PublicNavbar: React.FC = observer(() => {
  const [currentTab, setCurrentTab] = useState(location.pathname.replace(/\/?/g, ''));
  const history = useHistory();

  const onLinkClick = (tab: Tabs) => {
    setCurrentTab(tab);
    history.push(`/${tab}`);
  };

  return (
    <NavBar
      logo={
        <div className="text-white text-lg cursor-pointer" onClick={() => onLinkClick('')}>
          Docker Control
        </div>
      }
      rightItems={[
        {
          content: 'Login',
          active: currentTab === 'login',
          onClick: () => onLinkClick('login'),
        },
        { content: <DarkModeSwitcher /> },
      ]}
    />
  );
});

export default PublicNavbar;
