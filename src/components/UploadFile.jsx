import React from "react";
import axios from "axios";
import FlashMessage from 'react-flash-message';

class UploadFile extends React.Component {
    state = {
        files: '',
        message: ''
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
            .then(response => {
                console.log(response.data.success)
                const message = response.data.success
                this.setState({ message: message}, () => this.state)
            })
            .catch(error => {
                console.log(error)
                this.setState({ message: 'Error upload file, try again' })
            });
    };

    render() {
        return (
            <>
                <div className="row">
                    <div className="col-12 text-center my-3">
                        <h1 className="">UploadFile</h1>
                    </div>
                    <div className="col-12 text-center my-3">
                    <FlashMessage duration={10000} persistOnHover={true}>
                        <p>{this.state.message}</p>
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
            </>
        );
    }
}

export default UploadFile;
