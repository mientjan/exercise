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
    TweenLite.to(element, duration, { x: x, y: y, onComplete: resolve });
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

var promiseArray = [];

imagesUrls.forEach(function(url){
  promiseArray.push(loadImage(url)
    // .catch(function(err) { 
    //   var divError = document.createElement("div"); 
    //   divError.className = "error"; 
    //   errorsContainer.appendChild(divError);
    //   var css = "padding: 10px; background: #222; color: #bada55";
    //   var string = err.path["0"].currentSrc;
    //   console.log('%c WRONG URL: ' + string, css);
    // })
  );
});

var promises = Promise.all(promiseArray);

promises
  .then(function(images){

    console.log("promiseArray: ", promiseArray);

    images.forEach(function(actualImage){
      imagesContainer.appendChild(actualImage);
    })

    var currentIndex = 0;

    function loopAnimation() {
      var currentImage = images[currentIndex];
      animate(currentImage, .1, '650px', '0px')
        .then(() => {
          return animate(currentImage, .1, '650px', '750px');
        })
        .then(() => {
          return animate(currentImage, .1, '0px', '750px');
        })
        .then(() => {
          return animate(currentImage, .1, '0px', '0px');
        })
        .then(() => {
          currentIndex++;

          if (currentIndex === images.length) {
            console.log('finished')
          } else {
            loopAnimation();
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
    
    loopAnimation();
    
  })