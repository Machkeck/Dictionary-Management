import React from 'react';
import DictionaryRow from './DictionaryRow';
import './Dictionary.css';

const deleteInDict = (idDict, func) => {
    return function (idRow) {
        func(idDict, idRow);
    }
};

const updateInDict = (idDict, func) => {
    return function (idRow, payload) {
        func(idDict, idRow, payload);
    }
};

const Dictionary = (props) => {
    const { id, addRow, deleteDictionary, deleteRow, rows, updateRow } = props;
    return (
        <li className='Dictionary'>
            <div className='Dictionary-RowsContainer'>
                {rows.map(row =>
                    <DictionaryRow
                        key={row.id}
                        id={row.id}
                        domain={row.domain}
                        range={row.range}
                        deleteRow={deleteInDict(id, deleteRow)}
                        updateRow={updateInDict(id, updateRow)}
                    />
                )}
            </div>
            <div className='Dictionary-ButtonsContainer'>
                <button onClick={() => addRow(id, { domain: '', range: '' })}>Add Row</button>
                <button onClick={() => deleteDictionary(id)}>Delete Dictionary</button>
            </div>
        </li>
    )
};

export default Dictionary;