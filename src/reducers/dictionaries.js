import * as types from '../constants/ActionTypes'


const initialState = []

// const initialDict = [{
//     id: 0,
//     rows: []
// }]

// const initialRow = [{
//     id: 0,
//     domain: '',
//     range: '',
//     error: null
// }]

function findChains(rows){
    return rows.map(row => {
        const findings = rows.filter(r => row.domain === r.range && r.id !== row.id);
        if(findings.length > 0){
            if(findings.every(finding => finding.domain !== row.range)){
                return {...row, error: 'chain'}
            } else {
                return {...row, error: 'cycle'}
            }
        } else {
            return {...row, error:null};
        }
    })
}

function findDuplicates(rows) {
    const duplicateIds = rows
        .map(e => e.domain)
        .map((e, i, final) => final.indexOf(e) !== i && i)
        .filter(obj => rows[obj])
        .map(e => rows[e].id)
    return duplicateIds;
}

function evalDuplicates(duplicateIds, rows) {
    return rows.map(row => {
        if(duplicateIds.find(id => row.id === id)){
            return {...row, error: 'duplicate'}
        } else {
            return {...row, error:null};
        }
    })
}

function evalRows(rows){
    const firstEvals = findChains(rows);
    if(firstEvals.find(row => row.error != null)){
        return firstEvals;
    } else {
        return evalDuplicates(findDuplicates(rows), rows)
    }
}

export default function dictionaries(state = initialState, action) {
    switch (action.type) {
        case types.ADD_DICT:
            const nextDictId = state.length > 0 ? Math.max(...state.map(dict => dict.id)) + 1 : 0;
            return [
                ...state,
                {
                    id: nextDictId,
                    rows: []
                }
            ]
        case types.DELETE_DICT:
            return state.filter(dict => dict.id !== action.id);
        case types.ADD_ROW:
            return state.map(dict => {
                if (dict.id === action.id) {
                    const nextRowId = dict.rows.length > 0 ? Math.max(...dict.rows.map(row => row.id)) + 1 : 0;
                    return {
                        ...dict,
                        rows: [
                            ...dict.rows,
                            {
                                id: nextRowId,
                                range: action.payload.range,
                                domain: action.payload.domain
                            }
                        ]
                    }
                } else {
                    return dict
                }
            })
        case types.DELETE_ROW:
            return state.map(dict => {
                if (dict.id === action.idDict) {
                    return { ...dict, rows: evalRows(dict.rows.filter(row => row.id !== action.idRow))}
                } else {
                    return dict
                }
            })
        case types.UPDATE_ROW:
            return state.map(dict => {
                if (dict.id === action.idDict) {
                    return {
                        ...dict, rows: evalRows(dict.rows.map(row => {
                            if (row.id === action.idRow) {
                                return { ...row, range: action.payload.range, domain: action.payload.domain }
                            } else {
                                return row
                            }
                        })) 
                    }
                } else {
                    return dict
                }
            })
        default:
            return state;
    }
}
