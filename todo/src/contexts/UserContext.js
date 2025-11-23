import React, { createContext, useState, useContext } from 'react';


const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); 

  return (
  
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('오류입니다');
  }
  return context;
};