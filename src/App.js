import React from 'react';
import axios from 'axios';
import './style.css';

class App extends React.Component {
  state = {
    selectedFile: []
  }
  
  onChangeHandler = (e) => {
    this.setState({selectedFile: e.target.files})
  }

  onClickHandler = () => {
    const data = new FormData() 
    data.append('file', this.state.selectedFile)
    axios.post("http://localhost:4000/uploadfile", data)
      .then(res => { 
        console.log(res.data)
      })
  }

  render(){
    console.log(this.state)
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-12 text-center my-3">
              <h1 className="">UploadFile</h1>
          </div>
          <div className="offset-3 col-6">
            <div className="form-group files">
              <input type="file" name="file" multiple className="form-control" onChange={this.onChangeHandler}/>  
            </div>  
            <div className="offset-3 col-6 text-center my-3">
              <button type="button" className="btn btn-primary btn-block" onClick={this.onClickHandler}>Upload</button>
            </div>
          </div>  
        </div>
      </div>
    );
  }
}

export default App;
