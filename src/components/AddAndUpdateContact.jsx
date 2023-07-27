import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Modal from "./Modal";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../configure/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid Email").required("Email is Required"),
});

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact = async (values) => {
    try {
      const contactRef = collection(db, "Contacts");
      await addDoc(contactRef, values);
      onClose();
      toast.success("Contact Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  
  const updateContact = async (values, id) => {
    try {
      const contactRef = doc(db, "Contacts", id);
      await updateDoc(contactRef, values); // Update the document with the new values
      onClose();
      toast.success("Contact Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactSchemaValidation}
          initialValues={
            isUpdate
              ? {
                  name: contact.name,
                  email: contact.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) => {
            console.log(values);
            isUpdate ? updateContact(values, contact.id) : addContact(values);
          }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Field
                name="name"
                className="h-10 border"
                style={{ backgroundColor: 'lightblue', color: 'black' }}
              />
              <div className="text-xs text-red-500">
                <ErrorMessage name="name" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                className="h-10 border"
                style={{ backgroundColor: 'lightgreen', color: 'black' }}
              />
              <div className="text-xs text-red-500">
                <ErrorMessage name="email" />
              </div>
            </div>

            <button
              type="submit"
              className="self-end border bg-orange px-3 py-1.5"
              style={{ backgroundColor: 'orange', color: 'black' }}
            >
              {isUpdate ? "update" : "add"} contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdateContact;
