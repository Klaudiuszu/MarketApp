"use client";

import React, { createContext, useContext, useMemo } from "react";

interface CompanyColorsContextType {
  getCompanyColor: (company: string) => string;
}

const CompanyColorsContext = createContext<
  CompanyColorsContextType | undefined
>(undefined);

const hashString = (str: string) => {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
  }
  return Math.abs(hash);
};

export const CompanyColorsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const getCompanyColor = (company: string) => {
    const hash = hashString(company.trim().toLowerCase());

    const hue = hash % 360;
    const saturation = 65;
    const lightness = 55;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const value = useMemo(() => ({ getCompanyColor }), []);

  return (
    <CompanyColorsContext.Provider value={value}>
      {children}
    </CompanyColorsContext.Provider>
  );
};

export const useCompanyColors = () => {
  const ctx = useContext(CompanyColorsContext);
  if (!ctx) {
    throw new Error(
      "useCompanyColors must be used within CompanyColorsProvider",
    );
  }
  return ctx;
};
