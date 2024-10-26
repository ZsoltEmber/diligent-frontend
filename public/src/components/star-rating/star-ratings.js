import { Component } from "../../../scripts/general.js";

/** 
* @param {string} productId - a string of the Id number of the product wich is rated with stars
@param {Object} otherUsersRating - it expects an object from API data's "rating" key. For example: {"rate": 3.9,"count": 120}
*/
class StarRatings{
    constructor(productId,otherUsersRating = {}){
        this.productId = productId;
        this.globalRate = otherUsersRating.rate? otherUsersRating.rate : 0;
        this.ratingUsersCount = otherUsersRating.count? otherUsersRating.count : 0;
        this.stars = this.createStars();
        this.containerElement = null;
        this.currentRating = 0;
    }

    fillStars = (highestStarNumber) =>{
        this.stars.forEach((starElement,index) =>{
            starElement.innerText = index<highestStarNumber? '⭐':'☆'; 
                });
    }
    
    handleHoverOverStar = (event) =>{
        const starData = event.target.dataset.star;
        this.fillStars(starData);
       
    }
    handleMouseOut = ()=>{
        this.fillStars(this.currentRating);
    }
    handleChooseRating =(event)=>{
        const starData = event.target.dataset.star;
        this.currentRating = starData;
     
    }

    createStar(dataStar){
        const starElement = new Component('div',{class:"star",'data-star':dataStar},['☆'],{"mouseover":this.handleHoverOverStar,"mouseout":this.handleMouseOut,"click":this.handleChooseRating});
        return starElement.render(); 
    }
    createStars(){
        const stars = [];
        for(let i = 1; i<=5;i++){
            const starToAppend = this.createStar(i)
            stars.push(starToAppend);
        }
        return stars;
    }
    createContainer(){
        const ratingSpan = new Component('span',{class:"bold-text"},[this.globalRate]);
        const usersSpan = new Component('span',{class:"bold-text"},[this.ratingUsersCount]);
        const othersRating = new Component('div',{class:"others-rating"},[
            "Rating: ",
            ratingSpan.render(),
            " According to ",
            usersSpan.render(),
            " users",
            ]
        )
        const userRatingContainer = new Component('div',{class:"user-rating"},this.stars)
        const containerElement = new Component('div',{class:"star-rating-container"},[othersRating.render(),userRatingContainer.render()]);
    
        return containerElement;
    }
    render(){
        this.containerElement = this.createContainer();
        return this.containerElement.render();
    }
}

let x = new StarRatings(44,{"rate": 3.9,"count": 120});
console.log(x)
document.body.append(x.render())
console.log(typeof x.stars[0].dataset.star);