import React,{Component} from 'react';
import memoryUtils from '../../utils/memoryUtils';
import {Redirect} from 'react-router-dom';
import { Layout } from 'antd';
import LeftNev from'../../components/left-nev';
import Head from '../../components/header'

const { Header, Footer, Sider, Content } = Layout;
export default class Admin extends Component{
    render(){
        const user=memoryUtils.user;
        if(!user||!user._id){
           return <Redirect to='/login'/>
        }
        return (
            <Layout style={{Height: '100%',backgroundColor:'red'}}>
                <Sider>
                    <LeftNev/>
                </Sider>
                <Layout>
                    <Header>
                        <Head/>
                    </Header>
                    <Content style={{backgroundColor:'#fff'}}>
                        Content
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}