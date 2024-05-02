import { Modal } from '../reusable/Modal';
import { Button } from '../ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { Contact } from '@/redux/features/contact/contactSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { AvatarWrap } from '../ui/avatar';
import { useUpdateContact, useDeleteContact, useCreateContact } from '@/hooks';
import { useToast } from '../ui/use-toast';

const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'Minimum 2 character' })
    .max(50, { message: 'Maximum character is 50' }),
  lastName: z
    .string()
    .min(2, { message: 'Minimum 2 character' })
    .max(50, { message: 'Maximum character is 50' }),
  age: z
    .number({
      invalid_type_error: 'Please enter a valid number',
    })
    .nonnegative({ message: 'Must be greater than 0' })
    .min(1, { message: 'Must be greater than 0' }),
  photo: z.string().min(1, { message: 'This field is required' }),
});

const ContactForm = ({
  isOpen,
  onClose,
  contact,
}: {
  isOpen: boolean;
  onClose: (reloadData?: boolean) => void;
  contact?: Contact;
}) => {
  const { toast } = useToast();
  const { isLoading, updateContact } = useUpdateContact();
  const { isLoading: isCreateContactLoading, createContact } =
    useCreateContact();
  const { isLoading: isDeleteContactLoading, deleteContact } =
    useDeleteContact();
  const form = useForm<Contact>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      age: 0,
      photo: '',
    },
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(contact);
    }
  }, [isOpen, form, contact]);

  const checkDisabledSubmitButton = () => {
    if (form.formState.submitCount > 0) {
      return !form.formState.isDirty || !form.formState.isValid;
    }
    return (
      !form.formState.isDirty ||
      isLoading ||
      isDeleteContactLoading ||
      isCreateContactLoading
    );
  };

  const onSubmit = async (contactForm: Contact) => {
    const contactRequestPayload = contact?.id
      ? { id: contact.id, ...contactForm }
      : contactForm;
    if (contactRequestPayload.id) {
      await updateContact(contactRequestPayload);
    } else {
      await createContact(contactRequestPayload);
    }

    toast({
      description: 'Contact has been updated.',
    });
    onClose(true);
  };

  const onClickDelete = async () => {
    if (contact)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await deleteContact(contact)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((response: any) => {
          if (!response?.payload?.ok) {
            toast({
              variant: 'destructive',
              description: 'Failed to delete the contact.',
            });
          }
          onClose(!!response?.payload?.ok);
        })
        .catch(() => {
          toast({
            variant: 'destructive',
            description: 'Failed to delete the contact.',
          });
          onClose(false);
        });
  };

  return (
    <Modal
      isOpen={isOpen}
      size="md"
      title={!contact?.id ? 'Add New Contact' : 'Edit Contact'}
      onClose={onClose}
      outsideDialogCloseable={false}
    >
      <AvatarWrap
        className="inline-block w-36 h-36 shadow-2xl border-slate-300 border-2 m-auto"
        src={form.getValues().photo}
      ></AvatarWrap>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-1 -mt-5"
          id="create-product-form"
          encType="multipart/form-data"
        >
          <div className="flex flex-col gap-4 flex-1 max-h-[70vh]">
            <div className="flex flex-col flex-1 my-4">
              <div className="flex flex-1 flex-row gap-2 p-2">
                <FormField
                  control={form.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Photo URL</FormLabel>
                      <FormControl role="product-name-input">
                        <Input placeholder="Enter photo URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-1 flex-row gap-2 p-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>First Name</FormLabel>
                      <FormControl role="product-name-input">
                        <Input placeholder="Enter First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-1 flex-row gap-2 p-2">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl role="product-name-input">
                        <Input placeholder="Enter Last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-1 flex-row gap-2 p-2">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Age</FormLabel>
                      <FormControl role="product-name-input">
                        <Input
                          placeholder="Enter Age"
                          {...field}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            field.onChange(Number.isNaN(val) ? 0 : val);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-4"></div>
              <Modal.Footer showCloseButton disableCloseButton={isLoading}>
                <Button
                  form="create-product-form"
                  type="submit"
                  className="gap-2"
                  disabled={checkDisabledSubmitButton()}
                >
                  Save
                </Button>
                {contact?.id ? (
                  <Button
                    variant={'destructive'}
                    form="create-product-form"
                    type="submit"
                    className="gap-2"
                    disabled={isLoading}
                    onClick={onClickDelete}
                  >
                    Delete
                  </Button>
                ) : null}
              </Modal.Footer>
            </div>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default ContactForm;
