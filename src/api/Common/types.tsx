export interface ConstructorProps {
    baseURL: string;
    commonHeaders: object;
    timeout: number;
  }

export interface PostPutMethodProps {
    url: string;
    data: object;
    fullResponse: boolean;
    others: object | undefined;
  }