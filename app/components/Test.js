import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

//import {followSubscribeAction} from '../actions/followSubscribeAction'
//import {followUnSubscribeAction} from '../actions/followUnSubscribeAction'
//import {setUserLogOut} from '../reducers/authenticationReducer'

import {treecounterLookupAction} from '../actions/treecounterLookupAction'

import PublicTreeCounter from '../components/PublicTreeCounter/PublicTreeCounter'

class Test extends React.Component {

  constructor(props) {
    super(props)
    console.log('###### Test')

    this.state = {
      treecounter: {}
    }

//    this.handleClick = this.handleClick.bind(this)
  }

  // handleClick() {
  //   console.log('clicked')
  //   //this.props.dispatch(setUserLogOut());
  //
  //   this.props.dispatch(followUnSubscribeAction(5))
  // }

  componentDidMount() {
    console.log('this.props', this.props)
    this.props.treecounterLookupAction(31)
      .then(treecounter => {
        console.log('############# componentDidMount', treecounter)
        this.setState({treecounter: treecounter})
      })
  }

  render() {
    // return (<div style={{marginLeft: '500px'}}>OK
    //   <a onClick={this.handleClick}>click me</a>
    // </div>)
    const treecounter = this.state.treecounter

    console.log('############# this.state.treecounter: ', treecounter)
    return treecounter.display_name ? (<div className="center-wrapper">
        <PublicTreeCounter treecounter={treecounter}/>
      </div>) :
      (<div>
        undefined
      </div>)
  }
}

Test.propTypes = {
  treecounterLookupAction: PropTypes.func
}

const mapDispatchToProps = dispatch => {
  return {
    treecounterLookupAction: treecounterId => dispatch(treecounterLookupAction(treecounterId))
  }
}

export default connect(null, mapDispatchToProps)(Test)

