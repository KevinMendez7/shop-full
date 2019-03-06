import React from 'react'

const DescriptionLayout = (props) => {
    return(
        <div>
            <h3 className='title'>{props.name}</h3>
            {/* <h3 className={props.priceStyle}>{props.price}</h3>
            <h3 className={props.discountStyle}>{props.discounted_price}</h3> */}
            <span>color</span>
            {/* <div onChange={props.setColor}>
                {props.colors.map(color =>{
                    <input type="radio" value={color.value} name="color"/>
                })}
            </div> */}
            <span>size</span>
            {/* <div onChange={props.setSize}>
                {props.size.map(s =>{
                    <input type="radio" value={s.value} name="size"/>
                })}
            </div> */}
            <span>Quantity</span>
            {/* <Counter /> */}
            <button/>
            {/* <WishList /> */}
        </div>
    )
}

export default DescriptionLayout