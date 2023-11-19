import { RequestMethods } from "@/types/RequestMethods";

const requests = () => {
  return {
    get: async (url: string, method: RequestMethods = RequestMethods.Get) => {
      try {
        const result = await fetch(url, {
          method: method,
        });

        return result;
      } catch (error) {
        console.error(`Error ${method} by url ${url}.\n${error}`);
      }
    },

    post: async (url: string, body: object) => {
      try {
        const result = await fetch(url, {
          method: RequestMethods.Post,
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        return result;
      } catch (error) {
        console.error(`Error ${RequestMethods.Post} by url ${url}.\n${error}`);
      }
    },

    put: async (url: string, body: object, method: RequestMethods = RequestMethods.Put) => {
      try {
        const result = await fetch(url, {
          method: method,
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });

        return result;
      } catch (error) {
        console.error(`Error ${method} by url ${url}.\n${error}`);
      }
    },

    delete: async (url: string, body: object, method: RequestMethods = RequestMethods.Delete) => {
      try {
        const result = await fetch(url, {
          method: method,
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });

        return result;
      } catch (error) {
        console.error(`Error ${method} by url ${url}.\n${error}`);
      }
    },

    patch: async (url: string, body: object, method: RequestMethods = RequestMethods.Patch) => {
      try {
        const result = await fetch(url, {
          method: method,
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });

        return result;
      } catch (error) {
        console.error(`Error ${method} by url ${url}.\n${error}`);
      }
    },
  }
}

export default requests();