import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import {CREATE_AUDIT_TYPE} from '../../utils/mutations';
import {useMutation} from '@apollo/client';
import { useHistory} from 'react-router-dom';



const MyVerticallyCenteredModal= (props) =>{

    const [newAuditType, setNewAuditType] = useState();

    return(
        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Container>
                Hello World
            </Container>
        </Modal>        
        )
}

const NewAuditTypeModal = (show) =>{

    const [modalShow, setModalShow] = React.useState(false);

    return(
        <MyVerticallyCenteredModal 
            show={modalShow} 
            onHide={() => setModalShow(false)}
            />
    )
}

export default NewAuditTypeModal;