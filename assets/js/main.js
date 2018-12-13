import { Button } from './Button.js'


const menuBurger = document.querySelector('.menu-burger')
const menuContainer = document.querySelector('.side-menu-container')
const menuContainerBG = document.querySelector('.fade-menu-container')
const $buttons = document.querySelectorAll('.main-btn')

for(const $button of $buttons)
{
    const button = new Button($button)
}


menuBurger.addEventListener('click', () => {
  menuBurger.classList.toggle('menu-burger-open-animation')
  menuBurger.classList.toggle('menu-burger-close-animation')
  menuContainer.classList.toggle('menu-container-open')
  menuContainer.classList.toggle('menu-container-close')
  menuContainerBG.classList.toggle('fade-menu-container-open')
  menuContainerBG.classList.toggle('fade-menu-container-close')
})
