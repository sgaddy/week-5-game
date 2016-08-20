// STOPWATCH ACTIVITY (SOLUTION)
// =============================

// This code will run as soon as the page loads

var time = 120;
var counter=0;
var windowTimeout=0;
var imgCount = 0;
var images = ["assets/images/mickey0.jpg", "assets/images/mickey1.jpg", "assets/images/mickey2.jpg","assets/images/mickey3.jpg","assets/images/mickey4.jpg","assets/images/mickey5.jpg","assets/images/mickey6.jpg", "assets/images/mickey7.jpg", "assets/images/mickey8.jpg","assets/images/mickey9.jpg"];
var cr = 0;
var wr = 0;
var nr = 0;

window.onload = function(){

  hide("p", "fast");
  displayImage(); 
  startSlideshow ();
  
  $('#reset').click (function() {
    reset(); 
    startSlideshow ();    
  });

  $('#start').click (function() {
    start();      
  }); 
  
  $('#done').click (function() {
    done();      
       
  });
}
function newElements (i,j,y){
  newDiv("div" ,"#image-holder", "result");
  $("#result").html("<h1>Mickey Mouse Trivia</h1> <br><h1> All Done!</h1> <br> <h9>Correct Answer: </h9>" + i + "<br><h9> Incorrect Answer: </h9> " + j + "<br><h9> Unanswer: </h9>" + y);
}

function newDiv (child, parent, id){
  var div = $( '<' + child + ' id=' + id + '>');
  $(parent).append(div);
}

function hide (element, value){
  $(element).hide(value);
}

function show (element,value){
  $(element).show(value);
}

function reset(){
  time = 120;
  clearTimeout(windowTimeout);
  clearInterval(counter);
  $('#display').html('00:00'); 
  show("#image-holder","slow"); 
  displayImage(); 
  hide("p", "slow");     
}

function start(){
  cr = 0;
  wr = 0;
  nr = 0;
  counter = setInterval(count, 1000);
  windowTimeout = setTimeout(done, 120000);
  hide("#image-holder","slow"); 
  stopSlideshow ();
  show("p" ,"slow"); 
  unchecked();
  
}

function done(){
  var $RButtons = $('input[type="radio"]');
  var tempArray = new Array();
  var i = 0;
  var j = 0;
  var y = 0;

  stopSlideshow ();
  reset(); 
  hide("img", "slow");
  $("img").remove();
  
      
  jQuery.each($RButtons, function () {
    if ($(this).is(':checked') & $(this).attr('value') == "right") {
      i++;
    } else if($(this).is(':checked')& $(this).attr('value') == "wrong") {
      j++;
    } else {
      y++;
    }

  });   
  cr = i;
  wr = j;
  nr = 15 - (i+j);
  newElements (cr,wr,nr);
 
}

 function count(){
  time --;
  var converted = timeConverter(time);
  $('#display').html(converted);
}
function timeConverter(t){
  var minutes = Math.floor(t/60);
  var seconds = t - (minutes * 60);
  if (seconds < 10){
    seconds = "0" + seconds;
  }
  if (minutes === 0){
    minutes = "00";
  } else if (minutes < 10){
    minutes = "0" + minutes;
  }
    return minutes + ":" + seconds;
}

function displayImage (){
  $('#image-holder').html('<img src='+images[imgCount]+ ' width="300px" height="300px">');
}

function nextImage (){
  imgCount++;
  $('#image-holder').html('<img src="assets/images/loading.gif" width="150px"/>');
  setTimeout(displayImage, 1000);
  if (imgCount==images.length){
      imgCount = 0;
  }
}
function startSlideshow (){
  
  showImage = setInterval(nextImage, 4000);
}
function stopSlideshow () {  
  clearInterval(showImage);
}

function unchecked (){
  var $RButtons = $('input[type="radio"]');
   jQuery.each($RButtons, function () {
   $(this).prop( "checked", false );

  }); 

}

