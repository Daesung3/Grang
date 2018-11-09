import React, { Component } from 'react';
import ChangeCategory from './presenter';


class Container extends Component {
    state = {
        category: ""
    };
    componentDidMount() {
        const getCategory = this.props.getCategory
        getCategory();
    }
    render() {
        const { category } =this.state;
     return <ChangeCategory category={this.props.category} 
            handleInputChange={this._handleInputChange}
            handleSubmit={this._handleSubmit}
            categoryValue={category}  />
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // render이후에, props 또는 state가 바뀔 경우에, 작동함!
        // prevProps는 변화되기 이전의 값을 가지고 있고,
        // this.props는 현재 변화되기 위한 값을 가지고 있음
        if(prevProps.category != this.props.category){
            this.props.history.push('/');
        }

    }
    _handleInputChange = event => {
        const { target: { value, name }} = event;
        this.setState({
            [name]: value
        });
    };
    _handleSubmit = event => {
        const{ changeCategory } = this.props;
        const{ category } = this.state;
        event.preventDefault();
        changeCategory(category);
    };
}

export default Container;