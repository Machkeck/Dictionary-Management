import * as types from '../constants/ActionTypes'


const initialState = [
    // {
    //     dictionaries: [],
    //     id: 0
    // }
]

// const initialDict = [{
//     id: 0,
//     rows: []
// }]

// const initialRow = [{
//     id: 0,
//     domain: '',
//     range: ''
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
    // return findChains(rows);
    // // return evalDuplicates(findDuplicates(rows), rows)
}

export default function dictionaries(state = initialState, action) {
    switch (action.type) {
        case types.ADD_DICT:
            return [
                ...state,
                {
                    id: action.id,
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

// export default function todos(state = initialState, action) {
//     switch (action.type) {
//         case ADD_TODO:
//             return [
//                 ...state,
//                 {
//                     id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
//                     completed: false,
//                     text: action.text
//                 }
//             ]

//         case DELETE_TODO:
//             return state.filter(todo =>
//                 todo.id !== action.id
//             )

//         case EDIT_TODO:
//             return state.map(todo =>
//                 todo.id === action.id ?
//                     { ...todo, text: action.text } :
//                     todo
//             )

//         case COMPLETE_TODO:
//             return state.map(todo =>
//                 todo.id === action.id ?
//                     { ...todo, completed: !todo.completed } :
//                     todo
//             )

//         case COMPLETE_ALL_TODOS:
//             const areAllMarked = state.every(todo => todo.completed)
//             return state.map(todo => ({
//                 ...todo,
//                 completed: !areAllMarked
//             }))

//         case CLEAR_COMPLETED:
//             return state.filter(todo => todo.completed === false)

//         default:
//             return state
//     }
// }
