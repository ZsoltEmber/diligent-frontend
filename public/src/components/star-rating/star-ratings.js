import { Component } from "../../../scripts/general.js";
import { fetchData,updateData } from "../../../scripts/client.js";
/** 
* @param {string} productId - a string of the Id number of the product wich is rated with stars
@param {Object} otherUsersRating - it expects an object from API data's "rating" key. For example: {"rate": 3.9,"count": 120}
*/
export default class StarRatings{
    constructor(productId,otherUsersRating = {}){
        this.productId = productId;
        this.globalRate = otherUsersRating.rate? otherUsersRating.rate : 0;
        this.ratingUsersCount = otherUsersRating.count? otherUsersRating.count : 0;
        this.stars = this.createStars();
        this.currentRating = 0;
        this.userFirstTimeRates = true;
        this.containerElement = new Component('div',{class:"star-rating-container"},[]).render();
    }

    fillStars = (highestStarNumber) =>{
        this.stars.forEach((starElement,index) =>{
            starElement.innerText = index<highestStarNumber? '⭐':'☆'; 
                });
    }
    
    handleHoverOverStar = (event) =>{
        if(!this.userFirstTimeRates){return;}
        const starData = event.target.dataset.star;
        this.fillStars(starData); 
    }

    handleMouseOut = ()=>{
        if(!this.userFirstTimeRates){return;}
        this.fillStars(this.currentRating);
    }
    handleChooseRating = (event)=>{
        if(!this.userFirstTimeRates){return;}
        this.userFirstTimeRates = false;
        
        const starData = parseInt(event.target.dataset.star);
        this.currentRating = starData;
    
        this.globalRate = this.calcAggregatedRating();
        this.updateContainer();
        this.updateServerRatingData();
    }

    updateServerRatingData = async ()=> {
        const originalData = await fetchData();
        
        let indexOfProduct;
        const productToChange = originalData.filter((item,index)=>{
            if(item.id===this.productId){indexOfProduct = index};
            return item.id===this.productId
        })[0];
        if(!productToChange){
            throw new Error("Failed to modify products rating!")
        }
            productToChange.rating =  {"rate": this.globalRate,"count": this.ratingUsersCount};
        
        const updatedData = [...originalData];
            updatedData.splice(indexOfProduct,1,productToChange);
            console.log("updatedData: ",updatedData)
        updateData(updatedData);
        
    }

    calcAggregatedRating = ()=>{
        return (this.ratingUsersCount*this.globalRate + this.currentRating)/(++this.ratingUsersCount);   
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
    updateContainer(){
        const ratingSpan = new Component('span',{class:"bold-text"},[this.globalRate.toFixed(1)]);
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
        
        this.containerElement.innerHTML = "";
        this.containerElement.append(othersRating.render(),userRatingContainer.render())
        console.log(this.containerElement)
    }
    render(){
        this.updateContainer();
        return this.containerElement;
    }
}

let x = new StarRatings(1,{"rate": 3.9,"count": 5});
console.log(x)
document.body.append(x.render())
console.log(typeof x.stars[0].dataset.star);
