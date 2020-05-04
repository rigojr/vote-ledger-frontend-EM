import React from 'react';

import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

import styles from '../Subheader.module.css'


const searchinput = ( props ) => (
    <Form 
        inline
        className={styles.SomePadding}>

        <FormControl 
            type="text"
            placeholder={props.searchPlaceholder}
            onChange={props.onChange}/>

        <Button 
            variant="outline-primary"
            onClick={props.searchgHandler}>
            Buscar
        </Button>
    </Form>
);

export default searchinput;