import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Aux from '../../hoc/Aux';
import SubHeader from '../../components/Layout/Subheader/Subheader';
import CreateModal from '../../components/Elections/ElectionCreateModal/ElectionCreateModal';
import AllTable from '../../components/Layout/AllTable/AllTable';
import AllModal from '../../components/Layout/Modal/AllModal';
import CardMessage from '../../components/Layout/CardMessage/CardMessage';
import InfraHeader from '../../components/Layout/InfraHeader/InfraHeader';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';


class Elections extends Component {

    state = {
        elections: null,
        form: {
            id: '',
            typeElection: 'Consejo Universitario',
            desc: ''
        },
        electoralEvents: null,
        selectElectoralEvent: '',
        showModal: false,
        search: '',
        theaderTable: ["Código","Tipo de Elección","Descripción", ""],
        showMessage: true,
        showTable: false,
        modalMessage: '',
        enableState: false,
        modalCreateBtn: false
    }

    componentDidMount () {

        axios.get('/electoral-events.json')
        .then( response => {
            const fetch = [];
            for( let key in response.data){
                fetch.push({
                    id: response.data[key].id,
                    state: response.data[key].state,
                    initDate: response.data[key].initDate,
                    endDate: response.data[key].endDate
                });
            }
            this.setState({ electoralEvents: fetch });
        })
        .catch( error => {
            console.log(error);
        })

        axios.get('/elections.json')
        .then( response => {
            const fetch =[];
            for( let key in response.data){
                fetch.push({
                    id: response.data[key].id,
                    typeElection: response.data[key].typeElection,
                    desc: response.data[key].desc
                });
            }
            this.setState({ elections: fetch });
        })
        .catch( error => {
            console.log(error);
        })
    }

    setValue = (e) => {
        const value = e.target.value;
        const name = [e.target.name];
        this.setState( prevState => ({
            form: {
                ...prevState.form,
                [name]: value 
            }
         }));
    };

    setModalMessage = (message) => {
        console.log("setModalMessage");
        console.log(message)
        this.setState(  { modalMessage: message} );
    }

    searchHandler = () => {
        console.log("Searching Election");
        let found = false;
        if(this.state.electoralEvents && this.state.elections){
            if(this.state.showTable){
                for (let i in this.state.elections) {
                    if(this.state.search === this.state.elections[i].id){
                        const search = this.state.elections[i];
                        this.setState( { 
                            form: {
                                id: search['id'],
                                typeElection: search['typeElection'],
                                desc: search['desc']
                            },
                            search: ''
                        } );
                        this.setState( { enableState: true} );
                        this.searchModal();
                        found = true;
                    }
                }
                if(!found)
                    alert("Evento Electoral con el Código " + this.state.search + ", no fue encontrado");
            } else {
                alert("Por favor, seleccione un evento electoral para buscar.");
            }
        }else{
            alert("Error en la búsqueda, verifique entradas y conexión con el back");
        }
    }

    handleOnInputSearchChange = (event) => {
        const search = event.target.value;
        this.setState({ search } );
    };

    searchModal = () => {
        this.modalHandler( false );
    }

    modalHandler = ( create ) => {
        console.log("Modal Handler");
        const modalBoolean = this.state.showModal;
        const showModalUpdated = !modalBoolean;
        if(create){
            this.cleanModalHandler();
        }
        this.setState( { 
            showModal: showModalUpdated,
            modalCreateBtn: create
        } );
    }

    createElectionHandler = async () => {
        console.log("Creating New Election");
        this.setModalMessage("Enviando información al Blockchain");
        this.setState( { enableState: true} );
        await axios.post('/elections.json', {
            id: this.state.form.id,
            typeElection: this.state.form.typeElection,
            desc: this.state.form.desc
        })
        .then( (response) => {
            console.log(response);
            this.setModalMessage("Guardado con éxito!");
        })
        .catch( error => {
            console.log(error);
            this.setModalMessage("Hubo un error en la comunicación, no se guardo la información");
        });
        setTimeout(this.cleanModalHandler,3000);
    }

    consultHanlder = (select) => {
        this.modalHandler(false);
        this.setState( { enableState: true} );
        this.setState(
            {
                form: {
                    id: select['id'],
                    typeElection: select['typeElection'],
                    desc: select['desc']
            }}
        )
    }

    deleteElectionHandler = () => {
        console.log("Deleting Election");
    }

    selectElectoralEventHandler = ( ElectoralEvent ) => {
        console.log("Selecting " + ElectoralEvent + " as a Electoral Event");
        const tempShowMessage = false;
        const tempShowTable = true;
        this.setState(
            {
                showMessage: tempShowMessage,
                showTable: tempShowTable,
                selectElectoralEvent: ElectoralEvent
            }
        );
    }

    cleanModalHandler = () => {
        this.setState( { 
            enableState: false,
            form:{
                id: '',
                typeElection: 'Consejo Universitario',
                desc: ''
            }
        } );
    }

    render(){

        let ElectionMessage = this.state.showMessage ?
        <CardMessage messageTitle="Por favor, seleccione un evento electoral para continuar."/> :
        null;

        let ElectionContent = this.state.showTable ?
        <Aux>
            <InfraHeader 
                title={this.state.selectElectoralEvent}
                btnName="Elección"
                showModal={this.modalHandler}
                btnBlockBoolean={true}/>
            <AllTable 
                theadArray={this.state.theaderTable}
                payloadArray={this.state.elections}
                consultHandler={this.consultHanlder}
                deleteHandler={this.deleteElectionHandler}
                deleteAction={true}/>
        </Aux>
        
            :
        null;

        let ElectionComponent = <Spinner/>;

        if( this.state.electoralEvents && this.state.elections ){
            ElectionComponent = (
                <Aux>
                    <SubHeader 
                        subHeaderTitle="Elecciones del Sistema"
                        searchHandler={this.searchHandler}
                        btnName="Eventos Electorales"
                        btnPayload={this.state.electoralEvents}
                        btnSelect={this.selectElectoralEventHandler}
                        searchPlaceholder="Código de la Elección"
                        typeInput="drop"
                        onChange={this.handleOnInputSearchChange}
                        searchValue={this.state.search}/>
                    {ElectionMessage}
                    {ElectionContent}
                    <AllModal
                        showModal={this.modalHandler}
                        modalBoolean={this.state.showModal}
                        createHandler={this.createElectionHandler}
                        modalTitile="Crear Elección"
                        enableState={this.state.enableState}
                        modalMessage={this.state.modalMessage}
                        create={this.state.modalCreateBtn}>
                        <CreateModal 
                            setValue={this.setValue}
                            inputValues={this.state.form}
                            enableState={this.state.enableState}/>
                    </AllModal>
                </Aux>
            )
        }

        let RedirectComponent = this.props.isAuthed ?
            null
            :
        <Redirect from="/elections" to="/login"/>;

        return(
            <Aux>
                {ElectionComponent}
                {RedirectComponent}
            </Aux>
        )
    }

}

export default Elections;