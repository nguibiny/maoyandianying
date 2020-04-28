import React, { Component } from 'react';
import axios from "axios";
import img1 from './../assets/img/fanhui.png'
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }
    handleChangename(event) {
        const username = event.target.value;
        this.setState({ username })
    }
    handleChangepwd(event) {
        const password = event.target.value;
        this.setState({ password })
    }

    up() {
        axios.post("/api/zhuce", {
            username: this.state.username,
            password: this.state.password
        }).then(result => {
            // console.log(result)
            if (result.data.ok === "1") {
                alert("注册成功")
                window.location.href = "http://localhost:3000/login"
            }
        })

    }

    backClick() {
        this.props.history.go(-1)
    }
    render() {
        return (
            <div className="denglu">
                <div className="dlhead">
                    <img src={img1} alt="" onTouchStart={this.backClick.bind(this)} />
                    <p>猫眼电影</p>
                </div>
                <div className="gbvip">VIP注册</div>
                <input type="text" value={this.state.username} onChange={this.handleChangename.bind(this)} placeholder="请输入注册的用户名" /><br />
                <input type='password' value={this.state.password} onChange={this.handleChangepwd.bind(this)} placeholder="请输入你的密码" />
                <input className="dl" type='submit' value="注册" onClick={this.up.bind(this)} /><br />
            </div >
        )
    }
}