const card = document.getElementsByClassName("card")

class Tilt {
  constructor(tilt_card, tilt_strength, tilt_x, tilt_y, float, scale, startX, startY, reverse, page, reset) {
    this.tilt_card = tilt_card
    this.tilt_strength = tilt_strength
    this.tilt_x = tilt_x || 'true'
    this.tilt_y = tilt_y || 'true'
    this.float = float || 0
    this.scale = scale || 1
    this.startX = startX || 0
    this.startY = startY || 0
    this.reverse = reverse || 'false'
    this.page = page || 'false'
    this.reset = reset || 'false'
    this.card_data = tilt_card.getBoundingClientRect()
  }

  update() {
    this.tilt_card.style.cssText = `transition: all 200ms ease ; transform: perspective(500px) rotateY(${this.startY}deg) rotateX(${this.startX}deg);`
    this.child = this.tilt_card.children
    Array.from(this.child).forEach(childs => {
      childs.style.cssText = `transform: translateZ(${this.float}px);`
    });

    this.tilt = (e) => {
      if (this.tilt_x === "true") {
        if (this.page === "true") {
          this.rotateX = (e.clientY - (window.innerHeight / 2)) / this.tilt_strength
        } else {
          this.rotateX = ((e.clientY - this.card_data.y) - this.card_data.height / 2) / this.tilt_strength
        }
      } else {
        this.rotateX = 0
      }
      if (this.tilt_y === "true") {
        if (this.page === "true") {
          this.rotateY = (e.clientX - (window.innerWidth / 2)) / this.tilt_strength
        } else {
          this.rotateY = ((e.clientX - this.card_data.x) - this.card_data.width / 2) / this.tilt_strength
        }
      } else { this.rotateY = 0 }

      if (this.reverse === "true") {
        this.final_rotateX = -this.rotateX
        this.final_rotateY = this.rotateY
      } else {
        this.final_rotateX = this.rotateX
        this.final_rotateY = -this.rotateY
      }

      this.tilt_card.style.cssText = `transform: scale(${this.scale})perspective(500px) rotateY(${this.final_rotateY}deg) rotateX(${this.final_rotateX}deg);`
    }

    if (this.page === "true") {
      document.addEventListener("mousemove", (e) => {
        this.tilt(e)
      })
    } else {
      this.tilt_card.addEventListener("mousemove", (e) => {
        this.tilt(e)
      })
    }

    this.tilt_card.addEventListener("mouseleave", () => {
      if (this.reset === "false") {
        this.tilt_card.style.cssText = `transition: all 200ms ease ; transform: perspective(500px) rotateY(${this.startY}deg) rotateX(${this.startX}deg);`
      }
    })
  }
}

Array.from(card).forEach(cards => {
  cards_tilt_strength = cards.getAttribute("tilt_strength")
  cards_tilt_x = cards.getAttribute("tilt_x")
  cards_tilt_y = cards.getAttribute("tilt_y")
  cards_tilt_float = cards.getAttribute("tilt_float")
  cards_tilt_scale = cards.getAttribute("tilt_scale")
  cards_tilt_StartX = cards.getAttribute("tilt_StartX")
  cards_tilt_StartY = cards.getAttribute("tilt_StartY")
  cards_tilt_reverse = cards.getAttribute("tilt_reverse")
  cards_tilt_page = cards.getAttribute("tilt_page")
  cards_tilt_reset = cards.getAttribute("tilt_reset")
  cards = new Tilt(cards, cards_tilt_strength, cards_tilt_x, cards_tilt_y, cards_tilt_float, cards_tilt_scale, cards_tilt_StartX, cards_tilt_StartY, cards_tilt_reverse, cards_tilt_page, cards_tilt_reset)
  cards.update()
});