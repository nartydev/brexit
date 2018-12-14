import { Button } from './Button.js'


const menuBurger = document.querySelector('.menu-burger')
const menuContainer = document.querySelector('.side-menu-container')
const menuContainerBG = document.querySelector('.fade-menu-container')
const landingContainer = document.querySelector('.landing-container')
const beginButton = document.querySelector('.landing-begin-button')
const landingTransitionContainer = document.querySelector('.landing-transition')
const landingTranstionBars = document.querySelector('.landing-transition-bar')
const allCountries = document.querySelectorAll('.countries-svg')
const $buttons = document.querySelectorAll('.main-btn')

for(const $button of $buttons)
{
    const button = new Button($button)
}

beginButton.addEventListener('click', () => {
  landingTransitionContainer.classList.toggle('landing-transition-show')
  landingTranstionBars.classList.toggle('landing-transition-bar-animation')
  setTimeout(function(){
    landingContainer.style.display = "none"
  }, 500);
  setTimeout(function(){
    landingTransitionContainer.style.display = "none"
    landingTransitionContainer.classList.toggle('landing-transition-show')
  }, 1000);
})

for (var i = 0; i < allCountries.length; i++) {
  allCountries[i].addEventListener('click', () => {
    console.log('hello')
  })
}
/* Menu burger interaction
menuBurger.addEventListener('click', () => {
  menuBurger.classList.toggle('menu-burger-open-animation')
  menuBurger.classList.toggle('menu-burger-close-animation')
  menuContainer.classList.toggle('menu-container-open')
  menuContainer.classList.toggle('menu-container-close')
  menuContainerBG.classList.toggle('fade-menu-container-open')
  menuContainerBG.classList.toggle('fade-menu-container-close')
})
*/
