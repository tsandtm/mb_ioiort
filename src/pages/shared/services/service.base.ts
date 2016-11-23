export abstract class ServiceBase {

/**
 * giải quyết lỗi
 */
  public handleError(error: Error): Promise<any> {
    console.error(error);
    return Promise.reject(error.message || error);
  }
}
