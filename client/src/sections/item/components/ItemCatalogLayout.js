import React from 'react'
import './ItemCatalogLayout.css'
import Test from '../../../assets/alsace-2.gif'

const ItemCatalogLayout = (props) => {
    // console.log(props)
    return(
        <div onClick={(e) => props.itemClickHandle(e, props.item.product_id)} className='item-catalog-layout'>
            <div className='item'>
                <img src={Test} />
                <h3>{props.item.name}</h3>            
                <h2>{props.item.price}</h2>
            </div>            
            <div className='hidden'>
                <h3>HOLA QUE HACE</h3>            
            </div>            
        </div>
    )
}

export default ItemCatalogLayout