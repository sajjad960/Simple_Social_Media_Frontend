export interface ConstructorProps {
  baseURL: string;
  formData: boolean;
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
// Post Types
export interface PostFormData {
  text: string;
  images: File[];
}

export type ReactionTypes = {
  like: number | null,
  love: number | null,
  haha: number | null,
  sad: number | null,
  angry: number | null
}

export type PostTypes = {
  id: number;
  text: string;
  images: string;
  restricted: boolean,
  user_id: number;
  postReactions: ReactionTypes,
  created_at: string;
  updated_at: string;
};

// Comment Types
export type CommentsParams = {
  text: string,
  post_id: number
}

// Reply Types
export type ReplyParams = {
  text: string,
  comment_id: number
}