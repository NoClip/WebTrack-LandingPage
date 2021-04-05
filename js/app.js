/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const menuBar = document.querySelector('#navbar__list');
const sectionsList = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 *
*/
// function Init() {
//     GenerateMenuItems();
// }

function createMenuItem(ItemTargetId, ItemText) {
    let menuItem = document.createElement('li');
    let menuItemLink = document.createElement('a');

    menuItemLink.className = 'menu__link';
    menuItemLink.href = '#' + ItemTargetId;
    menuItemLink.dataset.sectionId = ItemTargetId;
    menuItemLink.innerText = ItemText;

    menuItem.appendChild(menuItemLink);

    return menuItem;
}

function onMenuBarClick(event) {
    if (event.target.nodeName === "A") {
        const targetSection = document.querySelector(event.target.hash);

        console.log(event.target.dataset.sectionId);
        targetSection.scrollIntoView();
        setSectionActive(event.target.hash.slice(1));

        setMenuActive(event.target.hash.slice(1));
    }
}

function setSectionActive(SectionId) {
    let currentActiveSection = document.querySelector('.active__section');

    if (currentActiveSection.id !== SectionId) {
        let sectionToActive = document.querySelector('#' + SectionId);
        sectionToActive.classList.add('active__section');

        currentActiveSection.classList.remove('active__section');
    }
}

function setMenuActive(menuSectionId) {
    let currentActiveMenuItem = document.querySelector('.menu__active');
    let menuItemToActive = document.querySelector(`a[data-section-id="${menuSectionId}"]`);

    if (currentActiveMenuItem)
        currentActiveMenuItem.classList.remove('menu__active');

    menuItemToActive.classList.add('menu__active');
}

function isElementInViewport(el) {
    // Source: https://upokary.com/how-to-check-if-an-element-is-visible-in-the-current-viewport-as-we-scroll/
    let rect = el.getBoundingClientRect();

    return rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight);
}

function setMenuActiveOnScroll() {
    let documentX = document.scrollTop;
    console.log();
    for (let section of sectionsList) {
        if (isElementInViewport(section)) {
            setMenuActive(section.id);
        }
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
function generateMenuItems() {
    for (let section of sectionsList) {
        let menuItem = createMenuItem(section.id, section.dataset.nav);

        menuBar.appendChild(menuItem);
    }
}

// Add class 'active' to section when near top of viewport
window.addEventListener('scroll', setMenuActiveOnScroll);

// Scroll to anchor ID using scrollTO event
function addEventListenerToMenuBar() {
    menuBar.addEventListener('click', onMenuBarClick);
}

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu 
generateMenuItems();

// Scroll to section on link click
addEventListenerToMenuBar();

// Set sections as active
