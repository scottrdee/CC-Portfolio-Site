import myJson from '../data/code-panels.json' assert {type: 'json'};
import {nodePlainCreator, nodeTextCreator, nodeClassCreator, nodeTextClassCreator, nodeLinkClassTextCreator, nodeImgSrcAlt} from './module-node-creators.js'

// Set up the data from the JSON file
const codePanels = myJson;
const codePanelData = codePanels.code;

// Define the working area
const scrollRegion = document.getElementsByClassName('div-code-blocks')[0];

// Horizontal display timer
let dwellHRTimer = document.getElementById('hr-timer') // So, why isn't this working now? 


 class CodeBlock {
    constructor(img, alt, type, name, languages, purpose, link, linkTitle) {
        // essential information for the display 
        

        // Div for the events
        const codeBlock = nodeClassCreator('div', scrollRegion, 'code-block');

        // Craft image, append first to code block
        const codeImg = nodeImgSrcAlt(codeBlock, img, alt);

        // Title, with <em> for type and normal text (h3) for name
        const codeTitle = nodePlainCreator('h3', codeBlock);
        const codeType = nodeTextCreator('em', codeTitle, type + " ");
        const codeName = document.createTextNode(name);
        codeTitle.appendChild(codeName);
        
        // Languages section. Span first, then languages
        const languageSection = nodePlainCreator('p', codeBlock);
        const languageLine = nodeTextClassCreator('span', languageSection, 'Languages: ', 'code-section-title');
        const languageList = document.createTextNode(languages);
        languageSection.appendChild(languageList);

        // Function section (text block)
        const functionSection = nodePlainCreator('p', codeBlock)
        const functionLine = nodeTextClassCreator('span', functionSection, 'Function: ', 'code-section-title');
        const functionWords = document.createTextNode(purpose);
        functionSection.appendChild(functionWords);

        // Link to code
        const linkSection = nodeLinkClassTextCreator(codeBlock, linkTitle, link);
    }
}

for (let i = 0; i < codePanelData.length; i++) {
    new CodeBlock(codePanelData[i].img, codePanelData[i].imgalt, codePanelData[i].type, codePanelData[i].name, codePanelData[i].lang, codePanelData[i].function, codePanelData[i].link, codePanelData[i].linkname);
}

let codeBlockChildren = document.getElementsByClassName('code-block'); // array of items

// codeBlockChildren[0].style.opacity = 1;

// Set starting values for first animation runthrough
let opacityTimer = 100; // start with 1.0 opacity on element 0
let opacityDirection = 'stay'; // alternatives: up, down, stay, pause
let currentIndex = 0; // The current item, to be checked at the start. Don't throw any errors, please!
let dwellTimer = 0; // The pause timing when at full opacity
let dwellLimit = 200; // how long should we wait for... And, for different 'display speeds', can have a button change this value


// Create the play and pause button sections
let playButton = document.getElementById('play-button');
let pauseButton = document.getElementById('pause-button');

// Create the arrow buttons
let leftArrow = document.getElementById('left-arrow');
let rightArrow = document.getElementById('right-arrow');

// Denote the containing div
let controlButtons = document.getElementsByClassName('control-buttons')[0]


function animate() {
    requestAnimationFrame(animate);

    // first loop starts with the dwell...
    if (opacityDirection == 'stay' && dwellTimer < dwellLimit) {
        dwellTimer++;
        dwellHRTimer.style.opacity = 1;
    }

    if (dwellTimer >= dwellLimit) {
        opacityDirection = 'down'; // start that opacity moving down
        dwellTimer = 0; // reset for the next dwell
        dwellHRTimer.style.opacity = 0;
    }

    if (opacityDirection == 'down' && opacityTimer > 0) {
        opacityTimer--; // starting the downward opacity. Will bottom out at 0, where next phase begins
    }

    if (opacityDirection == 'down' && opacityTimer == 0) {
        codeBlockChildren[currentIndex].style.display = 'none'; // first turn off the current show panel
        currentIndex++;
        if (currentIndex >= codeBlockChildren.length) {
            currentIndex = 0; // to reset before error on next line
        }
        codeBlockChildren[currentIndex].style.display = 'block'
        
        opacityDirection = 'up'; // time to flip things around
    }

    if (opacityDirection == 'up' && opacityTimer < 100) {
        opacityTimer++;
        dwellHRTimer.style.opacity = opacityTimer/100; 
    }

    if (opacityDirection == 'up' && opacityTimer == 100) {
        opacityDirection = 'stay';
    }

    codeBlockChildren[currentIndex].style.opacity = opacityTimer/100; // opacity is a fraction of 1, so...

    // Displayed dwell timer
    dwellHRTimer.style.width = ((dwellLimit - dwellTimer)/dwellLimit)*100+ "px"; 

    //console.log(currentIndex)

    if (window.location.href.includes('page-four')) {
        controlButtons.style.opacity = 1;
    } else {
        controlButtons.style.opacity = 0;
    }
}

playButton.onclick = function() {
    playButton.style.display = 'none';
    pauseButton.style.display = 'unset';
    opacityDirection = 'stay';
    dwellTimer = 0;
}

pauseButton.onclick = function() {
    pauseButton.style.display = 'none';
    playButton.style.display = 'unset';
    opacityDirection = 'pause';
    opacityTimer = 100;
}

leftArrow.onclick = function() {
    playButton.style.display = 'unset';
    pauseButton.style.display = 'none';
    opacityDirection = 'pause';
    opacityTimer = 100;
    codeBlockChildren[currentIndex].style.display = 'none';
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = codeBlockChildren.length - 1;
    }
    codeBlockChildren[currentIndex].style.display = 'unset';
}

rightArrow.onclick = function() {
    playButton.style.display = 'unset';
    pauseButton.style.display = 'none';
    opacityDirection = 'pause';
    opacityTimer = 100;
    codeBlockChildren[currentIndex].style.display = 'none';
    currentIndex++;
    if (currentIndex > codeBlockChildren.length - 1) {
        currentIndex = 0;
    }
    codeBlockChildren[currentIndex].style.display = 'unset';
}

animate(); // Get this gravy train rolling