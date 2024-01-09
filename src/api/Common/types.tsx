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

// Sign Up Types
export type SignUpResponse = {
  token: React.SetStateAction<null>;
  status: string;
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
};