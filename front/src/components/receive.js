import React from 'react';
import { Modal, Button } from 'antd';
import styled from 'styled-components';
// import ModalImage from 'react-modal-image';

import '../style.css';
import '../sendStyle.css';
import axios from "axios";

const Img = styled.img`
    width:100%;
`;
function countDown(secondsToGo, img) {
    let pic = `https://api.snapchat.wac.epitech.eu/snap/${img}`;
    const modal = Modal.success({
        title:  `${secondsToGo}` ,
        content: <Img src={pic}/>,
        onOk : () => { axios.post(`https://api.snapchat.wac.epitech.eu/seen`, { id :img}, {headers: {
                token: this.token  }}).then( (pouet) =>
            window.location.reload()
        ).catch( error => console.log(error))}
    });
    const timer = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
            title: `${secondsToGo}`,
        });
    }, 1000);
    setTimeout(() => {
        clearInterval(timer);
        modal.destroy();
        axios.post(`https://api.snapchat.wac.epitech.eu/seen`, { id :img}, {headers: {
                token: this.token  }}).then( (pouet) =>
            window.location.reload()
        ).catch( error => console.log(error))
    }, secondsToGo * 1000);
}

export default class register extends React.Component{
    state = {
        snaps: [],
    };
    token = localStorage.getItem('loggedin');

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

    componentDidMount() {
        axios.get(`https://api.snapchat.wac.epitech.eu/snaps`, {headers: {
                token: this.token  }}).then(res => {
            this.setState({snaps: res.data.data})
        })
    };

    render() {
        return (
            <div id="block">
                <div className="container receive">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5">
                                <div className="card-body">
                                    <h5 className="card-title text-center">Check your fox</h5>
                                    <div className="scrolling">
                                        {/*start scroll */}
                                        {this.state.snaps.map( (snap) =>
                                                <Button className="scroll" onClick={countDown.bind(this, snap.duration, snap.snap_id)} key={snap.snap_id}> {snap.from} ||  {snap.duration}seconds </Button>
                                            )}
                                    {/*end scroll*/}
                                    </div>
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