import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from "../configure/firebase";
import AddAndUpdateContact from "./AddAndUpdateContact";
import useDisclouse from "../hooks/useDisclosure.jsx";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
  const { isOpen, onClose, onOpen } = useDisclouse();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "Contacts", id));
      toast.success("Contact Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        key={contact.id}
        className="flex items-center justify-between rounded-lg p-2" style={{ backgroundColor: 'rgb(210,247,247)'}}
      >
        <div className="flex gap-1">
          <HiOutlineUserCircle style={{ fontSize: "2.5rem", color: "rgb(6,221,217)" }} />
          <div className="">
            <h2 className="font-medium" style={{ color: "black" }}>
              {contact.name}
            </h2>
            <p className="text-sm" style={{ color: "black" }}>
              {contact.email}
            </p>
          </div>
        </div>
        <div className="flex text-3xl">
          <RiEditCircleLine onClick={onOpen} className="cursor-pointer" style={{ color: "blue" }} />
          <IoMdTrash
            onClick={() => deleteContact(contact.id)}
            className="cursor-pointer"
            style={{ color: "red" }}
          />
        </div>
      </div>
      <AddAndUpdateContact
        contact={contact}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ContactCard;
