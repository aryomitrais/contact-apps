import { Contact } from '@/redux/features/contact/contactSlice';
import { AvatarWrap } from '../ui/avatar';

const ContactListItem = ({ contact }: { contact: Contact }) => (
  <div className="relative">
    <AvatarWrap className="inline-block" src={contact.photo}></AvatarWrap>
    <span className="absolute ml-4 top-3 text-slate-700 text-base">
      {`${contact.firstName} ${contact.lastName}`}
    </span>
  </div>
);

export default ContactListItem;
