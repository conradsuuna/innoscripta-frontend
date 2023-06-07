import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { login, loginFailure, loginSuccess } from '../../../redux/actions';
import { apiCaller } from '../../../utils/apiCaller';

export const LoginModal = ({ show, handleClose }) => {
    // select from state
    const {
        error,
    } = useSelector(state => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const onSubmit = () => {
        dispatch(login());
        const endpoint = '/login';
        const body = {
            email,
            password,
        };
        apiCaller.post(endpoint, body)
            .then((response) => {
                localStorage.setItem("user", JSON.stringify(response.data.user));
                localStorage.setItem("token", response.data.token);
                dispatch(loginSuccess());
                handleClose();
            }).catch((error) => {
                dispatch(loginFailure(JSON.parse(error.request.response).message));
            });
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>User Login Form.</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>

                        {error && <Form.Text className="text-muted">
                            <span style={{ color: 'red' }}>{error}</span>
                        </Form.Text>}

                        <Form.Group className="mb-3" >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="abc@gmail.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                            <Form.Control
                                type="password"
                                id="inputPassword5"
                                aria-describedby="passwordHelpBlock"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button onClick={onSubmit} variant="primary">
                            Login
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal >
        </>
    );
}
