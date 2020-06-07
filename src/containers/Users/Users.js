import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Aux from '../../hoc/Aux';
import axios from '../../axios';
import { sha256 } from 'js-sha256'
import SubHeader from '../../components/Layout/Subheader/Subheader';
import UserInputModal from '../../components/Users/UserInputModal/UserInputModal';
import AllTable from '../../components/Layout/AllTable/AllTable';
import AllModal from '../../components/Layout/Modal/AllModal';
import Spinner from '../../components/UI/Spinner/Spinner';

class User extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            users: null,
            user: {id:"", name:"", faculty:"", school:"Administración y Contaduría", email:"", password:"", enable: true},
            userPassword: "",
            theaderTable: ["Cédula","Nombre","Facultad","Escuela","Email",""],
            checkLabel: "A",
            showModal: false,
            modalMessage: "",
            search: '',
            inputEnable: false,
            inputTypeOfUser: false,
            modalTitle: '',
            modalCreateBtn: false,
            modalUpdateBtn: false,
            selectedTypeOfUser: true
        };
    }

    setId = (e) => {
        const id = e.target.value;
        this.setState( prevState => ({ user: {...prevState.user, id} }));
    }

    setName = (e) => {
        const name = e.target.value;
        this.setState( prevState => ({ user: {...prevState.user, name}}));
    }

    setSchool = (e) => {
        const school = e.target.value;
        this.setState( prevState => ({ user: {...prevState.user, school}}));
    }

    setFaculty = (school) => {
        let faculty;
        switch (school){
            case "Administración y Contaduría":
                faculty = "Ciencias Económicas y Sociales";
                break;
            case "Civil":
                faculty = "Ingeniería";
                break;
            case "Ciencias Sociales":
                faculty = "Ciencias Económicas y Sociales";
                break;
            case "Comunicación Social":
                faculty = "Humanidades y Educación";
                break;
            case "Derecho":
                faculty = "Derecho";
                break;
            case "Educación":
                faculty = "Humanidades y Educación";
                break;
            case "Economía":
                faculty = "Ciencias Económicas y Sociales";
                break;
            case "Filosofía":
                faculty = "Humanidades y Educación";
                break;
            case "Industrial":
                faculty = "Ingeniería";
                break;
            case "Informática":
                faculty = "Ingeniería";
                break;
            case "Letras":
                faculty = "Humanidades y Educación";
                break;
            case "Psicología":
                faculty = "Humanidades y Educación";
                break;
            case "Telecomunicaciones":
                faculty = "Ingeniería";
                break;
            case "Teología":
                faculty = "Teología";
                break;
        }
        this.setState( prevState => ({ user: {...prevState.user, faculty}}));
    }

    setEmail = (e) => {
        const email = e.target.value;
        this.setState( prevState => ({ user: {...prevState.user, email}}));
    }

    setPassword = (e) => {
        const userPassword = e.target.value;
        const password = sha256(e.target.value);
        this.setState( prevState => ({ user: {...prevState.user, password}}));
        this.setState ( { userPassword } )
    }

    setUserClean = () => {
        const user = {id:"", name:"", faculty:"", school:"Administración y Contaduría", email:"", password:"", enable: true};
        this.setState( { user } );
        this.setState ( { 
            userPassword:"", 
            selectedTypeOfUser: true,
            inputTypeOfUser: false
        } );
    }

    setAdminLabel = () => {
        const id = this.state.user.id + this.state.checkLabel;
        this.setState( prevState => ({ user: {...prevState.user, id} }));
    }

    setLabel = (tag) => {
        const boolTypeOfUser = false;
        if( tag === "A") 
            boolTypeOfUser = true
        this.setState( { 
            checkLabel: tag,
            selectedTypeOfUser: boolTypeOfUser
        } );
    }

    setEnableInput = ( boolean ) => {
        this.setState( { inputEnable: boolean} );
    }

    setEnableInputTypeOf = ( boolean ) => {
        this.setState( { inputTypeOfUser: boolean } );
    }

    setModalMessage = (message) => {
        console.log("setModalMessage");
        console.log(message)
        this.setState(  { modalMessage: message} );
    }

    componentDidMount () {
        console.log("Users.js is mount");
        axios.get('/users.json')
        .then( response => {
            const fetchUsers = [];
            for( let key in response.data){
                fetchUsers.push({
                    id: response.data[key].id,
                    name: response.data[key].name,
                    faculty: response.data[key].faculty,
                    school: response.data[key].school,
                    email: response.data[key].email
                });
            }
            this.setState({ users: fetchUsers });
        })
        .catch( error => {
            console.log(error)
        })
    }

    createHandler = async () => {
        console.log("Creating New User");
        this.setModalMessage("Enviando información al Blockchain");
        await this.setFaculty(this.state.user.school);
        await this.setAdminLabel();
        this.setEnableInput( true );
        this.setEnableInputTypeOf( true );
        axios.post('/users.json', this.state.user)
        .then( (response) => {
            this.setModalMessage("Guardado con éxito!");
            console.log(response);
        })
        .catch( error => {
            console.log(error);
        });

        setTimeout(this.cleanModalHandler,3000);

    }

    createModal = () => {
        this.modalHandler( true, false);
        this.cleanModalHandler();
    }

    cleanModalHandler = () => {
        this.setEnableInput( false );
        this.setEnableInputTypeOf( false);
        this.setUserClean();
    }

    consultModal = ( selectUser ) => {
        let adminBoolean = false;
        if( selectUser.id.charAt(selectUser.id.length - 1) === "A")
            adminBoolean = true;
        this.modalHandler( false, false);
        this.setEnableInput( true );
        this.setState( { 
            user: selectUser,
            selectedTypeOfUser: adminBoolean,
            inputTypeOfUser: true
        } );
    }

    consultHandler = () => {
        console.log("Consulting User");
    }

    updateModal = ( selectUser ) => {
        let adminBoolean = false;
        if( selectUser.id.charAt(selectUser.id.length - 1) === "A")
            adminBoolean = true;
        this.modalHandler( false, true);
        this.setEnableInput( false );
        this.setState( { 
            user: selectUser,
            selectedTypeOfUser: adminBoolean,
            inputTypeOfUser: true
        } );
    }

    updateHandler = () => {
        console.log("Updating User");
        console.log(this.state.user);
    }

    modalHandler = ( create, update ) => {
        console.log("Modal Handler");
        const modalBoolean = this.state.showModal;
        const showModalUpdated = !modalBoolean;
        this.setState( { 
            showModal: showModalUpdated,
            modalCreateBtn: create,
            modalUpdateBtn: update
        } );
    }

    searchHandler = () => {
        console.log("Searching User");
        let found = false;
        if(this.state.users && !(this.state.search == '')){
            for (let i in this.state.users) {
                if(this.state.search === this.state.users[i].id){
                    const searchUser = this.state.users[i];
                    this.setState( { 
                        user: searchUser,
                        search: ''
                    } );
                    this.searchModal();
                    found = true;
                }
            }
            if(!found)
                alert("Usuario con el ID " + this.state.search + ", no fue encontrado");
        }else{
            alert("Error en la búsqueda, verifique entradas y conexión con el back");
        }
    }

    searchModal = () => {
        this.modalHandler( false, false );
        this.setEnableInput( true );
        this.setEnableInputTypeOf( true );
    }

    handleOnInputSearchChange = (event) => {
        const search = event.target.value;
        this.setState({ search } );
    };

    render(){

        let RedirectComponent = this.props.isAuthed ?
            null
            :
        <Redirect from="/Dashboard" to="/login"/>;

        let UsersTableComponent = <Spinner/>;

        if (this.state.users){
            UsersTableComponent = (
                <AllTable 
                    theadArray={this.state.theaderTable}
                    payloadArray={this.state.users}
                    consultHandler={this.consultModal}
                    changeHandler={this.updateModal}
                    deleteAction={false}/>
            );
        }

        return(
            <Aux>
                <SubHeader
                    subHeaderTitle="Usuarios"
                    btnName="Usuario"
                    searchPlaceholder="Cédula de Identidad"
                    typeInput="button"
                    searchValue={this.state.search}
                    searchHandler={this.searchHandler}
                    showModal={this.createModal}
                    onChange={this.handleOnInputSearchChange}/>
                {UsersTableComponent}
                <AllModal
                    showModal={this.modalHandler}
                    createHandler={this.createHandler}
                    UpdateHandler={this.updateHandler}
                    modalBoolean={this.state.showModal}
                    modalTitile={this.state.modalTitle}
                    create={this.state.modalCreateBtn}
                    update={this.state.modalUpdateBtn}
                    enableState={this.state.inputEnable}
                    modalMessage={this.state.modalMessage}>
                    <UserInputModal 
                        userValue={this.state.user}
                        userPassword={this.state.userPassword}
                        enableState={this.state.inputEnable}
                        modalMessage={this.state.modalMessage}
                        typeOfUser={this.state.selectedTypeOfUser}
                        inputTypeOfUser={this.state.inputTypeOfUser}
                        onIdChange={this.setId}
                        onNameChange={this.setName}
                        onSchoolChange={this.setSchool}
                        onEmailChange={this.setEmail}
                        onPasswordChange={this.setPassword}
                        tagLabel={this.setLabel}/>
                </AllModal>
                {RedirectComponent}
            </Aux>
        )
    }

}

export default User;