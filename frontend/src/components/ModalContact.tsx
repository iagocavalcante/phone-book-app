import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { api } from '../services/api';
import { Contact } from "./ListContacts";

type ModalContactProps = {
  show: boolean;
  onHide: () => void;
  contact: Contact;
}
const ModalContact = (props: ModalContactProps) => {
  const saveContact = async () => {
    try {
      if (props.contact.id) {
        await api.put(`/contacts/${props.contact.id}`, props.contact);
        return
      }
      
      await api.post('/contacts', props.contact);
    } catch (error) {
      
    } finally {
      props.onHide();
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Contact form</h4>
        <Form>
          <Form.Group className="mb-3" controlId="formContactFirstNameId">
            <Form.Label>First name</Form.Label>
            <Form.Control type="text" placeholder="Enter contact first name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formContactLastNameId">
            <Form.Label>Last name</Form.Label>
            <Form.Control type="text" placeholder="Enter contact last name" />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formContactPhoneNumberId">
            <Form.Label>Phone number</Form.Label>
            <Form.Control type="text" placeholder="Enter contact phone number" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="danger">Close</Button>
        <Button onClick={saveContact}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export { ModalContact };