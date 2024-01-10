import autoBind from "auto-bind";
import ApiBase from "./Abstractions/ApiBase";
import { ConstructorProps, GetDeleteMethodProps, PostPutMethodProps, SignInParams, SignInResponse, SignUpParams, SignUpResponse } from "./Common/types";


interface ApiMethodsPros {
  signUp: (data: SignUpParams) => Promise<SignUpResponse>;
  signIn: (data: SignInParams) => Promise<SignInResponse>
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
    return resultData

  }
}
