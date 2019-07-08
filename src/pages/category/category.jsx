import React,{Component} from 'react';
import {
    Card,
    Table,
    Button,
    Icon,
    message,
    Modal
    } from 'antd';

import LinkButton from "../../components/link-button/index";
import {reqAddCategory, reqCategorys, reqUpdategory} from '../../api/index';
import AddForm from './add-form';
import UpdateForm from './update-form';

export default class Category extends Component{
    state={
        loading:false,
        categorys:[],
        subCategorys:[],
        parentId:'0',
        parentName:'',
        showState:'0'
    };
    getCategory=async (parentId)=>{
      this.setState({loading:true});
      parentId=parentId||this.state.parentId;
      const res=await reqCategorys(parentId);
      this.setState({loading:false});
      const result=res.data;
      const categorys=result.data;
      console.log(categorys);
      if(result.status===0){
          if(parentId==='0'){
              // 更新一级分类状态
              this.setState({
                  categorys:categorys
              })
          }else{
              // 更新二级分类状态
              this.setState({
                  subCategorys:categorys
              })
          }
      }else{
          message.error('获取分类列表失败')
      }
    };
    initColumns=()=>{
        this.columns = [
            {
                title: '产品名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                render: (categaory) =>(
                    <span>
                        <LinkButton onClick={()=>this.showUpdateCategory(categaory)}>
                            修改分类
                        </LinkButton>
                        {
                            this.state.parentId==='0'
                                ?<LinkButton
                                    onClick={()=>this.showSubCategate(categaory)}
                                >
                                    查看子分类
                                </LinkButton>:null
                        }
                    </span>
                )
            }
        ];
    };
    showCategory=()=>{
      this.setState({
          parentId:'0',
          parentName:'',
          subCategorys:[]
      })
    };
    showSubCategate=(categaory)=>{
        this.setState({
            parentId:categaory._id,
            parentName:categaory.name
        },()=>{
            console.log(this.state.parentId);
            this.getCategory();
        })
    };
    addCategory=()=>{
        this.form.validateFields(async(err,values)=>{
            if(!err){
                this.setState({
                    showState:'0'
                });
                const {categoryName,parentId}=values;
                this.form.resetFields();
                const res=await reqAddCategory(parentId,categoryName);
                const result=res.data;
                console.log(result.status);
                if(result.status===0){
                    if(parentId===this.state.parentId){
                        this.getCategory();
                    }else if(parentId==='0'){ // 在二级分类列表下添加一级分类, 重新获取一级分类列表, 但不需要显示一级列表
                        this.getCategory('0');
                    }
                }
            }
        })
    };
    updateCategory=()=>{
        this.form.validateFields(async(err,values)=>{
            if(!err){
                // 1. 隐藏确定框
                this.setState({
                    showState:'0'
                });
                const categoryId=this.category._id;
                const {categoryName}=values;
                this.form.resetFields();//清空数据
                // 2. 发请求更新分类
                const res=await reqUpdategory({categoryId,categoryName});
                const result=res.data;
                console.log('result',result);
                if(result.status===0){
                    // 3. 重新显示列表
                    this.getCategory();
                }
            }
        })
    };
    showAddCategory=()=>{
        this.setState({
            showState:'1'
        })
    };
    showUpdateCategory=(categaory)=>{
        this.category=categaory;
        this.setState({
            showState:'2'
        })
    };
    handleCancel=()=>{
      this.setState({
          showState:'0'
      })
    };
    componentWillMount(){
        this.initColumns();
    }
    componentDidMount(){
        this.getCategory();
    }
    render(){
        const {categorys,loading,parentId,parentName,subCategorys,showState}=this.state;
        const category=this.category||{};
        const title=parentId==='0'?'产品列表':(
            <span>
                <LinkButton onClick={this.showCategory}>产品列表</LinkButton>
                <Icon type='arrow-right' style={{margin:5}}/>
                <span>{parentName}</span>
            </span>
        );
        const extra=(
            <Button type='primary' onClick={this.showAddCategory}>
              <Icon type='plus'/>
              添加
            </Button>
        );
        return(
            <Card
                title={title}
                extra={extra}
            >
                <Table
                    dataSource={parentId==='0'?categorys:subCategorys}
                    columns={this.columns}
                    bordered={true}
                    rowKey='_id'
                    loading={loading}
                    pagination={{defaultPageSize:5,showQuickJumper:true}}
                />
                <Modal
                    title="添加分类"
                    visible={showState==='1'}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                >
                    <AddForm
                        categorys={categorys}
                        parentId={parentId}
                        setForm={(form)=>{this.form=form}}
                    />
                </Modal>
                <Modal
                    title="更新分类"
                    visible={showState==='2'}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                >
                    <UpdateForm
                        categoryName={category.name}
                        setForm={(form)=>{this.form=form}}
                    />
                </Modal>
            </Card>
        )
    }
}