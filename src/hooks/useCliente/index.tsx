import React, { createContext, useState } from "react";

export const initClienteValue = {};

export const ClienteContext = createContext(initClienteValue);

export type ClienteProviderProps = {
  children: React.ReactNode;
};

export const ClienteProvider = ({ children }: ClienteProviderProps) => {
  const [cliente, setCliente] = useState(initClienteValue);

  return (
    <ClienteContext.Provider
      value={{
        cliente,
        setCliente: setCliente,
      }}
    >
      {children}
    </ClienteContext.Provider>
  );
};
