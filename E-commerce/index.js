const productEl=document.querySelector(".product");
const cartEl = document.querySelector(".shopping-cart")
const carts = document.querySelector("#crate");
const sellItems = document.querySelector(".top-selling");

const renderProducts=()=>{
    products.forEach((element) => {
        productEl.innerHTML+=`
        <div class="item">
            <div class="img">
                <img src="${element.img}" alt="">
            </div>
            <div class="title">
                ${element.name}
            </div>
            <div class="price">
                <p>$${element.price} <sup><strike>$9000</strike></sup></p>
            </div>
            <div class="ratings">
                <div class="line"></div>
                <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                </div>
                <div class="line"></div>
            </div>
            <div class="media-icons">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-arrow-right-arrow-left"></i>
                <i class="fa-regular fa-eye"></i>
            </div>
            <div class="button" onclick="addTocart(${element.id})">
                <button><i class="fa-solid fa-cart-shopping" id="hide"></i> ADD TO CART</button>
            </div>
        </div>
        `;
    });
}
renderProducts()

let cart =[];
// updateCart()
const addTocart=(id)=>{
    if(cart.some((item)=>item.id===id))
    {
        // alert("product already exist in cart")
        changeNumberOfUnits("plus",id)
    }
    else{
        const item = products.find((product)=>product.id===id);
    cart.push({
        ...item,
        numberOfUnits:1,
    });
    console.log(cart)
    }
    updateCart();
}

// updating cart
const updateCart=()=>{
    renderCartItems();
    renderSubTotal();
    // localStorage.setItem("CART",JSON.stringify(cart));
}
//render subtotal
const renderSubTotal=()=>{
    let totalItems=0;
    cart.forEach((item)=>{
        totalItems+=item.numberOfUnits;
    })
    carts.innerHTML=`${totalItems}`;
    // updateCart()
}
// rendering cart items
const renderCartItems=()=>{
    cartEl.innerHTML="";
    cart.forEach((item)=>{
        cartEl.innerHTML+=`
        <div class="cart-items">
         <div class="img">
             <img src="${item.img}" alt="">
             <div class="product-name">
                <h3>${item.name}</h3>
            </div>
         </div>
        <div class="units">
            <div onclick="changeNumberOfUnits('minus',${item.id})" class="btns">-</div>
            <div>${item.numberOfUnits}</div>
            <div onclick="changeNumberOfUnits('plus',${item.id})" class="btns">+</div>
        </div>
        <div class="remove-icon">
            <i class="fa-solid fa-trash" onclick="removeItemFromCart(${item.id})"></i>
        </div>
       
        </div>
        
 </div>
        `;
    })
}

//change number of units in cart items
function changeNumberOfUnits(action,id)
{
    let totalItems = 0;
  cart = cart.map((item)=>{
    let numberOfUnits = item.numberOfUnits;
    if(item.id===id)
    {
      if(action==="minus" && item.numberOfUnits>1)
      {
        numberOfUnits--;
      }else if(action==="plus")
      {
        numberOfUnits++;
      }
    }
    return{
      ...item,
      numberOfUnits,
    };
    
  });
  
  updateCart();
}

// remove item from cart
const removeItemFromCart=(id)=>{
    cart = cart.filter((item)=>item.id!==id);
    console.log(cart)
    updateCart()
}

let shoppingCart = document.querySelector(".shopping-cart");
document.querySelector("#cart-btn").onclick=()=>{
    shoppingCart.classList.toggle('active');
}