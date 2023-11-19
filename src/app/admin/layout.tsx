"use client";

import Store from "@/store/store";
import { createContext } from "react";
import "../styles";
import AdminSidebar from "@/widgets/AdminSidebar/AdminSidebar";
import { observer } from "mobx-react-lite";

interface IStore {
  store: Store;
}

const store = new Store();

export const Context = createContext<IStore>({
  store,
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Context.Provider value={{ store }}>
      <head>
        <title>Админ панель | Твоя Кухня</title>
      </head>
      <body>
        <>
          {!store.isLoading && store.isAuth && <AdminSidebar store={store} />}
          {children}
        </>
      </body>
    </Context.Provider>
  );
};

export default observer(RootLayout);
