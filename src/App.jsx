import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup'


const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
      setIsLogin(!isLogin);
  };

  return (
      <div>
          {isLogin ? (
              <Login onSwitch={toggleForm} />
          ) : (
              <Signup onSwitch={toggleForm} />
          )}
      </div>
  );
};

export default App
