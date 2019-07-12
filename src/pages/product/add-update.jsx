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
        this.props.form.validateFields((error,values)=>{
           if(!error){
               console.log(values,'submit');
           }
        });
    };
    loadData = async(selectedOptions) => {
        const targetOption = selectedOptions[0];
        targetOption.loading = true;
        const subCategorys=await this.getCategory(targetOption.value);
        targetOption.loading = false;
        if(subCategorys&&subCategorys.length>0){
            const childOptions=subCategorys.map(m=>({
                value:m._id,
                label: m.name,
                isLeaf: true,
            }))
            targetOption.children=childOptions;
        }else{
            targetOption.isLeaf=true;
        }

        this.setState({
            options: [...this.state.options],
        });
    };
    getCategory=async (parentId)=>{
        const res=await reqCategorys(parentId);
        const result=res.data;
        if(result.status===0){
            const categorys=result.data;
            if(parentId==='0'){
                this.initOptions(categorys);
            }else{
                return categorys
            }
        }
    };
    initOptions=async (categorys)=>{
        const options=categorys.map((m)=>({
            value:m._id,
            label: m.name,
            isLeaf: false,
        }));
        const {isUpdate,product}=this;
        const {pCategoryId}=product;
        if(isUpdate&&pCategoryId!=='0'){
            const subCategorys=await this.getCategory(pCategoryId);
            const childOptions=subCategorys.map(m=>({
                value:m._id,
                label: m.name,
                isLeaf: true,
            }));
            const targetOption=options.find(option=>option.value===pCategoryId);
            targetOption.children=childOptions;
        }
        this.setState({
            options:options
        })
    };
    componentDidMount(){
        this.getCategory('0');
    }
    componentWillMount(){
        const product=this.props.location.state;
        this.isUpdate=!!product;
        this.product=product||{};
    }
    render(){
        const {isUpdate,product}=this;
        const{pCategoryId,categoryId}=product;
        const title=(
            <span>
                <LinkButton onClick={()=>this.props.history.goBack()}>
                    <Icon type='arrow-left' style={{fontSize:20}}/>
                </LinkButton>
                <span>{isUpdate?'修改商品':"添加商品"}</span>
            </span>
        );
        const category=[];
        if(isUpdate){
            if(pCategoryId==='0'){
                category.push(categoryId);
            }else{
                category.push(pCategoryId);
                category.push(categoryId);
            }
        }
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
                                initialValue: product.name,
                                rules: [
                                    {required: true, message: '必须输入商品名称'}
                                ]
                            })(<Input placeholder='请输入商品名称'/>)
                        }
                    </Item>
                    <Item label="商品描述">
                        {
                            getFieldDecorator('desc',{
                                initialValue:product.desc,
                                rules:[
                                    {required:true,message:"必须输入商品描述"}
                                ]
                            })(<TextArea placeholder="请输入商品描述"/>)
                        }
                    </Item>
                    <Item label="商品价格">
                        {
                            getFieldDecorator('price',{
                                initialValue:product.price,
                                rules:[
                                    {required:true,message:"必须输入商品价格"},
                                    {validate:this.validatePrice}
                                ]
                            })(<Input type='number' addonAfter='元' placeholder="请输入商品价格"/>)
                        }
                    </Item>
                    <Item label="商品分类">
                        {
                            getFieldDecorator('category',{
                                initialValue:category,
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