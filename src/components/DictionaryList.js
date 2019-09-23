import React from 'react';
import Dictionary from './Dictionary';
import './DictionaryList.css';

const DictionaryList = ({ dictionaries, actions }) => {
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
        <button onClick={() => actions.addDictionary()} className='btn' title="Add Dictionary"><i className="fas fa-plus-circle"></i></button>
    </div>
)};

export default DictionaryList;