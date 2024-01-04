import autoBind from "auto-bind";
import ApiBase from "./Abstractions/ApiBase";
import { ConstructorProps, PostPutMethodProps } from "./Common/types";


export default class ApiMethods extends ApiBase {
    constructor(props: ConstructorProps){
        super(props);
        autoBind(this)
    }
    async singUp(data: object) {
        const passingData: PostPutMethodProps = {
            url: "/auth/register",
            data,
            fullResponse: false,
            others: undefined
        }
        const resultData = await this.post(passingData);
        return resultData;
      }
    
}