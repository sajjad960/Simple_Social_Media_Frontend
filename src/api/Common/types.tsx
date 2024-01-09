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

type SignUpUser = {
  id: number,
  name: string
}

export type SignUpResponse = {
  user: SignUpUser;
  token: React.SetStateAction<null>;
  status: string;
};

export type SignUpParams = {
  name: FormDataEntryValue | null;
  userName: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
};
