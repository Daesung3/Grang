import React, { Component } from "react";
import Auth from "./presenter";

class AddPhoto extends Component {
  state = {
    'location' : '',
    caption: '',
    category: '',
    image: '',
  }
  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const formData = new FormData();

    Object.keys(this.state).forEach(key => {
      formData.append(key, this.state[key]);
    });
    onSubmit(formData);
  }

  handleChange = ({ target : { value, name } }) => {
    this.setState({ [name]: value })
  }
  render() {
    return (
      <div className="AddPhoto">
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="location" name='location' />
          <input type="text" placeholder="caption" name='cation' />
          <input type="text" placeholder="category" name='category' />
          <input type="text" placeholder="tag" name='tag' />
          <input type="file" name='file' />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default AddPhoto;
