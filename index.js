import { menuArray } from "/data.js";

let totalPrice = 0;
let orderPhrase = `<h1 class='myorder' id='myorder'>Your Order</h1>`
let orderPhraseBool = true
let totalPhrase = true

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        getOrders(parseInt(e.target.dataset.add))
    }
    if(e.target.dataset.remove){
        removeOrders(parseInt(e.target.dataset.remove))
    }

    if(e.target.id === 'complete-order'){
        document.getElementById('form-details').style.display = 'block'
    }
})

// Form
const myForm = document.getElementById('form-details')

myForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Hide the order items
    document.querySelectorAll('#cart > *').forEach(child => child.style.display = 'none');
    document.getElementById('form-details').style.display = 'none';
    document.getElementById('total-price').classList.add('hidden')
    document.getElementById('complete-order').classList.add('hidden')
    document.getElementById('myorder').classList.add('hidden')

    // showing thanks message
    const thanksMsg = document.getElementById('thanks-msg');
    thanksMsg.style.display = 'flex';
});

// adding food items in cart
function getOrders(food){
    let addOrder = ` `;
    let foodAdded = false;

    if(orderPhraseBool){
        addOrder += orderPhrase
        orderPhraseBool = false
    }

    let orderList = document.getElementById('renderingOrders');
    let totalPriceDiv = document.querySelector('.total-price');

    menuArray.forEach(function(order){
        if(order.id === food) {
            addOrder += `
            <div class='cart' id='cart'>
                <h1>${order.name}</h1>
                <button class='remove-btn' data-remove='${order.id}'>remove</button>
                <h1>$${order.price}</h1>
            </div>
            `;
            totalPrice += order.price;
            foodAdded = true;
        }
    });

    if(foodAdded){
        orderList.insertAdjacentHTML('beforeend', addOrder);

        if(totalPhrase){
            totalPriceDiv.innerHTML = `<h1>Total Price: </h1><h2>$${totalPrice}</h2>
                                        <button class='complete-order' id='complete-order'>Complete Order
                                        </button>`;
            totalPhrase = false;
        } else {
            document.querySelector('.total-price h2').textContent = `$${totalPrice}`;
        }
    }
    return addOrder
}

// removing items 
function removeOrders(food) {
    let orderList = document.getElementById('renderingOrders');
    let totalPriceDiv = document.querySelector('.total-price');
  
    menuArray.forEach(function (order) {
      if (order.id === food) {
        let orderItem = document.querySelector(`[data-remove="${order.id}"]`).parentNode;
        orderItem.remove();
        totalPrice -= order.price;
  
        if (totalPrice === 0) {
          orderList.innerHTML = '';
          totalPriceDiv.innerHTML = '';
          totalPhrase = true;
        } else {
          let totalAndCompleteButton = `
            <h1>Total Price:</h1>
            <h2>$${totalPrice}</h2>
            <button class='complete-order' id='complete-order'>Complete Order</button>
          `;
          totalPriceDiv.innerHTML = totalAndCompleteButton;
        }
      }
    });
  }
  

  
// Displaying food items
function getMenu() {
    let getItems = ``
    menuArray.forEach(function (items) {
        getItems += `
        <div class="orderMenu" id="orderMenu">
            <div> 
                <h1 class="item-emoji">${items.emoji}</h1>
            </div>
            <div class="order-specifications">
                <h1 class="item-name">${items.name}</h1>
                <p class="item-ingredients">${items.ingredients}</p>
                <h1 class="item-price">$${items.price}</h1>
            </div>
            <div class="front-btn">
                <button class="add-btn" data-add='${items.id}'> + </button>
            </div>
        </div>
        `
    })
    getItems += `<div class='renderingOrders' id='renderingOrders'></div><div class='total-price' id='total-price'>`;
    return getItems
}

function render() {
    document.getElementById('order').innerHTML = getMenu()
}

render();
