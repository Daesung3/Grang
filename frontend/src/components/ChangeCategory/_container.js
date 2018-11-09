import React, { Component } from 'react';
import ChangeCategory from './presenter';


class Container extends Component {
    componentDidMount() {
        const getCategory = this.props.getCategory
        getCategory();
    }
    render() {
        const { changeCategory } =this.props.changeCategory
     return <ChangeCategory category={this.props.category} onSubmit={changeCategory} />
    }
}

export default Container;