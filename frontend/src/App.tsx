import React from 'react';

import AppProvider from './hooks';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <SignIn />
      </AppProvider>

      <GlobalStyle />
    </>
  );
};

export default App;
