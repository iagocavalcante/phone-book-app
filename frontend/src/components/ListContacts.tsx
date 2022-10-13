import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { Trash, TelephoneFill } from 'react-bootstrap-icons';
import ToastGeneric, { ToastGenericProps } from './Toast';

import { api } from '../services/api';
import { ModalContact } from './ModalContact';

export type Contact = {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string; 
}

type ListContactsProps = {
  contacts: Contact[];
  updateList: () => void;
};
function ListContacts({ contacts, updateList }: ListContactsProps) {
  const [toastProperties, setToastProperties] = useState<ToastGenericProps>({
    show: false,
    onClose: () => setToastProperties({ ...toastProperties as ToastGenericProps, show: false }),
    title: '',
    message: '',
  });
  const [showModal, setShowModal] = useState(false);
  const handleDeleteContact = async (id: number) => {
    try {
      await api.del(`/contacts/${id}`);
      setToastProperties({
        show: true,
        onClose: () => setToastProperties({ ...toastProperties as ToastGenericProps, show: false }),
        title: 'Success',
        message: 'Contact deleted successfully',
      });
      setTimeout(() => {
        setToastProperties({
          ...toastProperties as ToastGenericProps,
          show: false,
        });
      }, 3000);
    } catch (error) {
      setToastProperties({
        show: true,
        onClose: () => setToastProperties({ ...toastProperties as ToastGenericProps, show: false }),
        title: 'Error',
        message: 'Contact could not be deleted',
      });
    } finally {
      updateList();
    }
  }
  return (
    <>
      <ToastGeneric {...toastProperties as ToastGenericProps} />
      <ListGroup>
        {contacts.map((contact) => (
          <ListGroup.Item
            key={contact.id}
            className="d-flex justify-content-between align-items-start"
          >
            <ModalContact key={contact.id} show={showModal} contactUpdate={contact} onHide={() => setShowModal(false)} />
            <div style={{ cursor: 'pointer' }} className="ms-2 me-auto" onClick={() => setShowModal(true)}>
              <div className="fw-bold">{contact.firstName} {contact.lastName}</div>
              <TelephoneFill color="gray" size={10} /> {contact.phoneNumber}
            </div>
            <Button variant='danger' onClick={() => handleDeleteContact(contact.id)}>
              <Trash />
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default ListContacts;