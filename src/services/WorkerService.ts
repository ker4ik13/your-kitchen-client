import $api from "@/http";
import type { IWorker } from "@/types/IWorker";
import type { AxiosResponse } from "axios";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export class WorkerService {

  static async getWorkers (): Promise<IWorker[]> {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/workers`, {
      method: 'GET',
      next: {
        revalidate: 30,
      },
    });
    const jsonWorkers: IWorker[] = await response.json();
    
    const returnWorkers: IWorker[] = [...jsonWorkers];

    const workerWithPhotos: IWorker[] = returnWorkers.map((worker) => {
      worker.photo = `${NEXT_PUBLIC_API_URL}/images/${worker.photo}`
      return worker;
    });

    return workerWithPhotos;
  };

   static async getWorker (id: string): Promise<IWorker> {
    const response = await $api.get<IWorker>(`/workers/${id}`);

    const returnWorker = {...response.data};
    returnWorker.photo = `${NEXT_PUBLIC_API_URL}/images/${returnWorker.photo}`

    return returnWorker;
  }

  static async addWorker (body: object): Promise<AxiosResponse<IWorker>> {
    return await $api.post<IWorker>(`/workers`, body);
  }

  static async deleteWorker (id: string): Promise<AxiosResponse<IWorker>> {
    return await $api.delete<IWorker>(`/workers/${id}`);
  }

  static async updateWorker (id: string, body: object): Promise<AxiosResponse<IWorker>> {
    return await $api.patch<IWorker>(`/workers/${id}`, body);
  }
}