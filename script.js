let menu_list = document.getElementById('menu-list')
let orders_list = document.getElementById('orders-list')
let sum = document.getElementById('sum')
let items_count = document.getElementById('items-count')

const renderMenuItem = (product) =>{
    return`
    <div class="food-card" data-product=${JSON.stringify(product)} onclick="onClickCard(event)">
    
    <div>
        <div class='title'>${product.title}</div>
        <div>${product.price} som</div>
    </div>
    </div>
`
}




const renderOrderItem = (orderItem) => {
    return`
    <li class='order-item'>
        <div>${orderItem.title}</div>
        <div>${orderItem.count} things</div>
        <div>${orderItem.price} som</div>
        <span class='delete' data-order=${JSON.stringify(orderItem)} onclick='onDelete(event)'>x</span>
    </li>`
}

const renderOrder = () => {
    let items =[]
    orders_basked.map((item,id)=>{
        items.push(renderOrderItem(item))
    })
    orders_list.innerHTML = items.join('')
}

const renderMenulist = (list) =>{
    let items =[]
    list.map((item,id)=>{
        items.push(renderMenuItem(item))
    })
    menu_list.innerHTML = items.join('')
    
}

const onClickCard = (event) =>{
   const card = JSON.parse(event.target.dataset.product)

   let currentIndex = orders_basked.findIndex(el=> el.id == card.id)
   if(currentIndex == -1){
    orders_basked.push({  
        ...card,
        count:1
    })

   }else{
    orders_basked[currentIndex].count++
    orders_basked[currentIndex].price +=card.price
    
   }
   renderOrder(orders_basked)
   solveSsum()
   getCount()
}


const onDelete =(event) =>{
    const current_order = JSON.parse(event.target.dataset.order)

    let currentIndex = orders_basked.findIndex(el=> el.id == current_order.id)
    let item_price = menu_items.find(el=>el.id == current_order.id).price
    
    if(current_order.count>1){
        orders_basked[currentIndex].count--
        orders_basked[currentIndex].price-=item_price
        renderOrder(orders_basked)
    }else{
        orders_basked.splice(currentIndex,1)
        renderOrder(orders_basked)
    }
    solveSsum()
    getCount()
}

const solveSsum = () =>{
    sum.innerHTML = orders_basked.reduce((el,{price})=>el+price,0)
}

const getCount =()=>{
    items_count.innerHTML = orders_basked.reduce((el,{count})=>el+count,0)
}

renderMenulist(menu_items)