import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from '../../../_actions/products.action'
import ProductsLayout from '../components/ProductsLayout';
import Catalog from '../../../sections/catalog/Catalog';

class Products extends Component {
    constructor(props){
        super(props)
        this.itemClickHandle = this.itemClickHandle.bind(this)
    }

    componentDidMount(){
        console.log(this.props)
        this.props.actions.getAll()
    }

    itemClickHandle(e , id){
        e.preventDefault()
        this.props.history.push(`/products/${id}`)
        console.log(id)
    }

    render(){
        const {products} = this.props
        return(
            <ProductsLayout>
                {
                    Object.keys(products).length!=0 ?
                    <Catalog itemClickHandle={this.itemClickHandle} items={products} />
                    : ''
                }
            </ProductsLayout>
        )
    }

}

function mapStateToProps(state, props){
    const products = state.get('products').get('products')
    return{
        products
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions : bindActionCreators(actions,dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Products))