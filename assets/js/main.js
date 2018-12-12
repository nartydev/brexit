import {Button } from './Button.js'

const menuBurger = document.querySelector('.menu-burger')
const menuContainer = document.querySelector('.side-menu-container')

menuBurger.addEventListener('click', () => {
  menuBurger.classList.toggle('menu-burger-open-animation')
  menuBurger.classList.toggle('menu-burger-close-animation')
  menuContainer.classList.toggle('menu-container-open')
  menuContainer.classList.toggle('menu-container-close')
})
