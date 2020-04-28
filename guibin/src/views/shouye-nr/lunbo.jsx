import React, { Component } from 'react';
// import { Route } from "react-router-dom";
export default class Lunbo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listImg: [
                'https://img.meituan.net/kylisean/e6560b4d93f2707aeff471c592809a24110900.png',
                'https://img.meituan.net/kylisean/596c52b93d2c464350c3611a5ac0d51454271.jpg',
                'https://img.meituan.net/kylisean/b0d13b30e0d25e878e029a6601341ae541834.jpg',

            ],
            index: 0
        };
    }


    //计时器执行
    indexChange() {
        if (this.state.index === this.state.listImg.length - 1) {
            this.setState({
                index: 0
            })
        } else {
            // this.state.index++;
            this.setState({
                index: this.state.index + 1
            })
            // console.log(this.state.index);
        }
    }
    componentDidMount() {
        setInterval(() => {
            this.indexChange();
        }, 2000)
    }




    render() {
        let { listImg, index } = this.state;
        let imgList = listImg.map((item, imgIndex) => {
            return <img src={item} key={imgIndex} style={{ 'display': index === imgIndex ? 'block' : 'none' }} className='img' alt="" />
        })
        let liList = listImg.map((item2, imgIndex2) => {
            return <li key={imgIndex2} style={{ 'listStyleType': index === imgIndex2 ? 'initial' : 'circle' }}></li>
        })


        return (
            <div className="lunbos">
                <div className="lunbo">
                    {imgList}
                    <div>
                        <ul>
                            {liList}
                        </ul>
                    </div>
                </div>

            </div>
        )
    }
}