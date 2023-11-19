import type { ReactNode } from "react";

type TIcon = {
  icon: ReactNode;
};

const Icon = ({ icon }: TIcon) => {
  return icon;
};

export default Icon;
