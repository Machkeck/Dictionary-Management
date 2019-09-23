import React from 'react';
import DictionaryRowText from './DictionaryRowText';
import './DictionaryRow.css';

export default class DictionaryRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = { editingDomain: this.props.domain !== '' ? false : true, editingRange: false, isDomainNew: true, isRangeNew: true};
    }

    handleDoubleClickD = () => {
        this.setState({ editingDomain: true })
    }

    handleDoubleClickR = () => {
        this.setState({ editingRange: true })
    }

    handleSave = (id, text, type=true) => {
        if (text.domain.length === 0 || (text.range.length === 0) && !this.state.isRangeNew) {
            this.props.deleteRow(id)
        } else {
            this.props.updateRow(id, text)
        }
        if (type && this.state.isDomainNew) {
            this.setState({ editingRange: true, editingDomain: false, isDomainNew: false })
        } else {
            this.setState({ editingRange: false, editingDomain: false, isRangeNew: false })
        }
    }

    render() {
        const { id, domain, range, deleteRow, updateRow, error} = this.props;

        let domainElement, rangeElement;
        if (this.state.editingDomain) {
            domainElement = (
                <DictionaryRowText text={domain}
                    editing={this.state.editingDomain}
                    onSave={(text) => this.handleSave(id, {domain: text, range:range})} />);
        } else {
            domainElement = (
                <div className='DictionaryRow-Domain' onDoubleClick={this.handleDoubleClickD}>
                    <label>
                        {domain}
                    </label>
                </div>
            );
        }

        if (this.state.editingRange) {
            rangeElement = (
                <DictionaryRowText text={range}
                    editing={this.state.editingRange}
                    onSave={(text) => this.handleSave(id, {domain: domain, range:text}, false)} />);
        } else {
            rangeElement = (
                <div className='DictionaryRow-Range' onDoubleClick={this.handleDoubleClickR}>
                    <label>
                        {range}
                    </label>
                </div>
            );
        }

        return (
            <div className='DictionaryRow'>
                    {domainElement}
                    {rangeElement}
                    {error != null ? <i className="fas fa-exclamation-circle" title={error}></i> : <div style={{width:'16px'}}></div>}
                    <button onClick={() => deleteRow(id)} className="btn delete" title="Delete Row"><i className="fas fa-backspace"></i></button>
            </div>
        );
    }
}; 