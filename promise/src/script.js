/**
 * loadImage load a image with a promise structure
 * @param url
 * @return {Promise<any>}
 */
function loadImage(url) {
  return new Promise(function(resolve, reject) {

    var img = document.createElement("img");
    img.className = "face";

    img.onload = function() {
      resolve(this);
    };

    img.onerror = function(e) {
      reject(e);
    };

    img.src = url;

  });
}

/**
 * Animate a element to a position
 * @param {HTMLElement} element
 * @param {number} duration
 * @param {number} x
 * @param {number} y
 * @return {Promise<any>}
 */
function animate(element, duration, x, y) {
  return new Promise(function(resolve) {
    TweenLite.to(element, duration, {opacity: 1, x: x, y: y, onComplete: resolve });
  });
}

var imagesUrls = [
  "./assets/001-yawn.png",
  "./assets/002-wink.png",
  "./assets/003-smile-1.png",
  "./assets/004-smile.png",
  "./assets/005-surprise.png",
  "./assets/006-shocked.png",
  "./assets/007-sceptic.png",
  "./assets/008-sad-2.png",
  "./assets/009-sad-1.png",
  "./assets/010-happy-3.png",
  "./assets/011-pain.png",
  "./assets/012-muted.png",
  "./assets/013-meh.png",
  "./assets/014-laugh.png",
  "./assets/015-ill.png",
  "./assets/016-happy-2.png",
  "./assets/017-happy-1.png",
  "./assets/018-cute.png",
  "./assets/019-crying.png",
  "./assets/020-crazy.png",
  "./assets/021-cool.png",
  "./assets/022-bored.png",
  "./assets/023-blush.png",
  "./assets/024-sad.png",
  "./assets/025-happy.png"
];

/// WRITE CODE UNDER HERE

var imagesContainer = document.querySelector(".imagesContainer");
var errorsContainer = document.querySelector(".errorsContainer");

function displayimages(images){
    var targetimage = imagesUrls.shift() // process doggies images one at a time
    if (targetimage){ // if not end of array
        loadImage(targetimage)
          .then(function(url){ // load image then...
            imagesContainer.appendChild(url) // add image to DIV
            displayimages(images) // recursion- call displayimages() again to process next image/doggy
          })
          .catch(function(e){ // handle an image not loading
              console.log('Error loading ', e)
              var divError = document.createElement("div"); 
              divError.className = "error"; 
              errorsContainer.appendChild(divError);
              displayimages(images) // recursion- call displayimages() again to process next image/doggy
          })
    }
}

displayimages(imagesUrls)

/*

imagesUrls.forEach(function(url){
 
  loadImage(url)
    .then(function(imgDomElement){
      console.log("imgDomElement", imgDomElement);
      // successArray.push(imgDomElement);
      imagesContainer.appendChild(imgDomElement);
    })
    .catch(function(errorEvent){
      var divError = document.createElement("div"); 
      divError.className = "error"; 
      errorsContainer.appendChild(divError);
    })

});


var promises = Promise.all(successArray);

var realNumberImagesLoaded = imagesUrls.length - errorArray.length;
console.log("imagesUrls.length", imagesUrls.length);
console.log("successArray.length", successArray.length);
console.log("errorArray.length", errorArray.length);
console.log("realNumberImagesLoaded", realNumberImagesLoaded);

promises
  .then(
      function(images){

      console.log("successArray: ", successArray);
      console.log("errorArray: ", errorArray);

      images.forEach(function(actualImage){
        imagesContainer.appendChild(actualImage);
        TweenMax.set(actualImage, {opacity: 0});
      })

      var index = 0;
      var animDuration = .25;

      function loopAnimation() {
        var currentImage = images[index];
        animate(currentImage, animDuration, '650px', '0px')
          .then(function(){
            return animate(currentImage, animDuration, '650px', '750px');
          })
          .then(function(){
            return animate(currentImage, animDuration, '0px', '750px');
          })
          .then(function(){
            return animate(currentImage, animDuration, '0px', '0px');
          })
          .then(function(){
            TweenMax.set(currentImage, {opacity: 0});
            index++;


            if (index === realNumberImagesLoaded) {
              console.log('finished')
            } else {
              loopAnimation();
            }
          })
          .catch(err => {
            console.warn(err);
          });
      }
      
      loopAnimation();
      
    }
  )

  */