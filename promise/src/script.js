/**
 * loadImage load a image with a promise structure
 * @param url
 * @return {Promise <any>}
 */
function loadImage(url) {
  return new Promise(function(resolve, reject) {

    var img = document.createElement("img");
    img.className = "face";

    img.onload = function() {
        console.log("onload");
        resolve(this);
    };

    img.onerror = function(e) {
        console.log("onerror");
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
  "./assets/018-cutea.png",
  "./assets/019-cryinga.png",
  "./assets/020-crazya.png",
  "./assets/021-coola.png",
  "./assets/022-boreda.png",
  "./assets/023-blusha.png",
  "./assets/024-sada.png",
  "./assets/025-happya.png"
];

/// WRITE CODE UNDER HERE
var imagesContainer = document.querySelector(".imagesContainer");
var errorsContainer = document.querySelector(".errorsContainer");
var successArray = [];

/**
 * loadImages loads recursively an array of images
 * @param arr, an array containing URLs for images
 * @return {Promise <any>}
 */
function loadImages(arr) {
    return new Promise(function(resolve, reject) {
        arr.forEach(elem => {
            console.log(elem);
            loadImage(elem)
                .then(elem => {
                    successArray.push(elem);
                    imagesContainer.appendChild(elem);
                    resolve();
                })
                .catch(e => {
                    var divError = document.createElement("div");
                    divError.className = "error";
                    errorsContainer.appendChild(divError);
                    console.log("e: ", e);
                    reject(e);
                });
        })
        console.log("!!! USE THIS !!!", successArray);

    });

    /*
    var imagesContainer = document.querySelector(".imagesContainer");
    var errorsContainer = document.querySelector(".errorsContainer");
    var successArray = [];

    arr.forEach(elem => {
        console.log(elem);
        loadImage(elem)
            .then(elem => {
                successArray.push(elem);
                imagesContainer.appendChild(elem);
            })
            .catch(e => {
                var divError = document.createElement("div");
                divError.className = "error";
                errorsContainer.appendChild(divError);
                console.log("e: ", e)
            });
    })
    console.log("!!! USE THIS !!!", successArray);
    return successArray;

    */
}

let currentIndex = 0;
let ANIMATION_DURATION = .25;

// Looping function which gets executed for each image
function animateNextImage() {
    console.log("ajsgvfliasvfgliashvflihsavflishavflisahvf")
    let currentImage = successArray[currentIndex];
    // Animating all items
    animate(currentImage, ANIMATION_DURATION, '200px', '0px')
        .then(() => {
            return animate(currentImage, ANIMATION_DURATION, '200px', '200px');
        })
        .then(() => {
            return animate(currentImage, ANIMATION_DURATION, '0px', '200px');
        })
        .then(() => {
            return animate(currentImage, ANIMATION_DURATION, '0px', '0px');
        })
        .then(() => {
            currentIndex++;

            // Checking if at the end of array
            if (currentIndex === successArray.length) {

                // All images are animated
                console.log('finished')
            } else {

                // If not starting the animation for the next item.
                animateNextImage();
            }
        })
        .catch(reason => {
            console.error(reason);
        });
}

loadImages(imagesUrls)
    .then(successArray => {
        console.log("now I need to animate them BOH", successArray);
        animateNextImage();
    })
    .catch(e => {
        console.log("some error happened: ", e)
    });


//var allImagesFinishedPromise = Promise.all(promises);




// function displayimages(images){
//     var targetimage = images.shift() /* process doggies images one at a time*/
//     if (targetimage){ // if not end of array
//         loadImage(targetimage)
//           .then(function(url){ // load image then...
//             imagesContainer.appendChild(url) // add image to DIV
//             displayimages(images) // recursion- call displayimages() again to process next image/doggy
//           })
//           .catch(function(e){ // handle an image not loading
//               console.log('Error loading ', e)
//               var divError = document.createElement("div");
//               divError.className = "error";
//               errorsContainer.appendChild(divError);
//               displayimages(images) // recursion- call displayimages() again to process next image/doggy
//           })
//     }
// }

// displayimages(imagesUrls);

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