import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { register, registerFailure, registerSuccess } from '../../../redux/actions';
import { apiCaller } from '../../../utils/apiCaller';

export const SignUpModal = ({ show, handleClose }) => {
    // select from state
    const {
        error,
    } = useSelector(state => state.auth);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const onSubmit = () => {
        dispatch(register());
        const endpoint = '/register';
        const body = {
            name,
            email,
            password,
        };
        apiCaller.post(endpoint, body)
            .then((response) => {
                localStorage.setItem("user", JSON.stringify(response.data.user));
                localStorage.setItem("token", response.data.token);
                dispatch(registerSuccess());
                handleClose();
            }).catch((error) => {
                dispatch(registerFailure(error.message));
            });
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>User Registration Form.</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group className="mb-3" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="John Doe" required value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="abc@gmail.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            {error && <Form.Text className="text-muted">
                                <span style={{ color: 'red' }}>Email already in use.</span>
                            </Form.Text>}
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
                            <Form.Text id="passwordHelpBlock" muted>
                                Required password should be 4 characters minimum.
                            </Form.Text>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button onClick={onSubmit} variant="primary">
                            Register
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal >
        </>
    );
}
