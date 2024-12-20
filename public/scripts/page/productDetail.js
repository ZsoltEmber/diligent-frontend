import { Component } from "../general.js";
import CartForm from "../component/cart-form.js";
import StarRatings from "../component/star-ratings.js"
import { createNavbar } from "../component/navbar.js";

export class ProductDetail {
  constructor({ id, title, price, description, category, image, rating }) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description
      .replaceAll(/, ?/g, ", ")
      .replaceAll(/\/ ?/g, "/ ");
    this.category = category;
    this.imageUrl = image;
    this.rating = rating;
    this.node = new Component(
      "div",
      { class: "product-detail--wrapper display-flex-container" },
      []
    ).render();
  }

  render() {
    this.node.innerHTML = "";

    const dialogImg = new Component(
      "img",
      {
        alt: this.title,
        class: "product-detail--dialog-img",
        src: this.imageUrl,
      },
      []
    ).render();
    const pictureContainerDialogElement = new Component(
      "dialog",
      { class: "product-detail--img-container-dialog" },
      [dialogImg],
      {
        click: () => {
          pictureContainerDialogElement.close();
        },
      }
    ).render();

    const productImg = new Component(
      "img",
      {
        alt: this.title,
        class: "product-detail--img",
        src: this.imageUrl,
      },
      []
    ).render();
    const productZoomImg = new Component(
      "button",
      { class: "product-detail--zoom-img" },
      ["🔍"],
      {
        click: () => {
          pictureContainerDialogElement.showModal();
        },
      }
    ).render();

    const productImgContainer = new Component(
      "div",
      { class: "product-detail--img-container" },
      [productImg, productZoomImg]
    ).render();

    const titleH1 = new Component("h1", { class: "dinamic-text-size dark-grey-background" }, [
      this.title,
    ]).render();
    const productRatingComponent = new StarRatings(
      this.id,
      this.rating
    ).render();

    const descriptionP = new Component("p", {}, [this.description]).render();
    const descriptionContainer = new Component(
      "div",
      { class: "product-detail--description" },
      [descriptionP]
    ).render();

    const priceSpan = new Component(
      "span",
      {
        class: "product-detail--price-span",
      },
      [this.price]
    ).render();
    const priceP = new Component("p", {}, [
      "price: ",
      priceSpan,
      "$",
    ]).render();

    const priceContainer = new Component(
      "div",
      { class: "product-detail--price-container" },
      [priceP]
    ).render();
    //<button class="product-detail--add-to-cart-btn form-button">Add to Cart</button>
    const addToCartBtn = new CartForm({
      id: this.id,
      title: this.title,
      price: this.price,
      description: this.description,
      category: this.category,
      image: this.imageUrl,
      rating: this.rating,
    }).render();

    const productDetailInfoContainer = new Component(
      "div",
      { class: "product-detail--info-container" },
      [
        titleH1,
        productRatingComponent,
        descriptionContainer,
        priceContainer,
        addToCartBtn,
      ]
    ).render();

    this.node.append(
      productImgContainer,
      productDetailInfoContainer,
      pictureContainerDialogElement
    );
    return this.node;
  }
}

export default function createProductDetailPage(product){
  const productDetail = new ProductDetail(product).render();
  const productDetailPage = new Component('div',{class:"main"},[createNavbar(),productDetail]).render();
  return productDetailPage;
}