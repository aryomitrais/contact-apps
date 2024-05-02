import { HTTPMethodEnum } from '@/utils/http';
import {
  useCreateContact,
  useDeleteContact,
  useGetAllContact,
  useUpdateContact,
} from './contactHooks';
import { renderHookWithProviders } from '@/utils/test-utils';
import { vi } from 'vitest';

const contactDummyData = [
  {
    id: 'id',
    firstName: 'firstNameTEST',
    lastName: 'lastNameTEST',
    photo: 'photo',
    age: 22,
  },
];

describe('contactHooks', () => {
  describe('useGetAllContact', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      vi.spyOn(window, 'fetch').mockImplementationOnce(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              data: contactDummyData,
            }),
          status: 200,
          ok: true,
        } as Response)
      );
    });
    it('Should populate data on success get all contact', async () => {
      const { result } = renderHookWithProviders(() => useGetAllContact());
      expect(result.current.data).toHaveLength(0);
      expect(result.current.isLoading).toBeFalsy();
      await result.current.getContact();
      expect(fetch).toHaveBeenCalledWith(
        'https://contact.herokuapp.com/contact',
        {
          body: undefined,
          method: HTTPMethodEnum.GET,
        }
      );
      expect(result.current.data).toEqual(contactDummyData);
      expect(result.current.isLoading).toBeFalsy();
    });
    it('Should call POST http request with create contact payload', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...createContactDummyData } = contactDummyData[0];
      const { result } = renderHookWithProviders(() => useCreateContact());
      expect(result.current.isLoading).toBeFalsy();
      await result.current.createContact(createContactDummyData);
      expect(fetch).toHaveBeenCalledWith(
        'https://contact.herokuapp.com/contact',
        {
          body: JSON.stringify(createContactDummyData),
          method: HTTPMethodEnum.POST,
        }
      );
      expect(result.current.isLoading).toBeFalsy();
    });
    it('Should call PUT http request with update contact payload', async () => {
      const { id, ...updateContactPayload } = contactDummyData[0];
      const { result } = renderHookWithProviders(() => useUpdateContact());
      expect(result.current.isLoading).toBeFalsy();
      await result.current.updateContact(contactDummyData[0]);
      expect(fetch).toHaveBeenCalledWith(
        `https://contact.herokuapp.com/contact/${id}`,
        {
          body: JSON.stringify(updateContactPayload),
          method: HTTPMethodEnum.PUT,
        }
      );
      expect(result.current.isLoading).toBeFalsy();
    });
    it('Should call DELETE http request', async () => {
      const { result } = renderHookWithProviders(() => useDeleteContact());
      expect(result.current.isLoading).toBeFalsy();
      await result.current.deleteContact(contactDummyData[0]);
      expect(fetch).toHaveBeenCalledWith(
        `https://contact.herokuapp.com/contact/${contactDummyData[0].id}`,
        {
          body: undefined,
          method: HTTPMethodEnum.DELETE,
        }
      );
      expect(result.current.isLoading).toBeFalsy();
    });
  });
});
