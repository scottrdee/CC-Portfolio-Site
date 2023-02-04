//import {nodePlainCreator, nodeTextCreator, nodeClassCreator, nodeTextClassCreator, nodeLinkClassTextCreator, nodeImgSrcAlt} from './module-node-creators.js'
// Need to add in 'this' menu highlight. 

// HIDDEN MENU HIDE/SHOW
const narrowNavMenuButton = document.getElementsByClassName('narrow-nav-menu-button')[0];

let narrowMenuState = 0; // Menu hidden to side
let hiddenMenuButtons = document.getElementsByClassName('hidden-menu-button');

narrowNavMenuButton.onclick = function() {
    if (narrowMenuState === 0) {
        for (let i = 0; i < hiddenMenuButtons.length; i++) {
            hiddenMenuButtons[i].style.left = '0px';
            }
            narrowMenuState = 1;
        } else {
        for (let i = 0; i < hiddenMenuButtons.length; i++) {
            hiddenMenuButtons[i].style.left = '100px';
            }
            narrowMenuState = 0;
        }
}

// GENERAL MENU LINK ACTIONS

let pageCounter = 0; // When the site loads, we're on page one. Page#1 = 0, and will change depending on different movements

let panelBGColors = {
    pageOne: '#DAFAF8',
    pageTwo: '#C1DED4',
    pageThree: '#E1F4E8',
    pageFour: '#C1DEC3',
    pageFive: '#E2FADA'
}

// Starting BG Color
document.body.style.backgroundColor = panelBGColors.pageOne;

hiddenMenuButtons[0].onclick = function() {
    pageCounter = 0;
    document.body.style.backgroundColor = panelBGColors.pageOne;
}

hiddenMenuButtons[1].onclick = function() {
    pageCounter = 1;
    document.body.style.backgroundColor = panelBGColors.pageTwo;
}

hiddenMenuButtons[2].onclick = function() {
    document.body.style.backgroundColor = panelBGColors.pageThree;
    pageCounter = 2;
}

hiddenMenuButtons[3].onclick = function() {
    document.body.style.backgroundColor = panelBGColors.pageFour;
    pageCounter = 3;
}

hiddenMenuButtons[4].onclick = function() {
    document.body.style.backgroundColor = panelBGColors.pageFive;
    pageCounter = 4;
}

// Should add marker to indicate which menu item is currently in use. Others should be normal - the one in question should be red. 

let normalMenuButtons = document.getElementsByClassName('normal-menu-button');

normalMenuButtons[0].onclick = function() {
    document.body.style.backgroundColor = panelBGColors.pageOne;
    pageCounter = 0;
}

normalMenuButtons[1].onclick = function() {
    document.body.style.backgroundColor = panelBGColors.pageTwo;
    pageCounter = 1;
}

normalMenuButtons[2].onclick = function() {
    document.body.style.backgroundColor = panelBGColors.pageThree;
    pageCounter = 2;
}

normalMenuButtons[3].onclick = function() {
    document.body.style.backgroundColor = panelBGColors.pageFour;
    pageCounter = 3;
}

normalMenuButtons[4].onclick = function() {
    document.body.style.backgroundColor = panelBGColors.pageFive;
    pageCounter = 4;
}


// OTHER BUTTON ACTIONS

function changePage(direction) {
    if (direction === 'previous') {
        pageCounter--;
    } else if (direction === 'next') {
        pageCounter++
    }

    if (pageCounter < 0) {
        pageCounter = 4;
    } else if (pageCounter > 4) {
        pageCounter = 0;
    }

    document.getElementsByClassName('normal-menu-button')[pageCounter].click()
}

// Arrow button actions have been added directly to the HTML doc

document.body.addEventListener('keydown', function(event) {
    if (event.key == 'ArrowDown' || event.key === 'ArrowRight') {
        changePage('next');
    } else if (event.key == 'ArrowUp' || event.key === 'ArrowLeft') {
        changePage('previous');
    }
})

// Maybe instead of scrolling, I can have each element fade in and out. Except I really like the scrolling... I'll have to think about it, but the fade out-in really does make this seem like a 'single-page' resume. I would have to change the 'a' to 'button', to avoid the normal link actions. Then have something that fades - wait for animation end - go hidden - unhide next - fade in. There's already a transition for background color, so maybe this isn't the best option. 

// Scroll listener doesn't work if overflow-y is hidden

// Alternative - set side as wide, all elements are width of page. Scroll sideways? 

// https://alvarotrigo.com/fullPage/#page1
// https://alvarotrigo.com/blog/web-developer-portfolio-examples/
// https://stackoverflow.com/questions/44744586/scroll-event-not-working-on-mobile

// Now to make the title disappear

// Form submission and display
const formDisplay = document.getElementsByTagName('form')[0];
const formData = document.getElementById('form-data');
const submitButton = document.getElementById('submit-button');
const resetButton = document.getElementById('reset-button');

const nameField = document.getElementById('name-field');
const emailField = document.getElementById('email-field');
const textField = document.getElementById('text-field');


function swapView() {
    // console.log(formDisplay.name.value)
    formDisplay.style.display = 'none';
    submitButton.style.display = 'none';
    resetButton.style.display = 'unset';
    formData.style.display = 'unset';

    nameField.innerHTML = formDisplay.name.value;
    emailField.innerHTML = formDisplay.email.value;
    textField.innerHTML = formDisplay.text.value;
}

function swapBack() {
    formDisplay.style.display = 'unset';
    submitButton.style.display = 'unset';
    resetButton.style.display = 'none';
    formData.style.display = 'none';
}