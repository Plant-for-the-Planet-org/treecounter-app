import React, {Component} from 'react'
import LoginSchema from '../../layouts/loginSchema'
import { login } from '../../actions/authActions'
import { connect } from 'react-redux'
import LoadingIndicator from '../Common/LoadingIndicator'
import { bindActionCreators } from 'redux'
import Form from '../Common/Form'
import LoginFooter from './LoginFooter'


class Login extends Component {
    constructor() {
        super();
        localStorage.clear();
        this.state = {
            schema: {},
            loading: true,
        }
    }
    componentDidMount() {
                LoginSchema.subscribe( success => this.setState({schema: success, loading: false}), error => console.log(error));
    }
    render() {
        return this.state.loading ? <div className="center-wrapper" >
            <LoadingIndicator />
          </div> : <div>
            <h2 className="cs-heading">Log In</h2>
            <Form schema={this.state.schema} onSubmit={this.props.login}  buttonText="Log In" buttonWidth="240" />}
            <LoginFooter />
          </div>;
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ login }, dispatch);
}


export default connect(null, mapDispatchToProps)(Login);
