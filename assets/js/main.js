import { Button } from './Button.js'

const data = {
    countries: [
      {
        name: "France",
        svg_id: 1,
        posx: "82%",
        posy: "-28%"
      },{
        name: "Allemagne",
        svg_id: 4,
        posx: "44%",
        posy: "-15%"
      },{
        name: "Espagne",
        svg_id: 0,
        posx: "117%",
        posy: "-52%"
      },{
        name: "Italie",
        svg_id: 3,
        posx: "40%",
        posy: "-52%"
      },{
        name: "UK",
        svg_id: 2,
        posx: "94%",
        posy: "8%"
      }
    ]
  }


const menuBurger = document.querySelector('.menu-burger')
const menuContainer = document.querySelector('.side-menu-container')
const menuContainerBG = document.querySelector('.fade-menu-container')
const landingContainer = document.querySelector('.landing-container')
const beginButton = document.querySelector('.landing-begin-button')
const landingTransitionContainer = document.querySelector('.landing-transition')
const landingTranstionBars = document.querySelector('.landing-transition-bar')
const allCountries = document.querySelectorAll('.countries-svg')
const $buttons = document.querySelectorAll('.main-btn')
const contentMap = document.querySelector('.content-map')
const buttonCountriesLeft = document.querySelector('.responsive-btn-left')
const buttonCountriesRight = document.querySelector('.responsive-btn-right')
let countryNum = 0;
for(const $button of $buttons)
{
    const button = new Button($button)
}

const resize = () => {
  contentMap.removeAttribute("style")

}
// listen to resize
window.addEventListener('resize', resize)
resize()

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

buttonCountriesLeft.addEventListener('click', () => {
  clearClass()
  if(countryNum == 0){
    countryNum = data.countries.length-1
  }else{
    countryNum--
  }
  goToCountry(data.countries[countryNum].posx,data.countries[countryNum].posy,4)
  allCountries[data.countries[countryNum].svg_id].classList.add('countries-svg-selected')
})
buttonCountriesRight.addEventListener('click', () => {
  clearClass()
  if(countryNum == data.countries.length-1){
    countryNum = 0
  }else{
    countryNum++
  }
  goToCountry(data.countries[countryNum].posx,data.countries[countryNum].posy,4)
  allCountries[data.countries[countryNum].svg_id].classList.add('countries-svg-selected')
})

for (var i = 0; i < allCountries.length; i++) {
  allCountries[i].addEventListener('click', () => {
    console.log('hello')
  })
}

function clearClass(){
  for (var i = 0; i < allCountries.length; i++) {
    allCountries[i].classList.remove('countries-svg-selected')
  }
}

function goToCountry(tposx, tposy, dscale){
  contentMap.style.transform = `translate(${tposx},${tposy}) scale(3)`
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
