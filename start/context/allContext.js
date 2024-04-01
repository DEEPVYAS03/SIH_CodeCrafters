
import React,{ useContext,createContext,useState } from 'react';


const PhoneContext = createContext();
const IdContext = createContext();
const LocationContext = createContext();
// Create a PhoneProvider component to wrap your application with
export const PhoneProvider = ({ children }) => {
  const [phone, setPhone] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');

  return (
    <PhoneContext.Provider value={{ phone, setPhone , fname,setFname ,lname,setLname,email,setEmail}}>
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



export const IdProvider = ({ children }) => {
  const [userId, setUserId] = useState('');

  return (
    <IdContext.Provider value={{ userId, setUserId }}>
      {children}
    </IdContext.Provider>
  );
};

// Create a custom hook to use the ID context
export const useId = () => {
  const context = useContext(IdContext);
  if (!context) {
    throw new Error('useId must be used within an IdProvider');
  }
  return context;
};


export const LocationProvider = ({ children }) => { 
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [village, setVillage] = useState('');

  return (
    <LocationContext.Provider value={{ state, setState,district, setDistrict,village, setVillage }}>
      {children}
    </LocationContext.Provider>
  );
}


// Create a custom hook to use the ID context
export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within an LocationProvider');
  }
  return context;
};

