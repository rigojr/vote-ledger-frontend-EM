import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import Aux from '../../../hoc/Aux';

const ElectionCreateModal = ( props ) => (
  <Aux>
        <Row>
            <Form.Group as={Col}>
                <Form.Label>Código</Form.Label>
                <Form.Control 
                    as="input"
                    name="id"
                    onChange={props.setValue}
                    value={props.inputValues.id}
                    disabled={props.enableState}/>
            </Form.Group>
        </Row>
        <Row>
            <Form.Group as={Col} md="4">
                <Form.Label>Tipo de Elección</Form.Label>
                <Form.Check
                    type="radio"
                    label="Consejo Universitario"
                    value="Consejo Universitario"
                    id="cuRadio"
                    name="typeElection"
                    onChange={props.setValue}
                    defaultChecked={ props.inputValues.typeElection === 'Consejo Universitario' }
                    disabled={props.enableState}/>
                <Form.Check
                    type="radio"
                    label="Consejo de Facultad"
                    value="Consejo de Facultad"
                    id="cfRadio"
                    name="typeElection"
                    onChange={props.setValue}
                    defaultChecked={ props.inputValues.typeElection === 'Consejo de Facultad' }
                    disabled={props.enableState}/>
                <Form.Check
                    type="radio"
                    label="Consejo de Escuela"
                    value="Consejo de Escuela"
                    id="ceRadio"
                    name="typeElection"
                    onChange={props.setValue}
                    defaultChecked={ props.inputValues.typeElection === 'Consejo de Escuela' }
                    disabled={props.enableState}/>
            </Form.Group>
            <Form.Group as={Col} md="8">
                <Form.Label>Descripción</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows="3"
                    name="desc"
                    onChange={props.setValue}
                    value={props.inputValues.desc}
                    disabled={props.enableState}/>
            </Form.Group>
        </Row>
  </Aux>
);

export default ElectionCreateModal;