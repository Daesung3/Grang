import React, { Component } from "react";
import PropTypes from "prop-types";
import DetailFeedPhoto from "./presenter";


class Container extends Component {
    state = {
        loading: true
    };
    static propTypes = {
        getDetail: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { getDetail } = this.props;
        getDetail();
    }

    render() {
        return <DetailFeedPhoto 
        {...this.props}
        {...this.state}
        openDetail={this._openDetail}
        closeDetail={this._closeDetail} 
        />
    }
    _openDetail = () => {
        const { getDetail } = this.props;
        this.setState({
          seeingDetail: true
        });
        getDetail();
      };
      _closeDetail = () => {
        this.setState({
          seeingDetail: false
        });
      };
}

export default Container;