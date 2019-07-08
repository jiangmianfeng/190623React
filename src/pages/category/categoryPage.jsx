import React,{Component} from'react';
import {Switch,Route} from 'react-router-dom';

import Category from'./category';
import Parts from'../categoryParts/parts';
export default class CategoryPage extends Component{
    render(){
       return(
           <div>
               <Switch>
                   <Route exact={true} path='/category' component={Category}/>
                   <Route path='/parts' component={Parts}/>
               </Switch>
           </div>
       )
    }
}