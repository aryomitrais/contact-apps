import { vi } from 'vitest';
import { HTTPMethodEnum, http } from './http';

type DummyResponse = {
  dummyResponse: string;
};

const DUMMY_BODY_REQUEST = { dummyData: 'dummyData' };

describe('http utility', () => {
  describe('Call http request with different HTTP method', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      vi.spyOn(window, 'fetch').mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve({ dummyResponse: 'dummyResponse' }),
          status: 200,
          ok: true,
        } as Response)
      );
    });
    test('Should call http request with GET method', async () => {
      await expect(http.get<DummyResponse>('dummyUrl')).resolves.toEqual({
        status: 200,
        ok: true,
        responseBody: { dummyResponse: 'dummyResponse' },
      });
      expect(fetch).toHaveBeenCalledWith('dummyUrl', {
        method: HTTPMethodEnum.GET,
        body: undefined,
      });
    });
    test('Should call http request with POST method', async () => {
      await expect(
        http.post<DummyResponse>('dummyUrl', DUMMY_BODY_REQUEST)
      ).resolves.toEqual({
        status: 200,
        ok: true,
        responseBody: { dummyResponse: 'dummyResponse' },
      });
      expect(fetch).toHaveBeenCalledWith('dummyUrl', {
        method: HTTPMethodEnum.POST,
        body: JSON.stringify(DUMMY_BODY_REQUEST),
      });
    });
    test('Should call http request with PUT method', async () => {
      await expect(
        http.put<DummyResponse>('dummyUrl', DUMMY_BODY_REQUEST)
      ).resolves.toEqual({
        status: 200,
        ok: true,
        responseBody: { dummyResponse: 'dummyResponse' },
      });
      expect(fetch).toHaveBeenCalledWith('dummyUrl', {
        method: HTTPMethodEnum.PUT,
        body: JSON.stringify(DUMMY_BODY_REQUEST),
      });
    });
    test('Should call http request with DELETE method', async () => {
      await expect(
        http.delete<DummyResponse>('dummyUrl', DUMMY_BODY_REQUEST)
      ).resolves.toEqual({
        status: 200,
        ok: true,
        responseBody: { dummyResponse: 'dummyResponse' },
      });
      expect(fetch).toHaveBeenCalledWith('dummyUrl', {
        method: HTTPMethodEnum.DELETE,
        body: JSON.stringify(DUMMY_BODY_REQUEST),
      });
    });
  });
  describe('Throw promise reject on fetch request exception', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      vi.spyOn(window, 'fetch').mockRejectedValue(new Error('Fetch Error'));
    });
    test('Should call http request with GET method', async () => {
      await expect(http.get<DummyResponse>('dummyUrl')).rejects.toThrow(
        new Error('[HTTP request error] method: GET, url: dummyUrl')
      );
    });
  });
});
