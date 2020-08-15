import * as actionTypes from './actionTypes';
import axios from '../../axios-tg';

export const fetchStart = () => {
    return ({
        type: actionTypes.FETCH_START    
    })
}

export const fetchError = ( error ) => {
    return ({
        type: actionTypes.FETCH_ERROR,
        error: error
    })
}

export const fetchSuccessUsers = ( users ) => {
    return ({
        type: actionTypes.FETCH_SUCCESS_USERS,
        users: users
    })
}

export const fetchSuccessEvents = ( fetch, events ) => {
    return ({
        type: actionTypes.FETCH_SUCCESS_EVENTS,
        events: events,
        fetch: fetch
    })
}

export const fetch = ( ) => {
    return dispatch => {
        dispatch( fetchStart() );
        
         axios.post( '/event/getall', {
            parameter :""
        })
        .then( response => {
            const fetch = [];
            const events = [];
            const jsonData = JSON.parse(response.data.mensaje);
            for( let key in jsonData){

                const tempInitDate = new Date(jsonData[key].Record.fechainicio)
                const tempEndDate = new Date(jsonData[key].Record.fechafin)

                const eventsTemp = {
                    id: jsonData[key].Key,
                    eventName: jsonData[key].Record.nombreevento,
                    state: jsonData[key].Record.estado,
                    initDate: tempInitDate.toString(),
                    endDate: tempEndDate.toString(),
                };

                fetch.push({
                    ...eventsTemp,
                    record: {
                        elections: {...jsonData[key].Record.Election},
                        pollingStations: {...jsonData[key].Record.PollingTable}
                    }
                })

                events.push( {...eventsTemp} )
            }
            dispatch( fetchSuccessEvents( fetch, events ) );
        })
        .catch( error => console.log(error));


    }
}

export const createStart = () => {
    return ({
        type: actionTypes.CREATE_START    
    })
}

export const createError = ( error ) => {
    return ({
        type: actionTypes.CREATE_ERROR,
        error: error
    })
}

export const createSuccess = ( ) => {
    return ({
        type: actionTypes.CREATE_SUCCESS,
    })
}

export const create = ( electoralEvent ) => {
    return dispatch => {
        dispatch( createStart() );

        axios.post('/event/save', {
            parameter: electoralEvent
        })
        .then( response => {
            dispatch(createSuccess())
            dispatch(fetch())
        })
        .catch( error => createError(error) );
    }
}

export const setMessage = ( message ) => {
    return ({
        type: actionTypes.SET_MESSAGE,
        message: message
    })
}