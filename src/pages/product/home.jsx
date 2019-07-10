import React,{Component} from'react';
import {
    Button,
    Select,
    Input,
    Icon,
    Table,
    Card,
    message
    }from 'antd';
import ButtonLink from'../../components/link-button/index';
import {reqProduct,reqSearchProduct,reqUpdateStatus}from'../../api/index';
import {PAGE_SIZE} from "../../utils/constants";

const Option=Select.Option;
export default class ProductHome extends Component{
    state={
        product:[],
        loading:false,
        total:0,
        searchName:'',
        searchType:'productName'
    };
    componentWillMount(){
        this.initColumns();
    }
    componentDidMount(){
        this.getProduct(1);
    }
    getProduct=async (pageNum)=> {
        this.pageNum = pageNum;
        this.setState({loading: true});
        const {searchName,searchType}=this.state;
        let res;
        if(searchName){
            res = await reqSearchProduct({pageNum,pageSize:PAGE_SIZE,searchName,searchType});
        }else{
            res = await reqProduct(pageNum,PAGE_SIZE);
        }
        this.setState({loading:false});
        const result=res.data;
        const total=result.data.total;
        const list=result.data.list;
        if(result.status===0){
            this.setState({
                product:list,
                total
            })
        }
    };
    updateStatus=async (productId,status)=>{
        const result=await reqUpdateStatus(productId,status);
        if(result.data.status===0){
            message.success("状态更新成功");
            this.getProduct(this.pageNum);
        }
    };
    initColumns=()=>{
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name'
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render:(price)=>'$'+price
            },
            {
                title: '状态',
                width:100,
                render:(product)=>{
                    const {_id,status}=product;
                    const newStatus=status===1?2:1;
                    return (
                    <span>
                        <Button
                            type='primary'
                            onClick={()=>this.updateStatus(_id,newStatus)}
                        >
                            {status===1?'下架':'上架'}
                        </Button>
                        <span>
                            {
                                status===1?'在售':'已下架'
                            }
                        </span>
                    </span>
                )}
            },
            {
                title: '操作',
                width:100,
                render:(product)=>{
                    return(
                        <span>
                            <ButtonLink>
                                修改
                            </ButtonLink>
                            <ButtonLink onClick={()=>this.props.history.push('/product/detail',{product})}>
                                详情
                            </ButtonLink>
                        </span>
                    )
                }
            },
        ];
    };
    render(){
        const {product,total,searchName,searchType}=this.state;
        const title=(
          <span>
              <Select
                  value={searchType}
                  onChange={(value)=>this.setState({
                      searchType:value
                  })}
              >
                  <Option value='productName'>按名称搜索</Option>
                  <Option value='productDesc'>按描述搜索</Option>
              </Select>
              <Input
                  placeholder="关键字"
                  style={{width:'150px',margin:'0 15px'}}
                  value={searchName}
                  onChange={event=>this.setState({ searchName:event.target.value})}
              />
              <Button type='primary' onClick={()=>this.getProduct(1)}>搜索</Button>
          </span>
        );
        const extra=(
            <Button type='primary'>
                <Icon type='plus'/>
                <span>添加商品</span>
            </Button>
        );

        return(
            <Card title={title} extra={extra}>
                <Table
                    bordered={true}
                    dataSource={product}
                    columns={this.columns}
                    rowKey='_id'
                    pagination={{
                        current:this.pageNum,
                        total:total,
                        defaultPageSize:PAGE_SIZE,
                        showQuickJumper:true,
                        onChange:this.getProduct
                    }}
                />
            </Card>
        )
    }
}
