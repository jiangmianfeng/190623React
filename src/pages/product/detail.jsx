import React,{Component} from 'react';
import {
    Card,
    List,
    Icon
    }from'antd';
import LinkButton from'../../components/link-button/index';
import {PATH}from"../../utils/constants";
import {reqCategate} from'../../api/index';
const Item=List.Item;

export default class ProductDetail extends Component{
    state={
      cName1:'',
      cName2:''
    };
     async componentWillMount(){
        const {pCategoryId,categoryId}=this.props.location.state.product;
        console.log(pCategoryId,categoryId,'1');
        if(pCategoryId==='0'){
            const result=await reqCategate(categoryId);
            console.log(result.data,'data');
            const cName1=result.data.data.name;
            console.log(cName1,'cName1');
            this.setState({
                cName1:cName1
            });
            console.log(this.state.cName1);
        }else{
            // const result1=await reqCategate(pCategoryId);
            // const result2=await reqCategate(categoryId);
            // const cName1=result1.data.name;
            // const cName2=result2.data.name;
            const results=await Promise.all([reqCategate(pCategoryId),reqCategate(categoryId)]);
            console.log(results,'results');
            const cName1=results[0].data.data.name;
            const cName2=results[1].data.data.name;
            console.log(cName1,'cName11');
            console.log(cName1,'cName12');
            this.setState({
                cName1:cName1,
                cName2:cName2
            });
            console.log(this.state.cName1,this.state.cName2);
        }
    }
    render(){
        const {name,desc,price,imgs,detail}=this.props.location.state.product;
        const {cName1,cName2}=this.state;
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
                        <span>{cName1}{cName2?'--->'+cName2:''}</span>
                    </Item>
                    <Item>
                        <span className="left">商品图片:</span>
                        {
                            imgs.map(m=>
                                <img
                                    key={m}
                                src={PATH+m}
                                className="product-img"
                                alt='img'/>
                            )
                        }
                    </Item>
                    <Item>
                        <span className="left">商品详情:</span>
                        <span dangerouslySetInnerHTML={{__html: detail}}>
                        </span>
                    </Item>
                </List>
            </Card>
        )
    }
}