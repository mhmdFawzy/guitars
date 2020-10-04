// you have to set your api key and cloud in .env first
import React, { Component } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import CircularProgress from "@material-ui/core/CircularProgress";
export class FileUpload extends Component {
  state = {
    uploadedFiles: [],
    uploading: false,
  };
  // s exists for only one purpose. It enables a component to update its internal state as the result of changes in props.
  static getDerivedStateFromProps(props, state) {
    if (props.reset) {
      return (state = { uploadedFiles: [] });
    }
    return null;
  }
  onDrop = (files) => {
    this.setState({ uploading: true });
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    axios.post("/api/users/uploadimage", formData, config).then((response) => {
      console.log(response.data);

      this.setState(
        {
          uploading: false,
          uploadedFiles: [...this.state.uploadedFiles, response.data],
        },
        () => {
          this.props.imagesHandler(this.state.uploadedFiles);
        }
      );
    });
  };
  onRemove = (id) => {
    axios.get(`/api/users/removeimage?public_id=${id}`).then(() => {
      let images = this.state.uploadedFiles.filter((item) => {
        return item.public_id !== id;
      });
      this.setState(
        {
          uploadedFiles: images,
        },
        () => {
          this.props.imagesHandler(images);
        }
      );
    });
  };
  showUploadedImages = () => {
    if (this.state.uploadedFiles.length > 0) {
      return this.state.uploadedFiles.map((acceptedFile) => (
        <div
          key={acceptedFile.public_id}
          onClick={() => {
            this.onRemove(acceptedFile.public_id);
          }}
          className="dropzone_box"
        >
          <div
            className="wrap"
            style={{
              background: `url(${acceptedFile.url}) no-repeat`,
            }}
          ></div>
        </div>
      ));
    }
  };
  render() {
    return (
      <div>
        <section>
          <div className="dropzone clear">
            <Dropzone onDrop={this.onDrop}>
              {({ getRootProps, getInputProps }) => (
                <div className="dropzone_box">
                  <div className="wrap" {...getRootProps()}>
                    <FontAwesomeIcon icon={faPlusCircle} />
                    <input {...getInputProps()} />
                  </div>
                </div>
              )}
            </Dropzone>
            {this.showUploadedImages()}
            {this.state.uploading ? (
              <div
                className="dropzone_box"
                style={{
                  textAlign: "center",
                  paddingTop: "60px",
                }}
              >
                <CircularProgress style={{ color: "#00bcd4" }} thickness={7} />
              </div>
            ) : null}
          </div>
        </section>
      </div>
    );
  }
}

export default FileUpload;
