import React from 'react';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

import styled from 'styled-components'

const StyledTd = styled.td`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

import Aux from '../../../hoc/Aux';
import styles from './AllTable.module.css';
import { canShowEsc } from '../../../store/utility'

const AllTable = ( props ) => {


    return(
        <Card className={styles.UsersCard}>
            <Container>
                <Row lg={2}>
                    <Col xs lg="12">
                        <Table 
                            responsive
                            className={styles.UserTable}>
                            <thead
                                className={styles.UserThead}>
                                <tr>
                                    {
                                        props.theadArray.map(
                                            thead => {
                                                return (
                                                    <th key={thead}>{thead}</th>
                                                )
                                            }
                                        )
                                    }
                                </tr>
                            </thead>
                            <tbody
                                className={styles.UserTbody}>
                                    {
                                        props.payloadArray.map(
                                            payload => (
                                                <tr 
                                                    key={payload.id}
                                                    className={styles.UserTr}>
                                                    {
                                                        Object.values(payload).map(
                                                            (e, index) => {
                                                                if( payload.id )
                                                                    return <StyledTd key={`${index}+${payload.id}`}>{e}</StyledTd>
                                                            }
                                                                
                                                        )
                                                    }
                                                    <td>
                                                        <DropdownButton 
                                                            id="dropdown-item-button" 
                                                            drop="left"
                                                            title="">
                                                                <Dropdown.Item 
                                                                    as="button"
                                                                    onClick={ () => props.consultHandler(payload)}>
                                                                    Consultar
                                                                </Dropdown.Item>
                                                                {
                                                                    props.deleteChange ? 
                                                                    <Dropdown.Item 
                                                                        as="button"
                                                                        onClick={
                                                                            props.deleteAction ? 
                                                                            () => props.deleteHandler(payload.id) 
                                                                            : 
                                                                            () => props.changeHandler(payload)
                                                                        }>
                                                                        {
                                                                            props.deleteAction ? "Eliminar" : "Modificar"
                                                                        }
                                                                    </Dropdown.Item> : null
                                                                }
                                                                
                                                                {
                                                                    props.pollingStation ?
                                                                    <Aux>
                                                                    <Dropdown.Item 
                                                                        as="button"
                                                                        onClick={() => props.enableHandler(payload)}>
                                                                        Inhabilitar/Habilitar
                                                                    </Dropdown.Item>
                                                                    </Aux>
                                                                    :
                                                                    null
                                                                }
                                                                {
                                                                    props.changeStatus ?
                                                                    <Aux>
                                                                        <Dropdown.Item
                                                                            as="button"
                                                                            onClick={() => props.changeStatus(payload)}>
                                                                                Cambiar Estado
                                                                        </Dropdown.Item>
                                                                    </Aux> :
                                                                    null
                                                                }
                                                                {
                                                                    props.candidates ? 
                                                                    <Dropdown.Item 
                                                                        as="button"
                                                                        onClick={ () => props.candidates(payload)}>
                                                                        Candidatos
                                                                    </Dropdown.Item>  :
                                                                    null
                                                                }
                                                                {
                                                                    props.initAct && props.enableActa ? 
                                                                    <Dropdown.Item 
                                                                        as="button"
                                                                        onClick={ () => props.initAct(payload) }>
                                                                        Acta
                                                                    </Dropdown.Item>  :
                                                                    null
                                                                }
                                                                {
                                                                    (props.esc && !(canShowEsc(payload, ["Escrutinio", "Adjudicación", "Finalizado"])) ) ? 
                                                                    <Dropdown.Item 
                                                                        as="button"
                                                                        onClick={ () => props.esc(payload) }>
                                                                        Acta
                                                                    </Dropdown.Item>  :
                                                                    null
                                                                }
                                                        </DropdownButton>
                                                    </td>
                                                </tr> 
                                            )
                                        )
                                    }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </Card>
    );
};

export default AllTable;