import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {
    Form,
    Select,
    Input
    } from 'antd';
const Item= Form.Item;
const Option=Select.Option;

class AddForm extends Component{
    static propTypes={
        categorys:PropTypes.array.isRequired,
        parentId:PropTypes.string.isRequired,
        setForm:PropTypes.func.isRequired
    };
    componentWillMount(){
        this.props.setForm(this.props.form);
    }
    render(){
        const {getFieldDecorator}=this.props.form;
        const {categorys,parentId}=this.props;
        return(
            <Form>
                <Item>
                    {
                        getFieldDecorator('parentId',{
                            initialValue:parentId
                        })(
                            <Select>
                                <Option value='0'>一级分类</Option>
                                {
                                    categorys.map(m=><Option value={m._id}>{m.name}</Option>)
                                }
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