// TLIT EFFECT CODE STARTS HERE

const tilt = document.getElementsByClassName("tilt")
let final_tilt
let tiltAttr = ["tilt_strength", "tilt_x", "tilt_y", "tilt_float", "tilt_scale", "tilt_StartX", "tilt_StartY", "tilt_reverse", "tilt_page", "tilt_reset", "tilt_infinity"]

Array.from(tilt).forEach(tilts => {
  let tiltAttrVal = tiltAttr.map(attr => tilts.getAttribute(attr));
  final_tilt = new Tilt(tilts, tiltAttrVal[0], tiltAttrVal[1], tiltAttrVal[2], tiltAttrVal[3], tiltAttrVal[4], tiltAttrVal[5], tiltAttrVal[6], tiltAttrVal[7], tiltAttrVal[8], tiltAttrVal[9], tiltAttrVal[10])
  final_tilt.update()
});

Array.from(final_tilt.tilt_infinity_child).forEach(tilt_infinity_childs => {
  tilt_infinity_childs.style.cssText = `width:${final_tilt.tilt_infinity_child_size}% ; height:${final_tilt.tilt_infinity_child_size}% ;`
})

const Copy_btn = document.getElementsByClassName("copy_btn")
Array.from(Copy_btn).forEach(Copy_btns => {
  Copy_btns.addEventListener("click", (e) => {
    default_tilt_data = Copy_btns.getAttribute("default_tilt_data")
    second_tilt_data = Copy_btns.getAttribute("second_tilt_data")
    navigator.clipboard.writeText(default_tilt_data + " " + second_tilt_data)
  })
})

// TLIT EFFECT CODE ENDS HERE

// SHADOW BOX EFFECT CODE STARTS HERE

const Shadow_box = document.getElementsByClassName("shadow_box")
let Shadow_box_final

Array.from(Shadow_box).forEach(Shadow_boxs => {
  Shadow_box_final = new Shadow(Shadow_boxs)
  Shadow_box_final.Format_list_creator()
  Shadow_box_final.Color_Update()
});

// SHADOW BOX EFFECT CODE ENDS HERE










class Carousel {
  constructor(carousel_box, want_controller, content, visible_cards, gap, overflow, navigate) {
    this.carousel_box = carousel_box
    this.want_controller = want_controller || false
    this.btn_box = document.createElement('div')
    this.prev_btn = document.createElement('div')
    this.next_btn = document.createElement('div')
    this.carousel_box_width = this.carousel_box.offsetWidth
    this.carousel_cards = this.carousel_box.children
    this.carousel_card_number = this.carousel_box.children.length
    this.carousel_card_width = this.carousel_box.children[0].offsetWidth
    this.gap = gap
    this.count = 0
    this.content = content
    this.visible_cards = visible_cards
    this.remain_next = this.carousel_card_number - this.visible_cards
    this.overflow = overflow
    this.navigate = navigate
    this.navigate_box = document.createElement('div')
    this.navigate_length = this.carousel_card_number
  }

  create() {
    this.carousel_box.style.setProperty("display", `flex`)
    this.carousel_box.style.setProperty("gap", this.gap + `px`)
    this.carousel_wrapper = document.createElement('div');
    this.carousel_wrapper.classList.add('carousel_wrapper');
    this.navigate_box.classList.add('navigate_box')
    this.navigate_box.style.cssText = `display: flex; gap: 5px; justify-content: center; height: 15px; align-items: center;`
    for (let i = 0; i < this.carousel_card_number; i++) {
      this.navigate_dots = document.createElement('div')
      this.navigate_dots.style.cssText = `width: 5px; height: 5px; background: #D6D6D6; border-radius: 50%`
      this.navigate_box.appendChild(this.navigate_dots)
    }
    Array.from(this.navigate_box.children)[this.count].style.setProperty("background", "#979797")
    this.carousel_box.parentNode.insertBefore(this.carousel_wrapper, this.carousel_box);
    this.carousel_wrapper.appendChild(this.carousel_box);
    if (this.navigate) {
      this.carousel_wrapper.appendChild(this.navigate_box);
    }
    this.carousel_wrapper.appendChild(this.btn_box);
    this.btn_box.appendChild(this.prev_btn);
    this.btn_box.style.cssText = `display: flex; gap: 5px; justify-content: center`
    this.prev_btn.classList.add("prev")
    this.prev_btn.style.cssText = `width: 50px; height: 50px; border-radius: 5px; background: #f5f5f5; border: 1px solid #e5e5e5;`
    this.btn_box.appendChild(this.next_btn);
    this.next_btn.classList.add("next")
    this.next_btn.style.cssText = `width: 50px; height: 50px; border-radius: 5px; background: #f5f5f5; border: 1px solid #e5e5e5;`
    if (this.carousel_card_number > 1) {
      this.carousel_overflow_width = (this.carousel_card_width * this.visible_cards) + (this.gap * (this.visible_cards - 1))
      this.carousel_wrapper.style.cssText = `width: ${this.carousel_overflow_width}px`
    } else {
      this.carousel_wrapper.style.cssText = `width: ${this.carousel_card_width}px`
    }
    if (this.overflow) {
      this.carousel_wrapper.style.setProperty("overflow", `hidden`)
    }
  }

