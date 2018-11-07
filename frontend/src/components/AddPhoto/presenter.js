import React, { Component } from "react";
import Auth from "./presenter";

class AddPhoto extends Component {
  state = {
    'location' : '',
    caption: '',
    category: '',
    file: '',
  }
  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const formData = new FormData();

    Object.keys(this.state).forEach(key => {
      console.log(key);
      formData.append(key, this.state[key]);
    });
    onSubmit(formData);
  }

  handleChange = ({ target : { name, value } }) => {
    this.setState({ [name]: value })
  }

  handleChangeFile = ({ target : { name, files } }) => {
    this.setState({ [name]: files[0] })
  }

  render() {
    return (
      <div className="AddPhoto">
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="location" name='location' onChange={this.handleChange}/>
          <input type="text" placeholder="caption" name='caption' onChange={this.handleChange}/>
          <input type="text" placeholder="category" name='category' onChange={this.handleChange}/>
          <input type="file" name='file' onChange={this.handleChangeFile}/>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default AddPhoto;
