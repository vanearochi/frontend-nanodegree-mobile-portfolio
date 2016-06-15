onmessage = function(e) {
  console.log('Message received from main script');
  console.log(e.data)
  var bla = 2+e.data
  console.log('Posting message back to main script');
  postMessage(bla)

  //var totalIngredients = ""


}