  updateCarouselPosition = (movecount) => {
    this.carousel_box.style.setProperty("transition", `all ease 300ms`)
    this.carousel_box.style.setProperty("transform", `translateX(${-(this.carousel_card_width + this.gap) * movecount}px)`)
    Array.from(this.carousel_cards).forEach(carousel_cards => {
      carousel_cards.classList.remove("active", "center", "first_center", "last_center", "first_active", "last_active")
    })
    for (let i = movecount; i < this.visible_cards + movecount; i++) {
      this.carousel_cards[i].classList.add('active');
    }
    if (this.visible_cards % 2 === 1) {
      this.carousel_cards[movecount + 1].classList.add("center")
    } else {
      this.carousel_cards[movecount + (this.visible_cards / 2)].classList.add("last_center")
      this.carousel_cards[movecount + (this.visible_cards / 2) - 1].classList.add("first_center")
    }
    this.carousel_cards[movecount].classList.add("first_active")
    this.carousel_cards[movecount + this.visible_cards - 1].classList.add("last_active")
    Array.from(this.navigate_box.children).forEach(navigate_dots => {
      navigate_dots.style.setProperty("background", "#D6D6D6")
    })
    Array.from(this.navigate_box.children)[movecount].style.setProperty("background", "#979797")
  };

  move() {
    this.prev_btn.addEventListener("click", (e) => {
      if (this.count > 0 && this.count <= this.carousel_card_number - 1 && this.carousel_card_number > 1) {
        this.count--
        if (this.content != undefined && Array.isArray(this.content)) {
          this.carousel_cards[this.count].innerHTML = this.content[this.count]
        } else if (this.content != undefined) {
          this.carousel_cards[this.count].innerHTML = this.content
        }
        this.carousel_cards[this.count + 1].innerHTML = ""
        this.updateCarouselPosition(this.count)
      }
      if (this.carousel_card_number === 1 && this.content != undefined && Array.isArray(this.content) && this.count > 0) {
        this.count--
        this.carousel_cards[0].innerHTML = this.content[this.count]
      }
    })
    this.next_btn.addEventListener("click", (e) => {
      if (this.count < this.remain_next && this.carousel_card_number > 1) {
        this.count++
        this.carousel_cards[this.count - 1].innerHTML = ""
        if (this.content != undefined && Array.isArray(this.content)) {
          this.carousel_cards[this.count].innerHTML = this.content[this.count]
        } else if (this.content != undefined) {
          this.carousel_cards[this.count].innerHTML = this.content
        }
        this.updateCarouselPosition(this.count)
      }
      if (this.carousel_card_number === 1 && this.content != undefined && Array.isArray(this.content)) {
        this.count = (this.count < this.content.length - 1) ? this.count + 1 : this.count;
        this.carousel_cards[0].innerHTML = this.content[this.count]
      }
    })
    Array.from(this.navigate_box.children).forEach((navigate_dots, index) => {
      navigate_dots.addEventListener("click", () => {
        if (index < this.remain_next + 1) {
          this.updateCarouselPosition(index)
          this.count = index
        }
      })
    })
  }
}



let carcont = ["center", "center", "center", "center", "center", "center"]
let carcont2 = ["1", "2", "3", "4", "5", "6"]

let testcar = new Carousel(carcardbox, true, carcont, 3, 5, true, true)
testcar.create()
testcar.move()
let testcar2 = new Carousel(carcardbox2, true, "test", 4, 15, true, true)
testcar2.create()
testcar2.move()
let testcar3 = new Carousel(carcardbox3, true, carcont2, 1, 5, false, false)
testcar3.create()
testcar3.move()
