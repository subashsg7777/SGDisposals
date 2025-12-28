import {  createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Hydrate logic: runs once when provider mounts
  useEffect(() => {
    const storedId = localStorage.getItem("user_id");
    if (storedId) {
      setUser({ user_id: storedId });
    }
  }, []);

  const login = (credentials) => {
    setUser(credentials);
    localStorage.setItem("user_id", credentials.user_id); // persist on login
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user_id"); // clear on logout
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
