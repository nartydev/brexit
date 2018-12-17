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
const landingTranstionBar1 = document.querySelector('.landing-transition-bar-1')
const landingTranstionBar2 = document.querySelector('.landing-transition-bar-2')
const qrTransitionContainer = document.querySelector('.qr-transition')
const qrTranstionBars = document.querySelectorAll('.qr-transition-bar')
const allCountries = document.querySelectorAll('.countries-svg')
const $buttons = document.querySelectorAll('.main-btn')
const contentMap = document.querySelector('.content-map')
const containerMap = document.querySelector('.container-map')
const buttonCountriesLeft = document.querySelector('.responsive-btn-left')
const buttonCountriesRight = document.querySelector('.responsive-btn-right')
const confirmCountryBtn = document.querySelector('.confirm-country')
const countryDisplay = document.querySelector('.country-name-display')
const qrCode = document.querySelector('.inner-qr-code-container')
const qrCodeBackBtn = document.querySelector('.back-qr-code-btn')
const unlockBar = document.querySelector('.unlock-bar')
const unlockTarget = document.querySelector('.target-unlock')
const allSingleCountries = document.querySelectorAll('.country-map-apparition')
const backCircle = document.querySelector('.background-circle')
  containerMap.style.display = "none"
let countryNum = 0;
let nbStars = 12
for(const $button of $buttons)
{
    const button = new Button($button)
}

const resize = () => {
  contentMap.removeAttribute("style")
  clearClass()
  countryNum = 0;
  allCountries[data.countries[countryNum].svg_id].classList.add('countries-svg-selected')
}
// listen to resize
window.addEventListener('resize', resize)
resize()

function transitionLanding(){
  landingTransitionContainer.classList.toggle('landing-transition-show')
  landingTranstionBar1.classList.toggle('landing-transition-bar-animation-1')
  landingTranstionBar2.classList.toggle('landing-transition-bar-animation-2')
  setTimeout(function(){
    landingContainer.style.display = "none"
    containerMap.style.display = "flex"
  }, 500);
  setTimeout(function(){
    landingTransitionContainer.style.display = "none"
    landingTransitionContainer.classList.toggle('landing-transition-show')
  }, 1000);
  setTimeout(function(){
    for (var i = 0; i < allSingleCountries.length; i++) {
      allSingleCountries[i].style.transitionDelay = `${Math.random()*2}s`
      allSingleCountries[i].style.opacity = "1"
    }
  }, 1100);
}

beginButton.addEventListener('click', () => {
  transitionLanding()
})

window.addEventListener("mousemove",  (_event) => {
    let x = event.clientX
    let y = event.clientY
    let middlex =  window.innerWidth/2
    let middley =  window.innerHeight/1.6
    let dx = Math.abs(middlex - x)
    let dy = Math.abs(middley - y)
    backCircle.style.boxShadow = `0px 0px ${(dx+dy)/2}px white`
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
  getCountryName()
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
  getCountryName()
})

confirmCountryBtn.addEventListener('click', () => {
  getCountryName()
  qrTransitionContainer.classList.toggle('qr-transition-show')
  setTimeout(function(){
    for (var i = 0; i < qrTranstionBars.length; i++) {
      qrTranstionBars[i].classList.toggle('qr-transition-bar-animation-up')
    }
  }, 10);
  setTimeout(function(){
    containerMap.style.display = "none"
    qrCode.style.display = "flex"
    qrTransitionContainer.classList.toggle('qr-transition-after')
  }, 1500);
  setTimeout(function(){
    //qrTransitionContainer.style.display = "none"
    qrTransitionContainer.classList.toggle('qr-transition-show')
    for (var i = 0; i < qrTranstionBars.length; i++) {
      qrTranstionBars[i].classList.toggle('qr-transition-bar-animation-up')
    }
  }, 2000);
})

qrCodeBackBtn.addEventListener('click', () => {
  qrTransitionContainer.classList.toggle('qr-transition-show')
  setTimeout(function(){
    qrTransitionContainer.classList.toggle('qr-transition-after')
  }, 10);
  for (var i = 0; i < qrTranstionBars.length; i++) {
    qrTranstionBars[i].classList.toggle('qr-transition-bar-animation-up')
  }
  setTimeout(function(){
    containerMap.style.display = "flex"
    qrCode.style.display = "none"
    for (var i = 0; i < qrTranstionBars.length; i++) {
      qrTranstionBars[i].classList.toggle('qr-transition-bar-animation-up')
    }
  }, 500);
  setTimeout(function(){
    //qrTransitionContainer.style.display = "none"
    qrTransitionContainer.classList.toggle('qr-transition-show')
  }, 2000);
})

function getCountryName(){
  for (let i = 0; i < allCountries.length; i++) {
    if(allCountries[i].classList.contains('countries-svg-selected')){
      for (let j = 0; j < data.countries.length; j++) {
        if(data.countries[j].svg_id == i){
          countryDisplay.innerHTML = data.countries[j].name
        }
      }
    }
  }
}

for (let i = 0; i < allCountries.length; i++) {
  allCountries[i].addEventListener('click', () => {
    clearClass()
    allCountries[i].classList.add('countries-svg-selected')
    getCountryName()
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
/* Menu burger interaction*/
menuBurger.addEventListener('click', () => {
  menuBurger.classList.toggle('menu-burger-open-animation')
  menuBurger.classList.toggle('menu-burger-close-animation')
  menuContainer.classList.toggle('menu-container-open')
  menuContainer.classList.toggle('menu-container-close')
  menuContainerBG.classList.toggle('fade-menu-container-open')
  menuContainerBG.classList.toggle('fade-menu-container-close')
})
