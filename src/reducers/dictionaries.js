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


export default function dictionaries(state = initialState, action) {
    switch (action.type) {
        case types.ADD_DICT:
            console.log('adding dict', state, action)
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
                    console.log('ADD_ROW', action)
                    const nextRowId = dict.rows.length > 0 ? Math.max(...dict.rows.map(row => row.id)) + 1 : 0 ;
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
            console.log('DELETE_ROW', action)
            return state.map(dict => {
                if (dict.id === action.idDict) {
                    return {...dict, rows: dict.rows.filter(row => row.id !== action.idRow)}
                } else {
                    return dict
                }
            })
        case types.UPDATE_ROW:
            return state.map(dict => {
                if (dict.id === action.idDict) {
                    return dict.rows.map(row => {
                        if (row.id === action.idRow) {
                            return { ...row, range: action.payload.range, domain: action.payload.domain }
                        } else {
                            return row
                        }
                    })
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
