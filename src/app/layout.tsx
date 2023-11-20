"use client";

import { Provider } from "react-redux";
import store2 from "@/store/store";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store2}>
      <html lang='ru'>{children}</html>
    </Provider>
  );
}
