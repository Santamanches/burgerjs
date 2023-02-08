let product = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: 'images/products/burger-2.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: 'images/products/burger-3.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        img: 'images/products/burger-4.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
}


let burgerBtns = document.querySelectorAll('.wrapper__list-btn'),
    cartBtn = document.querySelector('.wrapper__navbar-btn'),
    cartList = document.querySelector('.wrapper__navbar-basket'),
    cartClose = document.querySelector('.wrapper__navbar-close'),
    cartAmount = document.querySelector('.warapper__navbar-count'),
    cartTotalPrice = document.querySelector('.wrapper__navbar-totalprice'),
    cartListItems = document.querySelector('.wrapper__navbar-checklist'),
    navWord = document.querySelector('.navbar__word');
    
burgerBtns.forEach((btn) => {
    btn.addEventListener('click', function()  {
        addCount(this)
    })
})

function addCount(el) {
    // closest() - метод который позволяет подключится к указаному ближайшему родителю
    // getAttribute() - получает значение указаного атрибута
    let parent = el.closest('.wrapper__list-card')
    let parentId = parent.getAttribute('id')
    product[parentId].amount++
    basket()
}

cartBtn.addEventListener('click', () => cartList.classList.add('active'))
cartClose.addEventListener('click', () => cartList.classList.remove('active'))


function basket() {
    let productArray = []
    for(let key in product) {
       let burger = product[key]
       let productBurger = document.querySelector(`#${key}`)
       let productCount = productBurger.querySelector('.wrapper__list-count')
       if(burger.amount > 0) {
            productArray.push(burger)
            productCount.classList.add('active')
            productCount.innerHTML = burger.amount
       }else {
            productCount.classList.remove('active')
            productCount.innerHTML = ''
       }
    }
    let allCount = totalCountBurgers()
    if(allCount > 0) {
        cartAmount.classList.add('active')
    }else {
        cartAmount.classList.remove('active')
    }
    cartAmount.innerHTML = allCount
    
    cartListItems.innerHTML = ''
    
    productArray.forEach((burger) => {
        cartListItems.innerHTML += createBurger(burger)
    })   
    cartTotalPrice.innerHTML = totalSumBurgers()
    
}
if (cartTotalPrice.innerHTML == 0) {
    function ListMaker() {
        return `<div class="navbar__box">
        <h2 class="navbar__word"></h2>
    </div>` 
}}

let theWord = 'Пусто'

function totalSumBurgers() {
    let sum = 0;
    for(let key in product) {
        sum += product[key].totalSum
    }
    if (sum == 0) {
        cartListItems.innerHTML = `<div class="navbar__box">
        <h2 class="navbar__word">${theWord}</h2>
    </div>` 
    }
    return sum + 'сумм'
    
}


function totalCountBurgers() {
    let total = 0;
    for(let key in product) {
        total += product[key].amount
    }
    return total
}


function createBurger(burger) {
    return `<div class="nav__item" id="${burger.name.toLowerCase()}-burger">
    <div class="nav__item-left">
      <img src="${burger.img}" alt="">  
      <div class="nav__item-left-info">
        <p class="nav__item-left-name">${burger.name}</p>
        <p class="nav__item-left-price">${burger.price} сум</p>
      </div>
    </div>
    <div class="nav__item-right">
        <button data-symbol="-" class="nav__item-btn">-</button>
        <output class="nav__item-count">${burger.amount}</output>
        <button data-symbol="+" class="nav__item-btn">+</button>
    </div>
</div>`
}



window.addEventListener('click', (event) => {
    if(event.target.classList.contains('nav__item-btn')) {
        let dataValue = event.target.getAttribute('data-symbol')
        let parentBurger = event.target.closest('.nav__item');
        if(parentBurger) {
            let id = parentBurger.getAttribute('id').split('-')[0]
            if(dataValue == '-') {
                product[id].amount--
            }else if(dataValue == '+') {
                product[id].amount++
            }
            basket() 
        }
    }
})

    // cartList.addEventListener('click', (e) => {
    //     let position = e.composedPath().includes('.wrapper__navbar-basket');

    //     if (position !== cartList ) {
    //         cartList.classList.remove('active');

    //     }
    // })


