"use client";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

import { Provider } from "react-redux";
import store from "@/store/store";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <html lang='ru'>{children}</html>
    </Provider>
  );
}
