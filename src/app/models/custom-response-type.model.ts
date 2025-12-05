export class CustomResponseType<T> {
  data: any;
  dataList: T[]=[];
  isSuccess: boolean=false;
  message: string="";
  token: string="";
  needLogin: boolean=false;
  dataCount: number = 0;
  tokenExpireDateTime:string;
}
