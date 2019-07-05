import React,{Component} from 'react';
import "./index.less";
import {formateDate} from "../../utils/dateUtils";
import memoryUtils from '../../utils/memoryUtils';
import {reqWeather} from "../../api/index";
export default class Head extends Component{
    state={
        currentTime:formateDate(Date.now()),
        dayPictureUrl:'',
        weather:''
    };
    componentDidMount(){
        this.getTime();
        this.getWeather();
    }
    getTime=()=>{
        setInterval(()=>{
            const currentTime=formateDate(Date.now());
            this.setState({currentTime})
        },1000)
    };
    getWeather=async ()=>{
        const{dayPictureUrl,weather}=await reqWeather('','南京');
        this.setState({dayPictureUrl,weather})
    };
    render(){
        //debugger;
        const username=memoryUtils.user.username;
        const {currentTime,dayPictureUrl,weather}=this.state;
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{username}</span>
                    <a href="#">退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        首页
                    </div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl}/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}