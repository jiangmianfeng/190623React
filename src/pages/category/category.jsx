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
import {reqCategorys} from '../../api/index';
//import {reqAddCategory} from '../../api/index';
//import {reqUpdategory} from '../../api/index';

export default class Category extends Component{
    state={
        loading:false,
        categorys:[],
        subCategorys:[],
        parentId:'0',
        parentName:'',
        showState:'0'
    };
    getCategory=async ()=>{
      this.setState({loading:true});
      const {parentId}=this.state;
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
                title: '分类的名称',
                dataIndex: 'name',
                key: 'name',
                width:1300,
            },
            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                render: (categaory) =>(
                    <span>
                        <LinkButton onClick={this.showUpdateCategory}>
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

    };
    updateCategory=()=>{

    };
    showAddCategory=()=>{
        this.setState({
            showState:'1'
        })
    };
    showUpdateCategory=()=>{
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
        const title=parentId==='0'?'一级分类列表':(
            <span>
                <LinkButton onClick={this.showCategory}>一级分类列表</LinkButton>
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
                    <p>添加分类</p>
                </Modal>
                <Modal
                    title="更新分类"
                    visible={showState==='2'}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                >
                    <p>更新分类</p>
                </Modal>
            </Card>
        )
    }
}