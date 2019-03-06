import React, {Component} from 'react'
import Rating from 'react-star-ratings'

class ReviewForm extends Component {

    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e){
        e.preventDefault()
    }

    setNicknameRef(e){
        this.nickname = e
    }
    
    setTextRef(e){
        this.textReview = e
    }

    changeRating(r, name){
        this.rating = r
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <h1>add a review</h1>
                <label>choose a nickname</label>
                <input type='text' value={this.setNicknameRef} />
                <label>Your review</label>
                <textarea value={this.setTextRef} />
                <p></p>
                <label>Overall rating</label>
                <StarRatings
                    rating={this.rating}
                    starRatedColor="blue"
                    changeRating={this.changeRating}
                    numberOfStars={6}
                    name='rating'
                />
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default ReviewForm