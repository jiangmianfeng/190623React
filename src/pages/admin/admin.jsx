import React,{Component} from 'react';
import memoryUtils from '../../utils/memoryUtils';
import {Redirect,Switch,Route} from 'react-router-dom';
import { Layout } from 'antd';
import LeftNev from'../../components/left-nev';
import Head from '../../components/header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../chart/bar'
import Line from '../chart/line'
import Pie from '../chart/pie'

const { Header, Footer, Sider, Content } = Layout;
export default class Admin extends Component{
    render(){
        const user=memoryUtils.user;
        if(!user||!user._id){
           return <Redirect to='/login'/>
        }
        return (
            <Layout style={{height: '100%'}}>
                <Sider>
                    <LeftNev/>
                </Sider>
                <Layout>
                    <Header style={{height:80,backgroundColor: '#cccccc'}}>
                        <Head/>
                    </Header>
                    <Content style={{backgroundColor:'#fff'}}>
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/user' component={User}/>
                            <Route path='/role' component={Role}/>
                            <Route path="/chart/bar" component={Bar}/>
                            <Route path="/chart/pie" component={Pie}/>
                            <Route path="/chart/line" component={Line}/>
                            <Redirect from='/' exact to='/home'/>
                        </Switch>
                    </Content>
                    <Footer style={{color:'#cccccc',textAlign:'center'}}>
                        推荐使用谷歌浏览器，可以获得更佳页面操作体验
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}