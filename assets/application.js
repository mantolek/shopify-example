window.theme = window.theme || {};

theme.ShippingBar = (function() {
  let bar = document.querySelector('.shipping-bar');

  let promote_txt = bar.dataset.promote;
  let unlocked_txt = bar.dataset.unlock;
  let treshold = bar.dataset.treshold;

  function update() {
    $.getJSON('/cart.js').then(function(cart) {
      let value_left = (treshold - cart.total_price)/100;

      if (value_left <= 0) {
        bar.innerHTML = `<p class="unlock">${promote_txt}</p>`;
      } else {
        bar.innerHTML = `<p class="promote">${unlocked_txt.replace('[value]', value_left)}</p>`;
      }
    });
  }

  return {
    update: update,
  };
})();

theme.Actions = (function() {
  function addToCart(){
    $('.btn-add-cart').on('click', function(e) {
      e.preventDefault();
      const cartForm = $(this).closest('form');
      const shippingBar = $('.shipping-bar');
    
      $.ajax({
        url: '/cart/add.js',
        dataType: 'json',
        type: 'post',
        data: cartForm.serialize(),
      })
      .done(() => {
        if(shippingBar !== undefined){
          theme.ShippingBar.update()
        }

        refreshStoreData()
      })
      .fail((err) => {
        console.log(err, 'Error add cart.');
      })
    })
  }

  function updateItemInCart(){
    const updatePlus = $('.update-plus')
    const updateMinus = $('.update-minus')
    const id = updatePlus.data('id')
    let q = $('.current_quantity')

    const itemCount = $('.item-count');
  
    updatePlus.on('click', function(e) {
      e.preventDefault();
    
      $.ajax({
        url: '/cart/update.js',
        dataType: 'json',
        type: 'post',
        data: {
          updates: {
            [id]: +q.text()+1
          }
        }
      })
      .done((data) => {
        data.items.map(el => {
          if(el.variant_id === id){
            q.text(el.quantity)
          }
          itemCount.text(data.item_count)
        })
      })
      .fail((err) => {
        console.log(err, 'Error remove item from cart.');
      })
    })

    updateMinus.on('click', function(e) {
      e.preventDefault();
    
      $.ajax({
        url: '/cart/update.js',
        dataType: 'json',
        type: 'post',
        data: {
          updates: {
            [id]: +q.text()-1
          }
        }
      })
      .done((data) => {
        data.items.map(el => {
          if(el.variant_id === id){
            q.html(el.quantity)
          }
          itemCount.text(data.item_count)
        })
      })
      .fail((err) => {
        console.log(err, 'Error remove item from cart.');
      })
    })
  }

  function removeItemInCart(){
    const removeBtn = $('.remove_btn')
    let removeBtnId = removeBtn.data('id')
  
    removeBtn.on('click', function(e) {
      e.preventDefault();
    
      $.ajax({
        url: '/cart/update.js',
        dataType: 'json',
        type: 'post',
        data: {
          updates: {
            [removeBtnId]: 0
          }
        }
      })
      .done(() => {
        refreshStoreData()
      })
      .fail((err) => {
        console.log(err, 'Error remove item from cart.');
      })
    })
  }

  function refreshStoreData(){
      const itemCount = $('.item-count');

      $.ajax({
        url: '/cart.js',
        dataType: 'json',
        type: 'get',
      })
      .done((data) => {
        itemCount.text(data.item_count)

        updateSideCart(data)
      })
      .fail((err) => {
        console.log(err, 'Get cart error.');
      })
  }

  function updateSideCart(data){
    let totalPrice = $('.cart_finalInfo .total_price')
    totalPrice.html(`${data.total_price/100}`)

    let cartWrapper = $('.cart_wrapper')
    let newHtml = ``
    data.items.map((item,i) => {

      newHtml += `
      <div>
          <div class="d-flex">
              <div class='position-relative'>
                <a href="${item.url}">
                    <img src="${item.image}" alt="${item.title}">
                </a>
                <p class='position-absolute text-white bg-dark px-3 py-1' style='bottom:0; right:0;'>${item.price / 100}</p>
              </div>

              <div class="d-flex flex-column align-items-start px-2" style='max-width: 10rem;'>
                  <a href="${item.url}" class='mb-2 mx-auto fs-4 text-body'>${item.product_title}</a>
                  <p>${item.variant_title}</p>
              </div>
          </div>

          <div class="d-flex flex-column">
              <div class="d-flex">
                <p class='mr-2'>
                  <s class='original_line_price'>Before: ${item.original_line_price != item.line_price ? item.original_line_price/100 : ''}</s>
                </p>
                <p>Now: ${item.line_price/100}</p>
              </div>

              <p>Discounts:</p>
              <ul>
              ${item.discounts.map(r => `<li>${r.title}</li>`).join("")}

              </ul>
              <input type="number" name="updates[]" id="updates_${item.key}" value="${item.quantity}" min="0">
              <a href="/cart/change?line=${i+1}&amp;quantity=0" class="remove_btn btn btn-dark mt-3"" data-id='${item.variant_id}'>Remove</a>
          </div>
      </div>
      `
    })
    cartWrapper.html(newHtml)

    // Reassign onClicks
    removeItemInCart()
    updateItemInCart()
  }

  function underNavbarBtns(){
    const sideCartBtn = $('.open_side_cart');
    const closeCart = $('.close_cart');
    const sideCart = $('.side_cart');

    [sideCartBtn, closeCart].forEach(el => {
      el.on('click', function(e) { 
        e.preventDefault()
        sideCart.toggleClass('open')
      })
    })
  }

  function currencySwitcher(){
    const $select_currency = $('select[name=currency]');
    $('.currency-item').on('click', function (e) {
      e.preventDefault();
      var newCurrency = $(this).attr('data-currency');

      $select_currency.val(newCurrency);
      $select_currency.parents('form').submit();
    });
  }

  function init(){
    addToCart()
    underNavbarBtns()
    removeItemInCart()
    updateItemInCart()
    currencySwitcher()
    // refreshCart()
  }

  return {
    init
  }
})();

jQuery(function() {
  document.documentElement.className = document.documentElement.className.replace(
    'no-js',
    'supports-js'
  );

  theme.Actions.init()
})
