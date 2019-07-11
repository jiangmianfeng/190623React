import React,{Component} from'react';
import {
    Card,
    Icon,
    Button,
    Form,
    Input,
    message,
    Cascader
}from 'antd';
import {reqCategorys} from "../../api/index";
import LinkButton from "../../components/link-button/index";
const Item=Form.Item;
const {TextArea}=Input;
class AddUpdateProduct extends Component{
    state={
        options:[]
    };
    validatePrice=(rule,value,callBack)=>{
        if(value*1>0){
            callBack();
        }else{
            message.success('1');
            callBack("价格必须大于0");
        }
    };
    submit=()=>{
        // this.props.form.validateFields(asnyc (error,values)=>{
        //     if(!error){
        //         const {name,desc,price,category}
        //     }
        // });
    };
    loadData = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        setTimeout(() => {
            targetOption.loading = false;
            targetOption.children = [
                {
                    label: `${targetOption.label} Dynamic 1`,
                    value: 'dynamic1',
                },
                {
                    label: `${targetOption.label} Dynamic 2`,
                    value: 'dynamic2',
                },
            ];
            this.setState({
                options: [...this.state.options],
            });
        }, 1000);
    };
    getCategory=async (parentId)=>{
        const res=await reqCategorys(parentId);
        const result=res.data;
        console.log(result,'i');
        if(result.status===0){
            const categorys=result.data;
            this.initOptions(categorys)
        }
    };
    initOptions=(categorys)=>{
        const options=categorys.map((m)=>({
            value:m._id,
            label: m.name,
            isLeaf: false,
        }));
        this.setState({
            options
        })
    };
    componentDidMount(){
        this.getCategory('0');
    }
    render(){
        const title=(
            <span>
                <LinkButton onClick={()=>this.props.history.goBack()}>
                    <Icon type='arrow-left' style={{fontSize:20}}/>
                </LinkButton>
                <span>添加商品</span>
            </span>
        );
        const formItemLayout={
          labelCol:{span:2},
          wrapperCol:{span:8},
        };
        const {getFieldDecorator}=this.props.form;
        return(
            <Card title={title}>
                <Form {...formItemLayout}>
                    <Item label="商品名称">
                        {
                            getFieldDecorator('name', {
                                initialValue: '',
                                rules: [
                                    {required: true, message: '必须输入商品名称'}
                                ]
                            })(<Input placeholder='请输入商品名称'/>)
                        }
                    </Item>
                    <Item label="商品描述">
                        {
                            getFieldDecorator('desc',{
                                initialValue:'',
                                rules:[
                                    {required:true,message:"必须输入商品描述"}
                                ]
                            })(<TextArea placeholder="请输入商品描述"/>)
                        }
                    </Item>
                    <Item label="商品价格">
                        {
                            getFieldDecorator('desc',{
                                initialValue:'',
                                rules:[
                                    {required:true,message:"必须输入商品价格"},
                                    {validate:this.validatePrice}
                                ]
                            })(<Input placeholder="请输入商品价格"/>)
                        }
                    </Item>
                    <Item label="商品分类">
                        {
                            getFieldDecorator('category',{
                                initialValue:[],
                                rules:[
                                    {required:true,message:"必须输入商品分类"}
                                ]
                            })( <Cascader
                                options={this.state.options}
                                loadData={this.loadData}
                            />)
                        }
                    </Item>
                    <Item label="商品图片">
                        <Input />
                    </Item>
                    <Item label="商品详情">
                        <Input />
                    </Item>
                    <Item>
                        <Button type='primary' onClick={this.submit}>
                            提交
                        </Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}
export default Form.create()(AddUpdateProduct);