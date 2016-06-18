/*
Welcome to the 60fps project! Your goal is to make Cam's Pizzeria website run
jank-free at 60 frames per second.

There are two major issues in this code that lead to sub-60fps performance. Can
you spot and fix both?


Built into the code, you'll find a few instances of the User Timing API
(window.performance), which will be console.log()ing frame rate data into the
browser console. To learn more about User Timing API, check out:
http://www.html5rocks.com/en/tutorials/webperformance/usertiming/

Creator:
Cameron Pittman, Udacity Course Developer
cameron *at* udacity *dot* com
*/
//var first = document.querySelector("pizza1")
// var blas = document.getElementById("bla")
// var pizzaImg = createElem("img");

//   pizzaImg.src = "images/pizzeria-2.jpg";
//   pizzaImg.classList.add("img-responsive");
//   blas.appendChild(pizzaImg);
var workers = new Worker("js/workers.js")






   workers.onmessage = function(e){

  var si = e.data;

 var a  = createElem("h4");
   a.innerHTML =e.data.title
   var v = createElem("ul");
   v.innerHTML = e.data.pizza
  var pizzasDiv = document.getElementById("randomPizzas");
  pizzasDiv.appendChild(pizzaElementGenerator(a, v));


   }



// returns a DOM element for each pizza.Called from a for loop
var pizzaElementGenerator = function(i, v) {
  var pizzaContainer,             // contains pizza title, image and list of ingredients
      pizzaImageContainer,        // contains the pizza image
      pizzaImage,                 // the pizza image itself
      pizzaDescriptionContainer,  // contains the pizza title and list of ingredients
      pizzaName,                  // the pizza name itself
      ul;                         // the list of ingredients

  pizzaContainer = createElem("div");
  pizzaImageContainer = createElem("div");
  pizzaImage = createElem("img");
  pizzaDescriptionContainer = createElem("div");
 //Adding attr to each pizza container
  pizzaContainer.classList.add("randomPizzaContainer");
  pizzaContainer.style.width = "33.33%";
  pizzaContainer.style.height = "325px";
  pizzaContainer.id = "pizza" + i;                // gives each pizza element a unique id

  pizzaImageContainer.classList.add("col-md-6");
  pizzaImage.src = "images/pizza.png";
  pizzaImage.classList.add("img-responsive");
  pizzaImageContainer.appendChild(pizzaImage);
  pizzaContainer.appendChild(pizzaImageContainer);


  pizzaDescriptionContainer.classList.add("col-md-6");

   pizzaDescriptionContainer.appendChild(i);

  pizzaDescriptionContainer.appendChild(v);
  pizzaContainer.appendChild(pizzaDescriptionContainer);

  //console.log(pizzaContainer)
  return pizzaContainer;

};

// resizePizzas(size) is called when the slider in the "Our Pizzas" section of the website moves.
//Principal
var resizePizzas = function(size) {

  window.performance.mark("mark_start_resize");   // User Timing API function


  // Changes the value for the size of the pizza above the slider
  //1
  function changeSliderLabel(size) {
    switch(size) {
      case "1":
        document.querySelector("#pizzaSize").innerHTML = "Small";
        return;
      case "2":
        document.querySelector("#pizzaSize").innerHTML = "Medium";
        return;
      case "3":
        document.querySelector("#pizzaSize").innerHTML = "Large";
        return;
      default:
        console.log("bug in changeSliderLabel");
    }
  }


  changeSliderLabel(size);




    var newwidth;
    //console.log(oldSize)

    // Changes the slider value to a percent width
    //2.1
    function changePizzaSizes(size) {

      switch(size) {
        case "1":
         newwidth = 25;
         break
        case "2":
          newwidth = 33;
          break
        case "3":
          newwidth = 50;
          break
        default:
          console.log("bug in sizeSwitcher");
      }


    var bla = document.querySelectorAll(".randomPizzaContainer")




    //TODO el valor de dx es igual en cada iteracion por lo que se necesita sacar solo una vez, de igual manera el newwidth
    for (var i = 0; i < 100; i++) {

      bla[i].style.width = newwidth + "%";
       //console.log(newwidth)
    }
  }

  changePizzaSizes(size);


  // User Timing API is awesome
  window.performance.mark("mark_end_resize");
  window.performance.measure("measure_pizza_resize", "mark_start_resize", "mark_end_resize");
  var timeToResize = window.performance.getEntriesByName("measure_pizza_resize");
  console.log("Time to resize pizzas: " + timeToResize[timeToResize.length-1].duration + "ms");
};

window.performance.mark("mark_start_generating"); // collect timing data



// User Timing API again. These measurements tell you how long it took to generate the initial pizzas
window.performance.mark("mark_end_generating");
window.performance.measure("measure_pizza_generation", "mark_start_generating", "mark_end_generating");
var timeToGenerate = window.performance.getEntriesByName("measure_pizza_generation");
console.log("Time to generate pizzas on load: " + timeToGenerate[0].duration + "ms");

// Iterator for number of times the pizzas in the background have scrolled.
// Used by updatePositions() to decide when to log the average time per frame
var frame = 0;

// Logs the average amount of time per 10 frames needed to move the sliding background pizzas on scroll.
function logAverageFrame(times) {   // times is the array of User Timing measurements from updatePositions()
  var numberOfEntries = times.length;
  var sum = 0;
  for (var i = numberOfEntries - 1; i > numberOfEntries - 11; i--) {
    sum = sum + times[i].duration;
  }
  console.log("Average scripting time to generate last 10 frames: " + sum / 10 + "ms");
}




function createElem(htmlElement){

  var elem = document.createElement(htmlElement);
  return elem

}

  var cols = 8;
  var s = 256;
  //createColumns()
  var leftPosition = [100, 356, 612, 868, 1124, 1380, 1636, 1892]

  for (var i = 0; i < 40; i++) {
    var elem = createElem('img');
    elem.className = 'mover';
    elem.src = "images/pizza.webp";
    elem.style.height = "100px";
    elem.style.width = "73.333px";
    elem.style.left = leftPosition[i % cols]+ "px"
    elem.style.transform = "translateX("+0 +"px)"  ;

    elem.style.top = (Math.floor(i / cols) * s) + 'px';
    document.querySelector("#movingPizzas1").appendChild(elem);
  }
  //updatePositions();

//});

var latestKnownScrollY = 0,
    ticking = false;
window.addEventListener('scroll', onScroll);

function onScroll (){
  latestKnownScrollY = window.scrollY;
  //console.log(latestKnownScrollY)
  requestTick();
}

function requestTick() {
  //console.log("tick")
  if(!ticking) {
    //console.log("bla")

    requestAnimationFrame(update);

  }
  ticking = true;
}

function update() {
  // reset the tick so we can
  // capture the next onScroll
  ticking = false;
  frame++;
 window.performance.mark("mark_start_frame");

  var items = document.querySelectorAll('.mover');
  var itemsLength= items.length;
  //var a = document.body.scrollTop
  //console.log(item)


  for (var i = 0; i < itemsLength; i++) {
    //Duda que es 1250?

    var phase = Math.sin((latestKnownScrollY / 1250) + (i % 5));



    items[i].style.transform = "translateX("+(100 * phase)+"px)"
  }
  window.performance.mark("mark_end_frame");
  window.performance.measure("measure_frame_duration", "mark_start_frame", "mark_end_frame");
  if (frame % 10 === 0) {
  var timesToUpdatePosition = window.performance.getEntriesByName("measure_frame_duration");
  logAverageFrame(timesToUpdatePosition);
  }

}
update()



