import React from 'react';
import axios from 'axios';
import '../style.css';

export default class register extends React.Component{

    value = (event) => {
         if (event.target.name === 'email')
            this.setState({email: event.target.value });
        else if (event.target.name === 'password')
            this.setState({password: event.target.value });
    };
    add = (event) =>
    {
        // console.log(this.state);
        axios.post('https://api.snapchat.wac.epitech.eu/inscription', {
            email: this.state.email,
            password: this.state.password,
        } ).then(res => {
        // console.log(res.data.data);
        this.props.history.push(`/`);
    }).catch(err => {
        this.prop.history.push(`/register`)
        })
        event.preventDefault();
    }

    render() {
        return (
            <div className="container-fluid background">
                <div className="row no-gutter">
                    <div className="col-md-8 col-lg-6">
                        <div className="login d-flex align-items-center py-5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-9 col-lg-8 mx-auto">
                                        <h3 className="login-heading mb-5">Sign Up</h3>
                                        <form id="Login" method="post" onSubmit={this.add.bind(this)}>
                                            <div className="form-label-group">
                                                <input id="inputEmail" name="email" className="form-control"
                                                       placeholder="Email or Username" required autoFocus onChange={this.value.bind(this)}/>
                                                    <label htmlFor="inputEmail">Email</label>
                                            </div>
                                            <div className="form-label-group">
                                                <input type="password" id="inputPassword" name="password" className="form-control"
                                                       placeholder="Password" required onChange={this.value.bind(this)}/>
                                                    <label htmlFor="inputPassword">Password</label>
                                            </div>
                                            <button
                                                className="btn btn-lg btn-grad  btn-block btn-login text-uppercase font-weight-bold mb-2"
                                                type="submit">Sign Up
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
