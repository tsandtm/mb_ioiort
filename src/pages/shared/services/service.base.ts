import { ToastController, LoadingController } from 'ionic-angular';

export abstract class ServiceBase {

  constructor(private _toast?: ToastController, private _loadingCtrl?: LoadingController) {

  }

  public handleError(error: Error): Promise<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Promise.reject(error.message || error);

  }

  /**
   * hiện thông báo nhỏ
   */
  public ShowToastOK = (mess: string,
    option: { position?: string, duration?: number } = {}) => {
    let position = option.position || 'bottom';
    let duration = option.duration || 2000;
    let toast = this._toast.create({
      position: position,
      duration: duration,
      message: mess
    })
    toast.present()
  }

  /**
   * dismissOnPageChange: true
   */
  public ShowLoading = (mess: string) => {
    let load = this._loadingCtrl.create({
      content: mess,
      dismissOnPageChange: true
    });
    load.present();
  }
}