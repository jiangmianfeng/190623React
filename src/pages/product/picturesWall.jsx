import React,{Component}from"react";
import { Upload, Icon, Modal,message } from 'antd';
import {reqDeleteImg} from"../../api/index";
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class PicturesWall extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [
            {
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
        ],
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handleChange =async ({file, fileList }) =>{
        console.log(file.status,fileList.length,file===fileList[fileList.length-1]);
        if(file.status==='done'){
            const result=file.response;
            if(result.status===0){
                message.success('上传图书成功！');
                const {name,url}=result.data;
                file=fileList[fileList.length-1];
                file.name=name;
                file.url=url;
            }else{
                message.error('上传失败');
            }
        }else if(file.status==='removed'){
            const result=await reqDeleteImg(file.name);
            if(result.status===0){
                message.success("删除图片成功");
            }else{
                message.success("删除图片失败");
            }
        }
        this.setState({ fileList });
    } ;

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action="/manage/img/upload"
                    accept='image/*'
                    name='image'
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}