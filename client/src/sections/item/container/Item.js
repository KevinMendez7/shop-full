import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import * as actions from '../../../_actions/products.action'
import ItemLayout from '../components/ItemLayout'
import ImageLayout from '../components/ImageLayout'
import DescriptionLayout from '../components/DescriptionLayout'

class Item extends Component {

    componentDidMount(){
    }

    render(){
        return(
            <ItemLayout>
                <ImageLayout />
                <DescriptionLayout />
            </ItemLayout>
        )
    }
}

function mapStateToProps(state, props){
    return{

    }
}

function mapDispatchToProps(dispatch){
    return{
        actions : bindActionCreators(actions)
    }
}

export default connect(mapDispatchToProps, mapDispatchToProps)(Item)