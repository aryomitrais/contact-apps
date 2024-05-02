import ContactForm from '@/components/contact/ContactForm';
import ContactListItem from '@/components/reusable/ContactListItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SkeletonList } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useGetAllContact } from '@/hooks';
import { Contact } from '@/redux/features/contact/contactSlice';
import { useEffect, useState } from 'react';

const ContactListPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>(
    undefined
  );
  const {
    data: contactData,
    isLoading: contactIsFetching,
    getContact,
  } = useGetAllContact();

  useEffect(() => {
    (async () => {
      await getContact();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ScrollArea
        className="flex flex-col flex-grow w-full 
                  border-dashed border-t-2 
                  border-b-2 border-slate-200"
      >
        <SkeletonList isVisible={contactIsFetching} repeat={5} />
        {!contactIsFetching ? (
          <Table>
            <TableBody>
              {contactData.map((contact) => (
                <TableRow
                  onClick={() => {
                    setIsOpen(true);
                    setSelectedContact(contact);
                  }}
                  className="cursor-pointer h-24"
                  key={contact.id}
                >
                  <TableCell>
                    <ContactListItem contact={contact} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : null}
      </ScrollArea>
      <ContactForm
        isOpen={isOpen}
        onClose={(reloadContactList = false) => {
          setIsOpen(false);
          if (reloadContactList) getContact();
        }}
        contact={selectedContact}
      />
    </>
  );
};

export default ContactListPage;
