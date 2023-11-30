import { IKitchen } from "@/types/IKitchen";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Сервис для клиентских get запросов
// ISR Next
export class UserKitchenService {

  // Получение всех кухонь на главной с ревалидацией
  static async getMainKitchens (): Promise<IKitchen[]> {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/kitchens-main`, {
      method: 'GET',
      next: {
        revalidate: 30,
      },
    });
    const jsonKitchens: IKitchen[] = await response.json();
    
    const returnKitchens: IKitchen[] = [...jsonKitchens];

    const kitchensWithPhotos: IKitchen[] = returnKitchens.map((kitchen) => {
      const kitchenPhotos = kitchen.photos.map((file) => {
        return `${NEXT_PUBLIC_API_URL}/images/${file}`;
      });

      kitchen.photos = kitchenPhotos;
      return kitchen;
    })

    return kitchensWithPhotos;
  };

  static async getKitchens (): Promise<IKitchen[]> {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/kitchens`, {
      method: 'GET',
      next: {
        revalidate: 10,
      },
    });

    const jsonKitchens: IKitchen[] = await response.json();

    const returnKitchens = [...jsonKitchens];
    const kitchensWithPhotos: IKitchen[] = returnKitchens.map((kitchen) => {
      const kitchenPhotos = kitchen.photos.map((file) => {
        return `${NEXT_PUBLIC_API_URL}/images/${file}`;
      });
      
      kitchen.photos = kitchenPhotos;
      return kitchen;
    })

    return kitchensWithPhotos;
  };
}