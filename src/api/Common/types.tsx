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
export interface GetDeleteMethodProps {
  url: string;
  params: object;
  fullResponse: boolean;
  others: object | undefined;
}

// Sign Up Types
export type UserDataTypes ={
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}
export type SignUpResponse = {
  token: React.SetStateAction<null>;
  status: string;
  user: UserDataTypes
};

export type SignUpParams = {
  name: FormDataEntryValue | null;
  userName: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
};

// Sign In Types
export type SignInParams = {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
};

export type SignInResponse = {
  token: React.SetStateAction<null>;
  status: string;
  user: UserDataTypes

};