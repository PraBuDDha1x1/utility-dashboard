// src/context/DashboardContext.jsx
import React, { createContext, useState } from "react";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [prefillData, setPrefillData] = useState(null);

  return (
    <DashboardContext.Provider value={{ prefillData, setPrefillData }}>
      {children}
    </DashboardContext.Provider>
  );
};
