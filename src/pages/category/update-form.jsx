import React,{Component} from 'react';
import {
    Form,
    Input
    } from 'antd';
import PropTypes from 'prop-types';
const Item= Form.Item;

class UpdateForm extends Component{
    static propTypes={
      categoryName:PropTypes.string.isRequired,
      setForm:PropTypes.func.isRequired
    };

    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    render(){
        const {getFieldDecorator}=this.props.form;
        const {categoryName}=this.props;
        return(
            <Form>
                <Item>
                    {
                        getFieldDecorator('categoryName',{
                            initialValue:categoryName,
                            rules:[{
                                required:true,
                                message:"请输入参数"
                            }]
                        })(
                            <Input placeholder='请输入工艺名称'/>
                        )
                    }

                </Item>
            </Form>
        )
    }
}
export default Form.create()(UpdateForm);