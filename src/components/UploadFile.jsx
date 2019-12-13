import React from "react";
import axios from "axios";
import FlashMessage from "react-flash-message";

class UploadFile extends React.Component {
    state = {
        files: '',
        message: {
            type : '',
            text : ''
        }
    };

    onChangeHandler = e => {
        this.setState({ files: e.target.files });
    };

    onClickHandler = e => {
        e.preventDefault();
        const files = this.state.files
        const data = new FormData();
        for (const key of Object.keys(files)) {
            data.append('file', this.state.files[key])
        }
        axios
            .post("http://localhost:5000/upload/file", data)
            .then(res => {
                console.log('ok')
                this.setState({ message: {
                    type: 'success',
                    text: 'Files uploaded with success'
                }}, () => this.state)
            })
            .catch(error => {
                console.log('error')
                this.setState({ message: {
                    type: 'error',
                    text: 'Error, try again'
                }}, () => this.state)
            });
    };

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12 text-center my-3">
                        <h1 className="">Upload your Files here</h1>
                    </div>
                    <div className="col-12 text-center my-3">
                        <FlashMessage duration={20000} persistOnHover={true}>
                            <p>{this.state.message.type === 'success' ? `${this.state.message.text}` : `${this.state.message.text}`}</p>
                        </FlashMessage>
                    </div>
                </div>
                <form method="POST" encType="multipart/form-data" action="uploadfile">
                    <div className="row">
                        <div className="offset-3 col-6">
                            <div className="form-group files">
                                <input
                                    type="file"
                                    name="file"
                                    multiple
                                    className="form-control"
                                    onChange={this.onChangeHandler}
                                />
                            </div>
                            <div className="offset-3 col-6 text-center my-3">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                    onClick={this.onClickHandler}>
                                    Upload
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default UploadFile;
