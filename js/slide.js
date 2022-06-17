export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide)
    this.wrapper = document.querySelector(wrapper)
    this.dist = {
      finalPosition: 0,
      startX: 0,
      movement: 0
    }
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this)
    this.onMove = this.onMove.bind(this)
    this.onEnd = this.onEnd.bind(this)
  }

  moveSlide(distX) {
    this.dist.movePosition = distX
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`
  }

  uptadePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.6
    return this.dist.finalPosition - this.dist.movement
  }

  onStart(event) {
    let moveType
    if (event.type === 'mousedown') {
      event.preventDefault()
      this.dist.startX = event.clientX
      moveType = 'mousemove'
    } else {
      this.dist.startX = event.changedTouches[0].clientX
      moveType = 'touchmove'
    }
    this.wrapper.addEventListener(moveType, this.onMove)
  }

  onMove(event) {
    const pointerPosition =
      event.type === 'mousemove'
        ? event.clientX
        : event.changedTouches[0].clientX
    const finalPosition = this.uptadePosition(pointerPosition)
    this.moveSlide(finalPosition)
  }

  onEnd(event) {
    const moveType = event.type === 'mouseup' ? 'mousemove' : 'touchmove'
    this.wrapper.removeEventListener(moveType, this.onMove)
    this.dist.finalPosition = this.dist.movePosition
  }

  addslideEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart)
    this.wrapper.addEventListener('touchstart', this.onStart)
    this.wrapper.addEventListener('mouseup', this.onEnd)
    this.wrapper.addEventListener('touchend', this.onEnd)
  }

  init() {
    this.bindEvents()
    this.addslideEvents()
    return this
  }
}
