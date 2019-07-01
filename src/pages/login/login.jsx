import React,{Component} from 'react';
import './login.less';
import logo from '../../assets/images/logo.png';
import {
    Form,
    Icon,
    Input,
    Button,
    message
    } from 'antd';
import {reqLogin} from "../../api/index";
import memoryUtils from '../../utils/memoryUtils';
class Login extends Component{
    handleSubmit=(event)=>{
        // 阻止事件的默认行为
        event.preventDefault();
        //方式一
        this.props.form.validateFields(async(err,values)=>{
            if (!err) {
                //console.log("校验成功",values);
                const {username,password}=values;
                const respose=await reqLogin(username,password);
                const result=respose.data;
                if(result.status===0){
                    message.success('登陆成功');
                    const user=result.data;
                    memoryUtils.user=user;
                    this.props.history.replace('/');
                }else{
                    message.error(result.msg);
                }
                //console.log('请求成功',respose.data);
                // try{
                //     const respose=await reqLogin(username,password);
                //     console.log('请求成功',respose.data);
                // }catch(error){
                //     console.log('请求失败',error);
                // }
                // reqLogin(username,password).then(respose=>{
                //     console.log('成功',respose.data);
                // }).catch(error=>{
                //     console.log('失败',error);
                // });
            }else{
                console.log("校验失败");
            }
        });
        //方式二
        // const form =this.props.form;
        // const values=form.getFieldsValue();
        // console.log(values);
    };
    validatorPSW=(rule, value, callback)=>{
        console.log(rule);
        console.log(value);
        if(!value){
            callback("密码必须输入");
        }else if(value.length<5) {
            callback("密码必须大于等于4位");
        }else if(value.length>13){
            callback("密码必须小于等于12位")
        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback("密码必须是英文、数字或下划线组成");
        }else {
          callback();
        }
    };
    render(){
        const form=this.props.form;
        const {getFieldDecorator} = form;
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目：后台管理项目</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {
                                /*
                              用户名/密码的的合法性要求
                                1). 必须输入
                                2). 必须大于等于4位
                                3). 必须小于等于12位
                                4). 必须是英文、数字或下划线组成
                               */
                            }
                            {
                                getFieldDecorator('username',{
                                    rules:[
                                        {required:true,whitespace:true,message:'用户必须输入'},
                                        {min:4,message:'用户至少4位'},
                                        {max:12,message:'用户最多12位'},
                                        {pattern:/^[a-zA-Z0-9_]+$/,message:'必须是英文、数字或下划线组成'}
                                        ]
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Username"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password',{
                                    rules:[{
                                        validator:this.validatorPSW
                                    }]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
/*
1. 高阶函数
    1). 一类特别的函数
        a. 接受函数类型的参数
        b. 返回值是函数
    2). 常见
        a. 定时器: setTimeout()/setInterval()
        b. Promise: Promise(() => {}) then(value => {}, reason => {})
        c. 数组遍历相关的方法: forEach()/filter()/map()/reduce()/find()/findIndex()
        d. 函数对象的bind()
        e. Form.create()() / getFieldDecorator()()
    3). 高阶函数更新动态, 更加具有扩展性

2. 高阶组件
    1). 本质就是一个函数
    2). 接收一个组件(被包装组件), 返回一个新的组件(包装组件), 包装组件会向被包装组件传入特定属性
    3). 作用: 扩展组件的功能
    4). 高阶组件也是高阶函数: 接收一个组件函数, 返回是一个新的组件函数
 */
/*
包装Form组件生成一个新的组件: Form(Login)
新组件会向Form组件传递一个强大的对象属性: form
 */
const WrapLogin=Form.create()(Login);
export default WrapLogin
/*
1. 前台表单验证
2. 收集表单输入数据
 */

/*
async和await
1. 作用?
   简化promise对象的使用: 不用再使用then()来指定成功/失败的回调函数
   以同步编码(没有回调函数了)方式实现异步流程
2. 哪里写await?
    在返回promise的表达式左侧写await: 不想要promise, 想要promise异步执行的成功的value数据
3. 哪里写async?
    await所在函数(最近的)定义的左侧写async
 */