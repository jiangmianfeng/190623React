import React,{Component} from 'react';
import {
    Card,
    List,
    Icon
    }from'antd';
import LinkButton from'../../components/link-button/index';
import {PATH}from"../../utils/constants";
const Item=List.Item;

export default class ProductDetail extends Component{
    render(){
        const {name,desc,price,imgs}=this.props.location.state.product;
        const title=(
          <span>
            <LinkButton>
              <Icon
                  type='arrow-left'
                  style={{marginRight: 10, fontSize: 20}}
                  onClick={() => this.props.history.goBack()}
              />
            </LinkButton>
            <span>商品详情</span>
          </span>
        );
        return(
            <Card title={title} className='product-detail'>
                <List>
                    <Item>
                        <span className="left">商品名称:</span>
                        <span>{name}</span>
                    </Item>
                    <Item>
                        <span className="left">商品描述:</span>
                        <span>{desc}</span>
                    </Item>
                    <Item>
                        <span className="left">商品价格:</span>
                        <span>{price}元</span>
                    </Item>
                    <Item>
                        <span className="left">所属分类:</span>
                        <span>商品描述</span>
                    </Item>
                    <Item>
                        <span className="left">商品图片:</span>
                        {
                            imgs.map(m=>
                                <img
                                src={PATH+m}
                                className="product-img"
                                alt='img'/>
                            )
                        }
                    </Item>
                    <Item>
                        <span className="left">商品详情:</span>
                        <span>
                            商品详情
                        </span>
                    </Item>
                </List>
            </Card>
        )
    }
}