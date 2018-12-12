class Button {
  constructor($container) {
    this.$container = $container
    this.$arrowContainer = this.setArrow()
    this.setCircle()
    this.setOrientation()
  }

  setArrow() {
    this.arrow = {}
    this.arrow.active = false
    if (this.$container.classList.contains('arrow-btn'))
      this.arrow.active = true

    // Arrow not active
    if (!this.arrow.active) {
      return
    }

    // Create DOM
    this.arrow.$arrowContainerAnimation = document.createElement('div')
    this.arrow.$arrowContainerAnimation.classList.add('arrow-container-all')
    this.$container.appendChild(this.arrow.$arrowContainerAnimation)

    this.arrow.$arrowContainer = document.createElement('div')
    this.arrow.$arrowContainer.classList.add('arrow-container')
    this.arrow.$arrowContainerAnimation.appendChild(this.arrow.$arrowContainer)

    this.arrow.$smallBar = document.createElement('div')
    this.arrow.$smallBar.classList.add('sml-bar-arrow')
    this.arrow.$arrowContainer.appendChild(this.arrow.$smallBar)

    this.arrow.$mainBar = document.createElement('div')
    this.arrow.$mainBar.classList.add('main-bar-arrow')
    this.arrow.$arrowContainer.appendChild(this.arrow.$mainBar)

    this.arrow.$topBar = document.createElement('div')
    this.arrow.$topBar.classList.add('top-bar-arrow')
    this.arrow.$arrowContainer.appendChild(this.arrow.$topBar)

    this.arrow.$bottomBar = document.createElement('div')
    this.arrow.$bottomBar.classList.add('bottom-bar-arrow')
    this.arrow.$arrowContainer.appendChild(this.arrow.$bottomBar)

    return this.arrow.$arrowContainer
  }

  setOrientation() {
    this.orientation = {}
    this.orientation.active = false

    if (this.$container.classList.contains('arrow-left')) {
      this.arrow.active = true
      this.$container.style.transform = 'rotate(180deg)'
    }
    if (this.$container.classList.contains('arrow-top')) {
      this.arrow.active = true
      this.$container.style.transform = 'rotate(-90deg)'
    }
    if (this.$container.classList.contains('arrow-right')) {
      this.arrow.active = true
      this.$container.style.transform = 'rotate(0deg)'
    }
    if (this.$container.classList.contains('arrow-bottom')) {
      this.arrow.active = true
      this.$container.style.transform = 'rotate(90deg)'
    }
    if (!this.orientation.active) {
      return
    }
  }
  setCircle(){
    this.circle = {}
    this.circle.active = false
    if (this.$container.classList.contains('circle-btn'))
      this.circle.active = true

    // Arrow not active
    if (!this.circle.active) {
      return
    }
    // Create DOM
    this.arrow.$circleBtn = document.createElement('div')
    this.arrow.$circleBtn.classList.add('circle-btn-css')
    this.$container.appendChild(this.arrow.$circleBtn)
  }
}

export { Button }
