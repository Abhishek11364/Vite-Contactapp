import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./configure/firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclosure from "./hooks/useDisclosure";
import NotFoundContact from "./components/NotFoundContact";
import { debounce } from "lodash";
import "./App.css"; // Import the CSS file here


const App = () => {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "Contacts");

        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
        });
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  const filterContacts = debounce((e) => {
    const value = e.target.value.toLowerCase();
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(value)
    );
    setContacts(filteredContacts);
  }, 300);

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="relative flex flex-grow items-center">
            <FiSearch className="absolute ml-1 text-3xl text-black" />
            <input
              onChange={filterContacts}
              type="text"   style={{ backgroundColor: 'white', color: 'black' }}
              className="h-10 flex-grow rounded-md border border-black bg-transparent pl-9 text-white"
            />
          </div>

          <AiFillPlusCircle
            onClick={onOpen}
            className="cursor-pointer text-5xl text-black"
          />
        </div>
        <div className="mt-4 flex flex-col gap-3">
          {contacts.length === 0 ? (
            <NotFoundContact />
          ) : (
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <ToastContainer position="bottom-center" />
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default App;
