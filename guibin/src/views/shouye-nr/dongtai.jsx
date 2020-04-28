import React, { Component } from 'react';
// import { Route } from "react-router-dom";
import axios from "axios";
import {
    Link
} from "react-router-dom";
export default class Dongtai extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    getData() {
        axios.get('https://show.maoyan.com/maoyansh/myshow/ajax/celebrityBasicList/query?uuid=roiko945i99vw31cj63jhvuxstoyzatqk0k882secc4o7otzzalbos2kpv1nk21r&clientType=1&os=1&sellChannel=13&cityId=1&lng=0&lat=0')
            .then((res) => {
                this.setState({
                    data: res.data.data
                })
                // console.log(this.state.data)

            })
    }

    componentDidMount() {
        this.getData();

    }


    render() {

        // console.log(this.state.data)
        return (
            <div className="dongtai"  >
                <h3>大咖新动态</h3>
                < ul >
                    {this.state.data.map((item, i) => {
                        return (
                            // <li key={item.id}><a href={"/" + item.celebrityId}><img src={item.headUrl} /><p>{item.celebrityName}</p><p>{item.recommendTag}</p></a></li>
                            <li key={item.id}>
                                <Link to={{ pathname: `/zhuye/${item.id}`, state: { name: item.celebrityId } }}>
                                    <img src={item.headUrl} alt="" /><p>{item.celebrityName}</p><p>{item.recommendTag}</p>
                                </Link>
                            </li>
                        )
                    })
                    }
                </ul>
            </div >
        )
    }
}