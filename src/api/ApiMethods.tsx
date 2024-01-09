import autoBind from "auto-bind";
import ApiBase from "./Abstractions/ApiBase";
import { ConstructorProps, PostPutMethodProps, SignUpParams, SignUpResponse } from "./Common/types";


interface ApiMethodsPros {
  signUp: (data: SignUpParams) => Promise<SignUpResponse>;
}

export default class ApiMethods extends ApiBase implements ApiMethodsPros {
  constructor(props: ConstructorProps) {
    super(props);
    autoBind(this);
  }
  async signUp(data: object) {
    const passingData: PostPutMethodProps = {
      url: "/users/signup",
      data,
      fullResponse: false,
      others: undefined,
    };
    const resultData = await this.post(passingData);
    return resultData;
  }
}
