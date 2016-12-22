import { Network } from 'ionic-native';


export class NetworkService {

  public static isNetWorkOn(): boolean{
    return Network.connection !== 'none';
  }

}
