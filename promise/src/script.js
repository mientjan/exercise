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
      TweenLite.to(element, duration, {opacity: 1});
      TweenLite.to(element, duration, {x: x, y: y, onComplete: resolve, delay: duration});
  });
}

var imagesUrls = [
    "./assets/001-yawn.png",
    "./assets/002-wink.png",
    "./assets/003-smile-1.png",
    "./assets/004-smile.png",
    "./assets/005-surprise.png",
    "./assets/006-shockeda.png",
    "./assets/007-sceptica.png",
    "./assets/008-sad-2a.png",
    "./assets/009-sad-1a.png",
    "./assets/010-happy-3a.png",
    "./assets/011-paina.png",
    "./assets/012-muteda.png",
    "./assets/013-meha.png",
    "./assets/014-laugha.png",
    "./assets/015-illa.png",
    "./assets/016-happy-2a.png",
    "./assets/017-happy-1a.png",
    "./assets/018-cutea.png",
    "./assets/019-cryinga.png",
    "./assets/020-crazya.png",
    "./assets/021-coola.png",
    "./assets/022-boreda.png",
    "./assets/023-blusha.png",
    "./assets/024-sadaaa.png",
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
            loadImage(elem)
                .then(elem => {
                    successArray.push(elem);
                    imagesContainer.appendChild(elem);
                    resolve();
                })
                .catch(e => {
                    var divError = document.createElement("div");
                    divError.className = "error";
                    console.log(e);
                    divError.setAttribute("wrongUrl", e.path[0].currentSrc);

                    errorsContainer.appendChild(divError);
                    reject(e);
                });
        })
    });
}

var imagesIndex = 0;
var animDuration = .25;
var containerProperties = imagesContainer.getBoundingClientRect();

function animateNextImage() {
    console.log("animating a single image...");
    var currentImage = successArray[imagesIndex];
    var currentImageProperties = currentImage.getBoundingClientRect();

    var containerTop = "0px";
    var containerRight = (containerProperties.width - currentImageProperties.left) + "px";
    var containerBottom = (containerProperties.height - currentImageProperties.height + containerProperties.top - currentImageProperties.top) + "px";
    var containerLeft = "0px";


    animate(currentImage, animDuration, containerRight, containerTop)
        .then(() => {
            return animate(currentImage, animDuration, containerRight, containerBottom);
        })
        .then(() => {
            return animate(currentImage, animDuration, containerLeft, containerBottom);
        })
        .then(() => {
            return animate(currentImage, animDuration, containerLeft, containerTop);
        })
        .then(() => {
            TweenMax.to(currentImage, animDuration, {background: "green"})
        })
        .then(() => {
            imagesIndex++;
            if (imagesIndex === successArray.length) {
                var finishedDiv = document.querySelector(".finishedDiv");
                TweenMax.to(finishedDiv, .5, {opacity: 1});
            } else {
                animateNextImage();
            }
        })
        .catch(err => {
            console.error(err);
        });
}

loadImages(imagesUrls)
    .then(() => {
        animateNextImage();
    })
    .catch(e => {
        console.log("some error happened: ", e)
    });
