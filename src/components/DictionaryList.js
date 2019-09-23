import React from 'react';
import Dictionary from './Dictionary';
import './DictionaryList.css';

const DictionaryList = ({ dictionaries, actions }) => {
    console.log('dictionaries', dictionaries)
    return (
    
    <div className='DictionaryList'>
        <ul>
            {dictionaries.map(dictionary =>
                <Dictionary
                    key={dictionary.id}
                    {...dictionary}
                    {...actions}
                />
            )}
        </ul>
        <button onClick={() => actions.addDictionary()}>Add Dictionary</button>
    </div>
)};

export default DictionaryList;