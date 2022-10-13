import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

export type ToastGenericProps = {
  show: boolean;
  onClose: () => void;
  title: string;
  message: string;
};

function ToastGeneric({ show, onClose, title, message }: ToastGenericProps) {
  return (
    <ToastContainer position={'top-end'} className="p-3">
      <Toast show={show} onClose={onClose}>
        <Toast.Header>
          <strong className="me-auto">{title}</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastGeneric;