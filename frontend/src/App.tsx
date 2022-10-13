import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Journal, Plus } from 'react-bootstrap-icons';
import ToastGeneric, { ToastGenericProps } from "./components/Toast";
import ListContacts, { Contact } from "./components/ListContacts";
import { ModalContact } from './components/ModalContact';

import { api } from "./services/api";

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [toastProperties, setToastProperties] = useState<ToastGenericProps>({
    show: false,
    onClose: () => setToastProperties({ ...toastProperties as ToastGenericProps, show: false }),
    title: '',
    message: '',
  });

  const getContacts = async () => {
    try {
      const response = await api.get("/contacts");
      setContacts(response as Contact[]);
      setFilteredContacts(response as Contact[]);
    } catch (error) {
      setToastProperties({
        show: true,
        onClose: () => setToastProperties({ ...toastProperties as ToastGenericProps, show: false }),
        title: 'Error',
        message: 'Could not fetch contacts',
      });
      setTimeout(() => {
        setToastProperties({
          ...toastProperties as ToastGenericProps, show: false
        })
      }, 3000);
    }
  }

  const searchContactsByLastName = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === '') {
      setFilteredContacts(contacts);
      return;
    }

    const filtered = contacts.filter(contact => contact.lastName.toLowerCase().includes(value.toLowerCase()));
    setFilteredContacts(filtered);
  }


  useEffect(() => {
    (async () => {
      await getContacts();
    })()
  }, []);

  const closeModalAndRefreshContacts = async () => {
    setShowModal(false);
    await getContacts();
  }


  return (
    <Container className="mt-4 p-10 gray-500" fluid>
      <ToastGeneric {...toastProperties as ToastGenericProps} />
      <ModalContact show={showModal} onHide={closeModalAndRefreshContacts} />
      <Row className="justify-content-md-center">
        <Row className="justify-content-md-center">
          <Col md={1} className="d-flex p-1 align-self-center justify-content-end">
            <Journal size={38} />
          </Col>
          <Col md={4}>
            <h1 className="">Phone Book Application</h1>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={6} className="d-flex align-self-center justify-content-start">
            <h2 className="">Contacts</h2>
          </Col>
          <Col md={6} className="d-flex align-self-center justify-content-end">
            <Button onClick={() => setShowModal(true)} className="justify-content-end">
              <Plus color="white" size={16}/>
              Add contact
            </Button>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="d-flex align-self-center">
            <input onInput={searchContactsByLastName} type="text" className="form-control" placeholder="Search for contact by last name..." />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <ListContacts updateList={closeModalAndRefreshContacts} contacts={filteredContacts} />
          </Col>
        </Row>
      </Row>
    </Container>
  );
}

export {App};
