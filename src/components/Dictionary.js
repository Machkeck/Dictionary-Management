import React from 'react';
import DictionaryRow from './DictionaryRow';
import './Dictionary.css';

const deleteRowInDict = (idDict, func) => {
    return function(idRow){
        func(idDict, idRow);
    }
};

const Dictionary = (props) => {
    console.log('dictionary', props)
    const { id, addRow, deleteDictionary, deleteRow, rows, updateRow } = props;
    console.log('IDS', id, rows)
    return (
        <li className='Dictionary'>
            <div className='Dictionary-RowsContainer'>
                {rows.map(row =>
                    <DictionaryRow
                        key={row.id}
                        id={row.id}
                        domain={row.domain}
                        range={row.range}
                        deleteRow={deleteRowInDict(id, deleteRow)}
                        updateRow={updateRow}
                    />
                )}
            </div>
            <button onClick={() => addRow(id, { domain: '', range: '' })}>Add Row</button>
            <button onClick={() => deleteDictionary(id)}>Delete Dictionary</button>
        </li>
    )
};

export default Dictionary;