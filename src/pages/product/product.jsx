import React,{Component} from 'react';
import {Redirect,Switch,Route} from'react-router-dom';
import ProductHome from './home';
import ProductDetail from './detail';
import AddUpdateProduct from './add-update';
export default class Product extends Component{
    render(){
        return(
            <Switch>
                <Route path='/product' component={ProductHome} exact={true}/>
                <Route path='/product/detail' component={ProductDetail}/>
                <Route path='/product/addupdate' component={AddUpdateProduct}/>
                <Redirect to='/product'/>
            </Switch>
        )
    }
}