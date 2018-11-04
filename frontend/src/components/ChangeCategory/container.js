import React, { Component } from 'react';
import ChangeCategory from './presenter';


class Container extends Component {
    componentDidMount() {
        const getCategory = this.props.getCategory
        getCategory();
    }
    render() {
     return <ChangeCategory category={this.props.category}/>
    }
}

export default Container;