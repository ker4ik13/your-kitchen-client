import type { IKitchen } from "@/types/IKitchen";
import { KitchensOptions } from "@/types/KitchenOptions";

export const sortKitchens = (kitchens: IKitchen[], tag: KitchensOptions, setKitchens: (kitchens: IKitchen[]) => void) => {

  // TODO: доделать сортировку
  // Оставшиеся кухни
  const result = kitchens.filter((kitchen) => {
    kitchen.options.includes(tag);
  })
  setKitchens(result);
}