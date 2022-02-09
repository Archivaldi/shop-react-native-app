class CartItem {
    constructor(quantity, productPrice, productTitle, ownerPushToken, sum){ 
        this.quantity = quantity,
        this.productPrice = productPrice;
        this.productTitle = productTitle;
        this.ownerPushToken = ownerPushToken;
        this.sum = sum;
    }
}

export default CartItem;