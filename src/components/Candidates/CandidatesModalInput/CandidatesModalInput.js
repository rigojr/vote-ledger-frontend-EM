import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import Aux from '../../../hoc/Aux'
import styles from './CandidatesModalInput.module.css';

const CandidatesModalInput = ( props ) => (
    <Aux>
        <Row>
            <Form.Group as={Col}>
                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Cédula del Usuario"
                    name='id'
                    value={props.inputValues.id}
                    onChange={props.setValue}/>
                    <InputGroup.Append>
                        <Button 
                            variant="outline-primary"
                            onClick={props.searchUser}>
                            Buscar
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form.Group>
        </Row>
        <Row>
            <Form.Group as={Col}>
                <p className={`${styles.alertMessage}`}><b>Buscar Candidato</b></p>
            </Form.Group>
        </Row>
        <Row>
            <Form.Group as={Col}>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                    as="input"
                    disabled
                    value={props.inputValues.name}/>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                    type="email"
                    disabled
                    value={props.inputValues.email}/>
            </Form.Group>
        </Row>
        <Row>
            <Form.Group as={Col}>
                <Form.Label>Facultad</Form.Label>
                <Form.Control
                    as="input"
                    disabled
                    value={props.inputValues.faculty}/>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>Escuela</Form.Label>
                <Form.Control
                    as="input"
                    disabled
                    value={props.inputValues.school}/>
            </Form.Group>
        </Row>
    </Aux>
);

export default CandidatesModalInput;