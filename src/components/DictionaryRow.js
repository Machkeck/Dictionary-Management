import React from 'react';
import DictionaryRowText from './DictionaryRowText';
import './DictionaryRow.css';

export default class DictionaryRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = { editingDomain: false, editingRange: false };
    }

    state = {
        editing: false
    }

    handleDoubleClickD = () => {
        this.setState({ editingDomain: true })
    }

    handleDoubleClickR = () => {
        this.setState({ editingRange: true })
    }

    handleSave = (id, text) => {
        if (text.length === 0) {
            this.props.deleteRow(id)
        } else {
            this.props.editTodo(id, text)
        }
        this.setState({ editingRange: false, editingDomain: false })
    }

    render() {
        const { id, domain, range, deleteRow, updateRow} = this.props;

        let domainElement, rangeElement;
        if (this.state.editingDomain) {
            domainElement = (
                <DictionaryRowText text={domain}
                    editing={this.state.editing}
                    onSave={(text) => this.handleSave(id, text)} />);
        } else {
            domainElement = (
                <div className='DictionaryRow-Domain'>
                    <label onDoubleClick={this.handleDoubleClick}>
                        {domain}domain
                    </label>
                </div>
            );
        }

        if (this.state.editingRange) {
            rangeElement = (
                <DictionaryRowText text={range}
                    editing={this.state.editing}
                    onSave={(text) => this.handleSave(id, text)} />);
        } else {
            rangeElement = (
                <div className='DictionaryRow-Range'>
                    <label onDoubleClick={this.handleDoubleClick}>
                        {range}range
                    </label>
                </div>
            );
        }

        return (
            <div className='DictionaryRow'>
                    {domainElement}
                    {rangeElement}
                    <button className="destroy" onClick={() => deleteRow(id)} >Delete Row</button>
            </div>
        );
    }
}; 