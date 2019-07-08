import React,{Component} from'react';
import {
    Button,
    Select,
    Input,
    Icon,
    Table,
    Card
    }from 'antd';
import ButtonLink from'../../components/link-button/index';
const Option=Select.Option;
export default class ProductHome extends Component{
    state={
        product:[]
    };
    componentWillMount(){
        this.initColumns();
    }
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
                render:(state)=>{return (
                    <span>
                        <Button>上架</Button>
                        <span>在售</span>
                    </span>
                )}
            },
            {
                title: '操作',
                width:100,
                render:(product)=>{
                    return(
                        <span>
                            <ButtonLink>修改</ButtonLink>
                            <ButtonLink>详情</ButtonLink>
                        </span>
                    )
                }
            },
        ];
    };
    render(){
        const title=(
          <span>
              <Select value='1'>
                  <Option value='1'>按名称搜索</Option>
                  <Option value='2'>按描述搜索</Option>
              </Select>
              <Input placeholder="关键字" style={{width:'150px',margin:'0 15px'}}/>
              <Button type='primary'>搜索</Button>
          </span>
        );
        const extra=(
            <Button type='primary'>
                <Icon type='plus'/>
                <span>添加商品</span>
            </Button>
        );
        const {product}=this.state;
        return(
            <Card title={title} extra={extra}>
                <Table
                    bordered={true}
                    dataSource={product}
                    columns={this.columns}
                />
            </Card>
        )
    }
}
