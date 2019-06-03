import React from 'react';
import axios from 'axios';
import Slider from '@material-ui/lab/Slider';
import Select, { components } from 'react-select';
import Typography from '@material-ui/core/Typography';

import '../style.css';
import '../sendStyle.css';

export default class register extends React.Component{
    state = {
        value: 1,
        users: [],
        picked : '',
        image : '',
    };
    token = localStorage.getItem('loggedin');

    SelectContainer = ({ children, ...props }) => {
        return (
            <components.SelectContainer {...props}>
                {children}
            </components.SelectContainer>
        );
    };
    handleChange = (event, value) => {
        this.setState({ value });
    };

    logoff() {
        localStorage.removeItem('loggedin');
        window.location.reload();
    }
    send() {
        this.props.history.push(`/send`);
    }
    home() {
        this.props.history.push(`/`);
    }

    onChange(e){
        let files = e.target.files;
        // console.log(files[0])
        this.setState({image: files[0]})
        console.log(this.state.image)
    }
    componentDidMount() {
        axios.get(`https://api.snapchat.wac.epitech.eu/all`, {headers: {
              token: this.token  }}).then(res => {
                  for ( let i = 0 ; i < res.data.data.length ; i++) {
                      res.data.data[i].value = res.data.data[i].email;
                      res.data.data[i].label = res.data.data[i].email;
                  }
            this.setState({users: res.data.data})
        })
    };

    add = (event) =>
    {

        let bodyFormData = new FormData();
        bodyFormData.append('duration', this.state.value);
        bodyFormData.append('to', this.state.picked);
        bodyFormData.append('image', this.state.image, this.state.image.name);
        console.log(this.token)
        axios.post('https://api.snapchat.wac.epitech.eu/snap',bodyFormData, { headers: {'Content-Type': 'multipart/form-data', 'token': this.token}} )
            .then(function (response) {
                window.location.href = '/';
                console.log(response);
            })
            .catch(function (response) {
                if (JSON.stringify(response).indexOf('"status":500') === -1){
                    localStorage.removeItem('loggedin');
                }
                window.location.reload();
                console.log('err',response);
                console.log(JSON.stringify(response).indexOf('"status":500'))
            });
        event.preventDefault();
    };

    render() {
        // const { value } = this.state.value;
        return (
            <div id='block'>
            <div className="container sendingback">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Send a fox</h5>
                                <form methode="post" className="form-signin" onSubmit={this.add.bind(this)}>
                                    <div id="slid">
                                        <Slider
                                                    value={this.state.value}
                                                aria-labelledby="label"
                                                    min={1}
                                                    max={60}
                                                    step={1}
                                                    onChange={this.handleChange}
                                        />
                                        <Typography id="label">{this.state.value}</Typography>
                                    </div>

                                    <Select
                                        name="email"
                                        closeMenuOnSelect={false}
                                        components={ this.SelectContainer }
                                        options={this.state.users}
                                        onChange={(picked) => this.setState({picked : picked.email})}
                                    />

                                        <label htmlFor="click" className="btn btn-grad btn-lg btn-block btn-login selecting">Select
                                            your fox</label>
                                        <input type="file" name="image" id="click" className="input-file"
                                               accept="image/x-png,image/gif,image/jpeg"
                                               onChange={(e)=>this.onChange(e)}
                                               // onChange={this.stock.bind(this)}
                                            />
                                            <button
                                                className="btn btn-lg btn-grad  btn-block btn-login text-uppercase font-weight-bold mb-2"
                                                type="submit"><i className="far fa-paper-plane"></i>
                                            </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <footer>
                    <div id="footerlog">
                        <button
                            onClick={this.logoff.bind(this)}
                            className="btn btn-lg btn-grad  btn-block btn-login text-uppercase font-weight-bold mb-2 logout">
                            <i className="fas fa-power-off"></i>
                        </button>
                    </div>
                    <div id="footerhome">
                        <button
                            onClick={this.home.bind(this)}
                            className="btn btn-lg btn-grad  btn-block btn-login text-uppercase font-weight-bold mb-2 logout">
                            <i className="fas fa-igloo"></i>
                        </button>
                    </div>
                    <div id="footersend">
                        <button
                            onClick={this.send.bind(this)}
                            className="btn btn-lg btn-grad  btn-block btn-login text-uppercase font-weight-bold mb-2 logout">
                            <i className="fas fa-envelope-open-text"></i>
                        </button>
                    </div>
                </footer>
            </div>
            </div>
        )
    }
}