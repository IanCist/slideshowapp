let mCurrentIndex = 0 // Tracks the current image index
let mImages = [] // Array to hold GalleryImage objects
const mUrl = 'images.json' // Replace with actual JSON URL
const mWaitTime = 5000 // Timer interval in milliseconds
let isPaused = false;

$(document).ready(() => {
   $('.details').hide() // Hide details initially

  startTimer();

  $('#moreIndicator').click(function () {
    $(this).toggleClass('rot90 rot270');
    $('.details').slideToggle();
  });

  $('#nextPhoto').click(showNextPhoto);
  $('#prevPhoto').click(showPrevPhoto);
  $('#pauseButton').click(togglePause)
  
  fetchJSON();
});

// Function to fetch JSON data and store it in mImages
function fetchJSON () {
  $.ajax({
    url: mUrl,
    dataType: 'json',
    success: function (data) {
      mImages = data.images;
      swapPhoto();
    },
  });
}

// Function to swap and display the next photo in the slideshow
function swapPhoto () {
 const currentImage = mImages[mCurrentIndex];

 $('#photo').attr('src', currentImage.imgPath);
 $('.location').text(`Location: ${currentImage.imgLocation}`);
    $('.description').text(`Description: ${currentImage.description}`);
    $('.date').text(`Date: ${currentImage.date}`);
}

// Advances to the next photo, loops to the first photo if the end of array is reached
function showNextPhoto() {
  if (!isPaused) { // Only advance if not paused
    mCurrentIndex = (mCurrentIndex + 1) % mImages.length;
    swapPhoto();
  }
}

// Goes to the previous photo, loops to the last photo if mCurrentIndex goes negative
function showPrevPhoto () {
  mCurrentIndex = (mCurrentIndex - 1 + mImages.length) % mImages.length;
  swapPhoto();
}

// Starter code for the timer function
function startTimer () {
 setInterval(showNextPhoto, mWaitTime);
}

function stopTimer() {
  clearInterval(mTimer);
  mTimer = null;
}


function togglePause() {
  isPaused = !isPaused;
  $('#pauseButton').text(isPaused ? 'Play' : 'Pause');
}
