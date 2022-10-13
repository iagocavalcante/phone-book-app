import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { api } from '../services/api';
import { Contact } from "./ListContacts";
import ToastGeneric, { ToastGenericProps } from './Toast';

type ModalContactProps = {
  show: boolean;
  onHide: () => void;
  contactUpdate?: Contact;
}
const ModalContact = ({ contactUpdate, show, onHide }: ModalContactProps) => {
  const [contact, setContact] = useState<Contact>({} as Contact);
  const [toastProperties, setToastProperties] = useState<ToastGenericProps>({
    show: false,
    onClose: () => setToastProperties({ ...toastProperties as ToastGenericProps, show: false }),
    title: '',
    message: '',
  });
  const saveContact = async () => {
    try {
      if (contact?.id) {
        await api.put(`/contacts/${contact.id}`, contact);
        return
      }
      
      await api.post('/contacts', contact);
      setToastProperties({
        show: true,
        onClose: () => setToastProperties({ ...toastProperties as ToastGenericProps, show: false }),
        title: 'Success',
        message: 'Contact save successfully',
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
        message: 'Contact could not be saved',
      });
      setTimeout(() => {
        setToastProperties({
          ...toastProperties as ToastGenericProps,
          show: false,
        });
      }, 2000);
    } finally {
      onHide();
    }
  }

  useEffect(() => {
    if (contactUpdate) {
      console.log(contactUpdate);
      setContact(contactUpdate);
    }
  }, [contactUpdate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setContact({ ...contact, [name]: value });
  }

  return (
    <>
      <ToastGeneric {...toastProperties as ToastGenericProps} />
      <Modal
        show={show}
        onHide={() => onHide()}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {contact?.id ? 'Update' : 'Create'} contact form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formContactFirstNameId">
              <Form.Label>First name</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={contact?.firstName}
                name="firstName"
                type="text"
                placeholder="Enter contact first name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formContactLastNameId">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={contact?.lastName}
                name="lastName"
                type="text"
                placeholder="Enter contact last name"
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formContactPhoneNumberId">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={contact?.phoneNumber}
                name="phoneNumber"
                type="text"
                placeholder="Enter contact phone number"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => onHide()} variant="danger">Close</Button>
          <Button onClick={saveContact}>Salvar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { ModalContact };