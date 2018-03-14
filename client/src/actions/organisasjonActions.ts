import { createAction } from 'redux-actions';

export const UPDATE_KONTAKTPERSON = 'UPDATE_KONTAKTPERSON';
export const UPDATE_JURIDISKANSVARLIG = 'UPDATE_JURIDISKANSVARLIG';
export const ADD_JURIDISKANSVARLIG = 'ADD_JURIDISKANSVARLIG';
export const DELETE_JURIDISKANSVARLIG = 'DELETE_JURIDISKANSVARLIG';

const updateKontaktPerson = createAction<string, string>(
    UPDATE_KONTAKTPERSON,
    (taskId: string) => (taskId)
);

const updateJuridiskAnsvarlig = createAction<string, string>(
    UPDATE_JURDISKANSVARLIG,
    (taskId: string) => (taskId)
);

const addJuridiskAnsvarlig = createAction<string, string>(
    ADD_JURIDISKANSVARLIG,
    (taskId: string) => (taskId)
);

const deleteJuridiskAnsvarlig = createAction<string, string>(
    DELETE_JURIDISKANSVARLIG,
    (taskId: string) => (taskId)
);

export { updateKontaktPerson, updateJuridiskAnsvarlig, addJuridiskAnsvarlig, addJuridiskAnsvarlig };