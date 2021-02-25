// jshint esversion:6
// access DOM elements
const time = document.getElementById('time');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const todayFocus = document.querySelector('.todayFocus');
let date = new Date();

let currentPicture = date.getHours();
let firstTime = date.getHours();
let secondTime;

// make time function
function showTime () {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsNames= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = new Date();
    // day of Month
    let day = date.getDate();
    let dayString = daysOfWeek[date.getDay()];
    let monthString = monthsNames[date.getMonth()];
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    // put time in html
    time.innerHTML = `${dayString}, ${addZero(day)} ${monthString} ${addZero(hour)}<span>:</span>${addZero(minutes)}<span>:</span>${addZero(seconds)}`;

    secondTime = date.getHours();
    if (secondTime !== firstTime) {
        firstTime = secondTime;
        currentPicture += 1;
    }
    setBackground();
    setTimeout(showTime, 1000);
}

function addZero(number) {
    return (parseInt(number, 10) < 10 ? '0' + number: number);
}

function randomBodyBackgr(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

let pictureArr = [];
let local = [];
for (let i = 0; i < 24; i++) {
    local.push(i);
    if ((i + 1) % 6 === 0) {
        pictureArr = pictureArr.concat(randomBodyBackgr(local));
        local = [];
    }
}

function setBackground() {
    const img = document.createElement('img');
    const src = `assets/images/${pictureArr[currentPicture]}.jpg`;
    img.src = src;
    img.onload = () => {
        document.body.style.backgroundImage = `url(${src})`;
    };
}

function setGreeting() {
    let today = new Date();
    let hour = today.getHours();

    if (hour >= 6 && hour < 12) {
        // morning
        greeting.innerText = "Good Morning, ";
    } else if (hour >= 12 && hour < 18) {
        // afternoon
        greeting.innerText = "Good Afternoon, ";
    } else if (hour >= 18 && hour < 24) {
        // evening
        greeting.innerText = "Good Evening, ";
    } else if (hour >= 0 && hour < 6) {
        // night
        greeting.innerText = "Good Night, ";
    }
}

// get Name (contenteditable elemet)
function getName() {
    if (localStorage.getItem('name') === null) {
        localStorage.setItem('name', "[Enter Name]");
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

// set Name
function setName(e) {
    if (e.type === 'keypress') {
      if (e.which == 13 || e.keyCode == 13) {
        if (name.textContent === '') name.textContent = localStorage.getItem('name');
        localStorage.setItem('name', e.target.innerText);
        name.blur();
      }
    } else {
      if (name.textContent === '') {
        if (localStorage.getItem('name') === null) {
                name.textContent = '[Enter Name]';
            } else {
                name.textContent = localStorage.getItem('name');
            }
        }

      localStorage.setItem('name', e.target.innerText);
    }
}

//get todayFocus (contenteditable elemet)
function getFocus() {
    if (localStorage.getItem('todayFocus') === null) {
        localStorage.setItem('todayFocus', "[Enter Task]");
        todayFocus.textContent = '[Enter Task]';
    } else {
        todayFocus.textContent = localStorage.getItem('todayFocus');
    }
}

function setTodayFocus(e) {
    if (e.type === "keypress") {
        if (e.which == 13 || e.keyCode == 13) {
            if (todayFocus.textContent === '') todayFocus.textContent = localStorage.getItem('todayFocus');
            localStorage.setItem('todayFocus', e.target.innerText);
            todayFocus.blur();
        }
    } else {
        if (todayFocus.textContent === '') {
            if (localStorage.getItem('todayFocus') === null) {
                todayFocus.textContent = '[Enter Task]';
            } else {
                todayFocus.textContent = localStorage.getItem('todayFocus');
            }
        }
        localStorage.setItem('todayFocus', e.target.innerText);
    }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', function() {
    name.innerText = '';
});

todayFocus.addEventListener('keypress', setTodayFocus);
todayFocus.addEventListener('blur', setTodayFocus);
todayFocus.addEventListener('click', function() {
    todayFocus.innerText = '';
});


showTime();
setGreeting();
getName();
getFocus();

const btnForward = document.querySelector('.btn-forward');
const btnBack = document.querySelector('.btn-back');

function getImage(direction) {
    if (direction === 'forward') {
        currentPicture += 1;
    } else if (direction === 'back') {
        currentPicture -= 1;
    }
    if (currentPicture > 23) currentPicture = 0;
    if (currentPicture < 0) currentPicture = 23;
    setBackground(currentPicture);
} 

btnForward.addEventListener('click', function() {
    getImage('forward');
});

btnBack.addEventListener('click', function() {
    getImage('back');
});

function changeButtonBackgr(hour) {
    if (hour >= 0 && hour < 12) {
        btnForward.classList.add('sun');
        btnForward.classList.remove('moon');

        btnBack.classList.add('moon');
        btnBack.classList.remove('sun');
    } else if (hour >= 12 && hour < 24) {
        btnForward.classList.add('moon');
        btnForward.classList.remove('sun');

        btnBack.classList.add('sun');
        btnBack.classList.remove('moon');
    }
}

changeButtonBackgr(currentPicture);