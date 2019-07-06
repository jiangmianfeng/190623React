import React,{Component} from 'react';
import {Modal} from 'antd';
import {withRouter} from'react-router-dom';

import "./index.less";
import LinkButton from '../link-button/index';
import {formateDate} from "../../utils/dateUtils";
import memoryUtils from '../../utils/memoryUtils';
import {reqWeather} from "../../api/index";
import storageUtils from'../../utils/storageUtils';
import MenuList from '../../pages/config/menuConfig';

class Head extends Component{
    state={
        currentTime:formateDate(Date.now()),
        dayPictureUrl:'',
        weather:''
    };
    getTime=()=>{
        this.intervalId=setInterval(()=>{
            const currentTime=formateDate(Date.now());
            this.setState({currentTime})
        },1000)
    };
    getWeather=async ()=>{
        const{dayPictureUrl,weather}=await reqWeather('','南京');
        this.setState({dayPictureUrl,weather})
    };
    logout=()=>{
        Modal.confirm({
            title: '你确定要删除吗?',
            onOk:()=> {
                console.log('OK',this);
                storageUtils.removeUser();
                memoryUtils.user={};
                this.props.history.replace('/');
            }
        })
    };
    getTitle(){
        const path=this.props.location.pathname;
        let title;
        MenuList.forEach(item=>{
            if(item.key===path){
                title=item.title;
            }else if(item.children){
                const cItem=item.children.find(cItem=>path.indexOf(cItem.key)===0);
                if(cItem){
                    title=cItem.title;
                }
            }
        })
        return title;
    }
    componentDidMount(){
        this.getTime();
        this.getWeather();
    }
    componentWillUnmount(){
        clearInterval(this.intervalId);
    }
    render(){
        //debugger;
        const username=memoryUtils.user.username;
        const {currentTime,dayPictureUrl,weather}=this.state;
        const title=this.getTitle();
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{username}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="weather"/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Head);