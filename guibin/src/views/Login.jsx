import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
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
        axios.post("/api/login", {
            username: this.state.username,
            password: this.state.password
        }).then(result => {
            // console.log(result)
            if (result.data.ok === 1) {
                window.localStorage.setItem("data", "1")
                window.localStorage.setItem("user", result.data.user)
                alert("登陆成功")
                window.location.href = "/"
            } else {
                alert("登陆失败，请重新登陆")
                window.location.href = "/login"
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
                <div className="gbvip">贵宾超级VIP登陆</div>
                <input type="text" value={this.state.username} onChange={this.handleChangename.bind(this)} placeholder="账户名" /><br />
                <input type='password' value={this.state.password} onChange={this.handleChangepwd.bind(this)} placeholder="请输入你的密码" />
                <input className="dl" type='submit' value="登录" onClick={this.up.bind(this)} /><br />
                <Link to={{ pathname: '/zhuce' }} ><p className="zcan">立即注册</p></Link>
                <span>© 猫眼电影 客服电话：<span>666-666-66666</span></span>
            </div >
        )
    }
}