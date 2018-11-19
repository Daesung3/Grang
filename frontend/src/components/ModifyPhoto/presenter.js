import React, { Component } from "react";
import styles from "./styles.scss";

class ModifyPhoto extends Component {
  state = {
    location: "",
    caption: "",
    category: "",
    file: ""
  };
  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const formData = new FormData();

    Object.keys(this.state).forEach(key => {
      formData.append(key, this.state[key]);
    });
    onSubmit(formData);
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleChangeFile = ({ target: { name, files } }) => {
    this.setState({ [name]: files[0] });
  };

  render() {
    const { getPhoto } = this.props;
    const { getDetails } = this.props;
    return (
      <div className={styles.addPhoto}>
        {console.log(getPhoto)}
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <input
            className={styles.textInput}
            type="text"
            placeholder={this.props.caption}
            name="location"
            onChange={this.handleChange}
          />
          <input
            className={styles.textInput}
            type="text"
            placeholder="caption"
            name="caption"
            onChange={this.handleChange}
          />
          <input
            className={styles.textInput}
            type="text"
            placeholder="category"
            name="category"
            onChange={this.handleChange}
          />
          <input
            className={styles.textInput}
            id={styles.file}
            type="file"
            name="file"
            onChange={this.handleChangeFile}
          />
          <button>게시물 올리기</button>
        </form>
      </div>
    );
  }
}

export default ModifyPhoto;
