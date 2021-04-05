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
// get the current menu bar 
const menuBar = document.querySelector('#navbar__list');

// get all sections as array
const sectionsList = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

// Create menu item (li) and return it
// ItemTargetId is the menu target id (li element Href) which is the section id
// ItemText is the menu text
function createMenuItem(ItemTargetId, ItemText) {
    let menuItem = document.createElement('li');
    let menuItemLink = document.createElement('a');

    menuItemLink.className = 'menu__link';
    menuItemLink.href = '#' + ItemTargetId;
    // add section id to the li elemant data
    menuItemLink.dataset.sectionId = ItemTargetId;
    menuItemLink.innerText = ItemText;

    menuItem.appendChild(menuItemLink);

    return menuItem;
}

// MenuBar onClick event handler
function onMenuBarClick(event) {
    // only run when clicking on "A" tags
    if (event.target.nodeName === "A") {
        // get section id from the data attribute (added in createMenuItem)
        const sectionId = event.target.dataset.sectionId;

        // section element
        const targetSection = document.querySelector('#' + sectionId);

        // scroll to the section 
        targetSection.scrollIntoView({ block: 'end', behavior: 'smooth' });

        // set section as active
        setSectionActive(sectionId);

        // set the clicked menu item as active
        setMenuActive(sectionId);
    }
}

// set section as active
function setSectionActive(sectionId) {
    // find the current active section by class name 
    let currentActiveSection = document.querySelector('.active__section');

    // if the input parameter sectionId is the same as the current active
    // no need to continue
    if (currentActiveSection.id !== sectionId) {
        // if both are different, add the active class to the new section
        let sectionToActive = document.querySelector('#' + sectionId);
        sectionToActive.classList.add('active__section');

        // remove the active class from the old section
        currentActiveSection.classList.remove('active__section');
    }
}

// set menu item as active
// menuSectionId is the section id related to the menu item
function setMenuActive(menuSectionId) {
    // get the current active menu item
    let currentActiveMenuItem = document.querySelector('.menu__active');

    // get the menu item that have the same section id (input parameter)
    let menuItemToActive = document.querySelector(`a[data-section-id="${menuSectionId}"]`);

    // remove the active class from the old menu item (if any)
    if (currentActiveMenuItem)
        currentActiveMenuItem.classList.remove('menu__active');

    // add active class to the new menu item
    menuItemToActive.classList.add('menu__active');
}

//check if the element is in the Viewport
function isElementInViewport(el) {
    // Source: https://upokary.com/how-to-check-if-an-element-is-visible-in-the-current-viewport-as-we-scroll/
    let rect = el.getBoundingClientRect();

    // if the bounderies inside the current Viewport
    return rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight);
}

// Scroll event handler
// check while scrolling, if the section is in the ViewPort
// if yes, then set the related menu item as active
// and set the section as active also
function setMenuActiveOnScroll() {
    for (let section of sectionsList) {
        if (isElementInViewport(section)) {
            setSectionActive(section.id);
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
