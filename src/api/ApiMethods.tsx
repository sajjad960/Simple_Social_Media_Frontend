import autoBind from "auto-bind";
import ApiBase from "./Abstractions/ApiBase";
import {
  CommentsParams,
  ConstructorProps,
  GetDeleteMethodProps,
  PostFormData,
  PostPutMethodProps,
  ReactionParams,
  ReplyParams,
  SignInParams,
  SignInResponse,
  SignUpParams,
  SignUpResponse,
} from "./Common/types";
import { PostFilterTypes } from "../views/home/components/Posts/Posts";

interface ApiMethodsPros {
  signUp: (data: SignUpParams) => Promise<SignUpResponse>;
  signIn: (data: SignInParams) => Promise<SignInResponse>;
}

export default class ApiMethods extends ApiBase implements ApiMethodsPros {
  constructor(props: ConstructorProps) {
    super(props);
    autoBind(this);
  }
  async signUp(data: SignUpParams) {
    const passingData: PostPutMethodProps = {
      url: "/users/signup",
      data,
      fullResponse: false,
      others: undefined,
    };
    const resultData = await this.post(passingData);
    return resultData;
  }
  async signIn(data: SignInParams) {
    const passingData: PostPutMethodProps = {
      url: "/users/login",
      data,
      fullResponse: false,
      others: undefined,
    };
    const resultData = await this.post(passingData);
    return resultData;
  }
  async userProfile() {
    const passingData: GetDeleteMethodProps = {
      url: "/users/me",
      params: {},
      fullResponse: false,
      others: undefined,
    };

    const resultData = await this.get(passingData);
    return resultData;
  }
  async createPost(data: PostFormData) {
    const formData = new FormData();

    // Append upload data
    formData.append("text", data?.text);
    data.images.forEach((image) => {
      formData.append("images", image);
    });

    const passingData: PostPutMethodProps = {
      url: "/posts",
      data: formData,
      fullResponse: false,
      others: undefined,
    };
    const resultData = await this.post(passingData);
    return resultData;
  }
  async getPosts(filters: PostFilterTypes) {
    const passingData: GetDeleteMethodProps = {
      url: "/posts",
      params: filters,
      fullResponse: false,
      others: undefined,
    };
    const resultData = await this.get(passingData);
    return resultData;
  }

  async getComments(postId: number) {
    const passingData: GetDeleteMethodProps = {
      url: `/comments/${postId}`,
      params: {},
      fullResponse: false,
      others: undefined,
    };
    const resultData = await this.get(passingData);
    return resultData;
  }
  async createComments(data: CommentsParams) {
    const passingData: PostPutMethodProps = {
      url: "/comments",
      data,
      fullResponse: false,
      others: undefined,
    };
    const resultData = await this.post(passingData);
    return resultData;
  }
  async getReplies(commentId: number) {
    const passingData: GetDeleteMethodProps = {
      url: `/reply/${commentId}`,
      params: {},
      fullResponse: false,
      others: undefined,
    };
    const resultData = await this.get(passingData);
    return resultData;
  }
  async createReply(data: ReplyParams) {
    const passingData: PostPutMethodProps = {
      url: "/reply",
      data,
      fullResponse: false,
      others: undefined,
    };
    const resultData = await this.post(passingData);
    return resultData;
  }
  async createIncrementReact(data: ReactionParams) {
    const passingData: PostPutMethodProps = {
      url: "/counter",
      data,
      fullResponse: false,
      others: undefined,
    };
    const resultData = await this.post(passingData);
    return resultData;
  }
}
