import React,{Component} from 'react';
import "./index.less";
import logo from'../../assets/images/logo.png';
import {Link,withRouter} from 'react-router-dom';
import { Menu, Icon } from 'antd';
import MenuList from '../../pages/config/menuConfig';
const { SubMenu } = Menu;
 class LeftNev extends Component{
    getMenuNode_map=(MenuList)=>{
        return MenuList.map(item=>{
                console.log(item);
                if(!item.children){
                    return (
                        <Menu.Item key={item.key}>
                            <Link to={item.key}>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    )
                }else{
                    return(
                        <SubMenu
                            key={item.key}
                            title={
                                <span>
                                    <Icon type={item.icon} />
                                    <span>{item.title}</span>
                                </span>
                            }
                        >
                            {
                                this.getMenuNode(item.children)
                            }
                        </SubMenu>
                    )
                }
            }
        )
    };
    getMenuNode=(MenuList)=>{
        let path=this.props.location.pathname;
        //console.log('render()',path);
      return MenuList.reduce((pre,item)=>{
            if(!item.children){
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ))
            }else{
                const citem=item.children.find(citem=>citem.key===path);

                if(citem){
                    this.openkey=item.key;
                    console.log('citem',this.openkey);
                }
                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                    <Icon type={item.icon} />
                                    <span>{item.title}</span>
                                </span>
                        }
                    >
                        {
                            this.getMenuNode(item.children)
                        }
                    </SubMenu>
                ))
            }
            return pre;
      },[]);
    };
    componentWillMount(){
        this.muenNodes=this.getMenuNode(MenuList);
    }
    render(){
        const muenNodes=this.getMenuNode(MenuList);
        let path=this.props.location.pathname;
        //console.log('render()',path);
        const openKey=this.openkey;
        console.log(openKey);
        return (
            <div className="left-nev">
                <Link to='/' className="left-nev-header">
                    <img src={logo} alt="logo"/>
                    <h1>
                        上海电气设计
                    </h1>
                </Link>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                >
                    {
                        muenNodes
                    }
                </Menu>
                {/*<Menu.Item key="home">
                        <Link to='./home'>
                            <Icon type="pie-chart" />
                            <span>首页</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="mail" />
                                <span>商品</span>
                            </span>
                        }
                    >
                        <Menu.Item key="category">
                            <Link to='./category'>
                                <span>
                                    <Icon type="mail" />
                                    <span>分类管理</span>
                                </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="product">
                            <Link to='./product'>
                                <span>
                                    <Icon type="mail" />
                                    <span>产品管理</span>
                                </span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>

                    <Menu.Item key="role">
                        <Link to='./role'>
                                <span>
                                    <Icon type="mail" />
                                    <span>角色管理</span>
                                </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="user">
                        <Link to='./user'>
                                <span>
                                    <Icon type="mail" />
                                    <span>用户管理</span>
                                </span>
                        </Link>
                    </Menu.Item>*/}
            </div>
        )
    }
}
export default withRouter(LeftNev)