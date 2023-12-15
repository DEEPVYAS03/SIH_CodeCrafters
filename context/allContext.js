
import React,{ useContext,createContext,useState } from 'react';


const PhoneContext = createContext();

// Create a PhoneProvider component to wrap your application with
export const PhoneProvider = ({ children }) => {
  const [phone, setPhone] = useState('');

  return (
    <PhoneContext.Provider value={{ phone, setPhone }}>
      {children}
    </PhoneContext.Provider>
  );
};


// Create a custom hook to use the phone context
export const usePhone = () => {
  const context = useContext(PhoneContext);
  if (!context) {
    throw new Error('usePhone must be used within a PhoneProvider');
  }
  return context;
};