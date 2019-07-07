import React,{Component} from 'react';
import {
    Form,
    Select,
    Input
    } from 'antd';
const Item= Form.Item;
const Option=Select.Option;

class AddForm extends Component{
    render(){
        const {getFieldDecorator}=this.props.form
        return(
            <Form>
                <Item>
                    {
                        getFieldDecorator('parentId',{
                            initialValue:'0'
                        })(
                            <Select>
                                <Option value='0'>工艺1</Option>
                                <Option value='2'>工艺2</Option>
                                <Option value='3'>工艺3</Option>
                            </Select>
                        )
                    }
                </Item>
                <Item>
                    {
                        getFieldDecorator('categoryName',{
                            initialValue:''
                        })(
                            <Input placeholder='请输入工艺名称'/>
                        )
                    }

                </Item>
            </Form>
        )
    }
}
export default Form.create()(AddForm);