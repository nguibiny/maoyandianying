import React, { Component } from 'react';
// import { Route } from "react-router-dom";
import { Link } from 'react-router-dom';
export default class Fenlei extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }





    render() {
        return (
            <div className="fenlei">
                <ul>
                    <li><Link to={{ pathname: `fenleis/fenlei-2` }}><img src={"https://img.meituan.net/kylisean/b132e8d30be554486b8c909c7d16f7c15282.png"} alt="" /><p>演唱会</p></Link></li>
                    <li><Link to={{ pathname: `fenleis/fenlei-3` }}><img src={"https://img.meituan.net/kylisean/5cc92a5a6bb19618f7d2b31433a2a2f24956.png"} alt="" /><p>话剧歌剧</p></Link></li>
                    <li><Link to={{ pathname: `fenleis/fenlei-4` }}><img src={"https://img.meituan.net/kylisean/2b3d5971c31e8a39e181bd07f3c42d824737.png"} alt="" /><p>休闲展览</p></Link></li>
                    <li><Link to={{ pathname: `fenleis/fenlei-5` }}><img src={"https://img.meituan.net/kylisean/8d6764a0cee35332f44976f84b188c444767.png"} alt="" /><p>戏曲相声</p></Link></li>
                    <li><Link to={{ pathname: `fenleis/fenlei-6` }}><img src={"https://img.meituan.net/kylisean/cce8a904f6489abeff04f9d9555dd77f4052.png"} alt="" /><p>亲子/艺术</p></Link></li>
                </ul>
            </div>
        )
    }
}