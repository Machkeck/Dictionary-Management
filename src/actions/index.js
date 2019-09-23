import * as types from '../constants/ActionTypes'

let nextDictId = 0;

export const addDictionary = () => ({
    type: types.ADD_DICT,
    id: nextDictId++
})

export const deleteDictionary = id => ({
    type: types.DELETE_DICT,
    id
})

export const addRow = (id, payload) => ({
    type: types.ADD_ROW,
    id,
    payload
})

export const updateRow = (idDict, idRow, payload) => ({
    type: types.UPDATE_ROW,
    idDict,
    idRow,
    payload
})

export const deleteRow = (idDict, idRow) => ({
    type: types.DELETE_ROW,
    idDict,
    idRow
})