export enum HTTPMethodEnum {
  GET = 'GET',
  DELETE = 'DELETE',
  PUT = 'PUT',
  POST = 'POST',
}

export type RequestReturn<ResponseBody> = Promise<{
  status: number;
  ok: boolean;
  responseBody: { data: ResponseBody };
}>;

/**
 * Http request handler
 */
class Http {
  /**
   * Sending http request based on given parameter
   * @param {HTTPMethodEnum} method http request method enum
   * @param {string} url HTTP request url
   * @param {Record<string, never>} data http request payload
   * @returns {RequestReturn}
   */
  private async request<ResponseBody = object>(
    method: HTTPMethodEnum,
    url: string,
    data?: object
  ): Promise<RequestReturn<ResponseBody>> {
    try {
      const response = await fetch(url, {
        method,
        body: data ? JSON.stringify(data) : undefined,
      });
      const responseBody = await response.json();
      const { status, ok } = response;
      return { status, ok, responseBody };
    } catch (e) {
      console.error(e);
      return Promise.reject(
        new Error(`[HTTP request error] method: ${method}, url: ${url}`)
      );
    }
  }

  /**
   * Sending GET HTTP request based on given parameter
   * @param {string} url HTTP request url
   * @returns {RequestReturn}
   */
  public async get<ResponseBody = object>(url: string) {
    return await this.request<ResponseBody>(HTTPMethodEnum.GET, url);
  }

  /**
   * Sending POST HTTP request based on given parameter
   * @param {string} url HTTP request url
   * @param {Record<string, never>} data
   * @returns {RequestReturn}
   */
  public async post<ResponseBody = object>(url: string, data: object) {
    return await this.request<ResponseBody>(HTTPMethodEnum.POST, url, data);
  }

  /**
   * Sending PUT HTTP request based on given parameter
   * @param {string} url HTTP request url
   * @param {Record<string, never>} data
   * @returns {RequestReturn}
   */
  public async put<ResponseBody = object>(url: string, data: object) {
    return await this.request<ResponseBody>(HTTPMethodEnum.PUT, url, data);
  }

  /**
   * Sending DELETE HTTP request based on given parameter
   * @param {string} url HTTP request url
   * @param {Record<string, never>} data
   * @returns {RequestReturn}
   */
  public async delete<ResponseBody = object>(
    url: string,
    data?: Record<string, unknown>
  ) {
    return await this.request<ResponseBody>(HTTPMethodEnum.DELETE, url, data);
  }
}

export const http = new Http();
