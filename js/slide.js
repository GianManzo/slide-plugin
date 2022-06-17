export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide)
    this.wrapper = document.querySelector(wrapper)
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this)
    this.onMove = this.onMove.bind(this)
    this.onEnd = this.onEnd.bind(this)
  }

  onStart(event) {
    event.preventDefault()
    this.wrapper.addEventListener('mousemove', this.onMove)

    console.log('mousedown')
  }

  onMove(event) {
    console.log('moveu')
  }

  onEnd() {
    this.wrapper.removeEventListener('mousemove', this.onMove)

    console.log('acabou')
  }

  addslideEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart)
    this.wrapper.addEventListener('mouseup', this.onEnd)
  }

  init() {
    this.bindEvents()
    this.addslideEvents()
    return this
  }
}
