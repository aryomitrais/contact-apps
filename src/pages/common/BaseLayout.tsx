import ContactForm from '@/components/contact/ContactForm';
import { Toaster } from '@/components/ui/toaster';
import { useGetAllContact } from '@/hooks/contactHooks';
import { CirclePlus } from 'lucide-react';
import { useState } from 'react';

export const BaseLayout = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const { getContact } = useGetAllContact();
  const onClickPlusIcon = () => setIsOpen(true);

  return (
    <div>
      <div
        className="flex-col flex items-center justify-center
                    bg-slate-100 m-auto h-screen"
      >
        <div
          className="flex-col flex w-[27rem] h-full max-w-[calc(100vw)]
                      p-5 bg-white
                      border-gray-300 border"
        >
          <div className="block relative">
            <h1 className="float-left font-bold text-gray-400 text-3xl mb-3">
              Contacts
            </h1>
            <CirclePlus
              size={35}
              className="float-right cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-150 duration-300"
              color="#69C395"
              onClick={onClickPlusIcon}
            />
          </div>
          {children}
        </div>
      </div>
      <Toaster />
      <ContactForm
        isOpen={isOpen}
        onClose={(reloadContactList = false) => {
          setIsOpen(false);
          if (reloadContactList) getContact();
        }}
      />
    </div>
  );
};
