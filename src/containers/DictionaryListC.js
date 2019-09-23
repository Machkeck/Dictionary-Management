import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as DictActions from '../actions';
import DictionaryList from '../components/DictionaryList';

const mapStateToProps = state => ({
    dictionaries: state.dictionaries
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(DictActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DictionaryList);