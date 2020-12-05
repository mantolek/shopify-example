// Put your application javascript here
$('.btn-add-cart').on('click', function(e) {
  e.preventDefault();
  const cartForm = $(this).closest('form');

  $.ajax({
    url: '/cart/add.js',
    dataType: 'json',
    type: 'post',
    data: cartForm.serialize(),
  })
    .done(() => {
      $.ajax({
        url: '/cart.js',
        dataType: 'json',
      })
        .done((data) => {
          $('.item-count').text(data.item_count)
        })
        .fail(() => {
          console.log('Error get cart');
        });
    })
    .fail((err) => {
      console.log(err, 'Error send to cart');
    });
});
