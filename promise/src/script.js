/**
 * loadImage load a image with a promise structure
 * @param url
 * @return {Promise <any>}
 */
function loadImage(url) {
  return new Promise(function(resolve, reject) {
    let img = document.createElement("img");
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

let imagesUrls = [
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
let imagesContainer = document.querySelector(".imagesContainer");
let errorsContainer = document.querySelector(".errorsContainer");
let successArray = [];

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
                    let divError = document.createElement("div");
                    divError.className = "error";
                    console.log(e);
                    divError.setAttribute("wrongUrl", e.path[0].currentSrc);

                    errorsContainer.appendChild(divError);
                    reject(e);
                });
        })
    });
}


let imagesIndex = 0;
let animationDuration = .15;
let containerProperties = imagesContainer.getBoundingClientRect();

function animateNextImage() {
    console.log("animating a single image...");
    let currentImage = successArray[imagesIndex];
    let currentImageProperties = currentImage.getBoundingClientRect();

    let containerTop = 0;
    let containerLeft = 0;
    let containerRight = (containerProperties.width - currentImageProperties.left) + "px";
    let containerBottom = (containerProperties.height - currentImageProperties.height + containerProperties.top - currentImageProperties.top) + "px";

    animate(currentImage, animationDuration, containerRight, containerTop)
        .then(() => {
            return animate(currentImage, animationDuration, containerRight, containerBottom);
        })
        .then(() => {
            return animate(currentImage, animationDuration, containerLeft, containerBottom);
        })
        .then(() => {
            return animate(currentImage, animationDuration, containerLeft, containerTop);
        })
        .then(() => {
            TweenMax.to(currentImage, animationDuration, {background: "green"})
        })
        .then(() => {
            imagesIndex++;
            if (imagesIndex === successArray.length) {
                let finishedDiv = document.querySelector(".finishedDiv");
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
