function show(){
    let x = document.getElementById('mobileMenu');
    let y = document.getElementById('mmm');
    let z = document.getElementById('xxxx');

    x.style.display = "block";
    z.style.display = "block";
    y.style.display ="none"
    document.getElementById('CART').style.display = "none";

}

function hide(){
    let x = document.getElementById('mobileMenu');
    let y = document.getElementById('xxxx');
    let z = document.getElementById('mmm');
    x.style.display = "none";
    y.style.display ="none"
    z.style.display = "flex";
}


function remove(btn) {
    let countEl = document.querySelector('.cart-count');
    let count = parseInt(countEl.textContent) || 0;

    if(count > 0){
        count--;
        countEl.textContent = count;
    }

    // Optional: give user feedback without blocking alert
    console.log("Item removed from cart");

    const card = btn.closest(".card");
    const unndo = card.querySelector('.added')


    // Reset the button
    unndo.classList.remove('added');
    unndo.innerText="Add to Order";
    btn.classList.remove('remo');


    cartlist(btn);
    cartListRemove(btn);
    restartOrder()
}


const cartItemsEl = document.querySelector('.cart-items'); // the <ul>
const totalEl = document.getElementById('total');          // the <p id="total">
let cart = []; // global array to store items






function cartListRemove(btn) {
    const card = btn.closest(".card");
    const item = card.querySelector('.item').textContent;

    // Remove item from cart array
    cart = cart.filter(product => product.name !== item);

    // Clear previous list
    cartItemsEl.innerHTML = '';

    // Rebuild cart list
    let total = 0;
    cart.forEach(product => {
        const li = document.createElement('li');

        const nameSpan = document.createElement('span');
        nameSpan.textContent = product.name;
        nameSpan.classList.add('cart-item-name');

        const priceSpan = document.createElement('span');
        priceSpan.textContent = product.price;
        priceSpan.classList.add('cart-item-price');

        li.appendChild(nameSpan);
        li.appendChild(priceSpan);

        cartItemsEl.appendChild(li);

    });

    rebuildCart();


}










// Add item to cart
function addItem(btn) {
    const card = btn.closest(".card");
    const item = card.querySelector('.item').textContent;
    const price = card.querySelector('.price').textContent;

    // Only add if not in cart
    if (!cart.some(product => product.name === item)) {
        cart.push({ name, price });
    }

    rebuildCart();
}






// Your cartlist function (corrected)
function cartlist(btn) {
    const card = btn.closest(".card");
    const item = card.querySelector('.item').textContent;
    const price = card.querySelector('.price').textContent;

    // Add item to cart array only if not already added
    if (!cart.some(product => product.name === item)) {
        cart.push({ name: item, price: price });
    }

    // Rebuild cart list
    rebuildCart();
}

// Remove function (works with your cartlist)
function cartlistRemove(btn) {
    const card = btn.closest(".card");
    const item = card.querySelector('.item').textContent;

    // Remove item from cart array
    cart = cart.filter(product => product.name !== item);

    // Rebuild cart list
    rebuildCart();
}

// Internal function to rebuild list and update total
function rebuildCart() {
    cartItemsEl.innerHTML = '';
    let total = 0;

    cart.forEach(product => {
        const li = document.createElement('li');

        const nameSpan = document.createElement('span');
        nameSpan.textContent = product.name;
        nameSpan.classList.add('cart-item-name');

        const priceSpan = document.createElement('span');
        priceSpan.textContent = product.price;
        priceSpan.classList.add('cart-item-price');

        li.appendChild(nameSpan);
        li.appendChild(priceSpan);
        cartItemsEl.appendChild(li);

        // Convert price to number for total
        const priceNumber = parseFloat(product.price.replace(/[^0-9.-]+/g,""));
        total += priceNumber;
    });

    // Update total even if cart is empty
    totalEl.textContent = `$${total.toFixed(2)}`;
}






function add(btn) {
    let countEl = document.querySelector('.cart-count');
    let count = parseInt(countEl.textContent) || 0;

    let icon = document.querySelector('.carrr');
    icon.classList.add('mobile-show');
    

    count++;
    countEl.textContent = count;
    btn.innerText = "Added"
    btn.classList.add('added');

        const card = btn.closest(".card");
    const unndo = card.querySelector('.Remove')


    // Reset the button
    unndo.classList.add('remo');



      cartlist(btn);
      restartOrder()
}





function filter(item, btn){
    let x = document.querySelectorAll(item);
    let others = document.querySelectorAll('.card');

    // get ALL sibling buttons from the same nav
    let allButtons = btn.parentElement.querySelectorAll('button');

    // remove green from all
    allButtons.forEach(b => b.classList.remove('green'));

    // add green to clicked one
    btn.classList.add('green');

    // hide all cards
    others.forEach(card => {
        card.classList.remove('show');
        card.classList.add('hide');
    });

    // show selected cards
    x.forEach(card =>{
        card.classList.remove('hide');
        card.classList.add('show');
    });
}

function reserve(){
    let file = document.getElementById('boook');
    let message = document.getElementById('done');
    file.style.display="none";
    message.style.display ="flex";
}



const form = document.querySelector('#boook form'); // select the form inside the div

form.addEventListener('submit', function(e) {
    e.preventDefault(); // prevent page reload

    // Now all required fields are already valid
    reserve();
});


// Create the media query once (global)
const mobileQuery = window.matchMedia("(max-width: 1024px)");

// Function to hide the cart on mobile
function handleMobileCart() {
    if (mobileQuery.matches) {
        hide(); // your mobile-specific hide function
    }
}

// Add listener once, so it responds to resizing
mobileQuery.addListener(handleMobileCart);

// Button function
function showcart() {
    let cart = document.getElementById('CART');
    cart.style.display = "block";

    // Immediately hide if on mobile
    handleMobileCart();
}



function hideCart(){
    let cart = document.getElementById('CART');
    cart.style.display = "none";

}



function orderDone(){
    document.getElementById('ccartt').style.display ="none"
    document.getElementById('order-done').style.display = "block";
    resetOrder()
}


function resetOrder() {
    // 1. Clear the cart array
    cart = [];

    // 2. Clear the cart list in DOM
    cartItemsEl.innerHTML = '';

    // 3. Reset total
    totalEl.textContent = `$0.00`;

    // 4. Optional: reset all buttons
    const addButtons = document.querySelectorAll('.added');
    addButtons.forEach(btn => {
        btn.classList.remove('added');
        btn.innerText = "Add"; // reset button text
        btn.style.opacity = "1"; // if you changed opacity
    });

    const removeButtons = document.querySelectorAll('.remo');
    removeButtons.forEach(btn => {
        btn.classList.remove('remo');
    });


    document.querySelector('.cart-count').innerText = "0";
}






function restartOrder(){
        document.getElementById('ccartt').style.display ="block"
    document.getElementById('order-done').style.display = "none";
}



