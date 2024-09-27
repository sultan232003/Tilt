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
  constructor(carousel_box, want_controller, content, visible_cards) {
    this.carousel_box = carousel_box
    this.want_controller = want_controller || false
    this.btn_box = document.createElement('div')
    this.prev_btn = document.createElement('div')
    this.next_btn = document.createElement('div')
    this.carousel_box_width = this.carousel_box.offsetWidth
    this.carousel_cards = this.carousel_box.children
    this.carousel_card_number = this.carousel_box.children.length
    this.carousel_card_width = this.carousel_box.children[0].offsetWidth
    this.carousel_move_offset = (this.carousel_box_width - (this.carousel_card_width * this.carousel_card_number)) / (this.carousel_card_number - 1)
    this.count = 0
    this.content = content
    this.visible_cards = visible_cards
    this.remain_next = this.carousel_card_number - this.visible_cards
  }

  create() {
    this.carousel_wrapper = document.createElement('div');
    this.carousel_wrapper.classList.add('carousel_wrapper');
    this.carousel_box.parentNode.insertBefore(this.carousel_wrapper, this.carousel_box);
    this.carousel_wrapper.appendChild(this.carousel_box);
    this.carousel_wrapper.appendChild(this.btn_box);
    this.btn_box.appendChild(this.prev_btn);
    this.btn_box.style.cssText = `display: flex; gap: 5px;`
    this.prev_btn.classList.add("prev")
    this.prev_btn.style.cssText = `width: 50px; height: 50px; border-radius: 5px; background: #f5f5f5; border: 1px solid #e5e5e5;`
    this.btn_box.appendChild(this.next_btn);
    this.next_btn.classList.add("next")
    this.next_btn.style.cssText = `width: 50px; height: 50px; border-radius: 5px; background: #f5f5f5; border: 1px solid #e5e5e5;`
  }

  updateCarouselPosition = () => {
    this.carousel_box.style.cssText = `transition: all ease 300ms; transform:translateX(${-(this.carousel_card_width + this.carousel_move_offset) * this.count}px)`;
  };

  move() {
    this.prev_btn.addEventListener("click", (e) => {
      if (this.count > 0 && this.count <= this.carousel_card_number - 1 && this.carousel_card_number > 1) {
        this.count--
        this.carousel_cards[this.count].classList.add("center")
        if (this.content != undefined && Array.isArray(this.content)) {
          this.carousel_cards[this.count].innerHTML = this.content[this.count]
        } else if (this.content != undefined) {
          this.carousel_cards[this.count].innerHTML = this.content
        }
        this.carousel_cards[this.count + 1].classList.remove("center")
        this.carousel_cards[this.count + 1].innerHTML = ""
        this.updateCarouselPosition()
      }
      if (this.carousel_card_number === 1 && this.content != undefined && Array.isArray(this.content) && this.count > 0) {
        this.count--
        this.carousel_cards[0].innerHTML = this.content[this.count]
      }
    })
    this.next_btn.addEventListener("click", (e) => {
      if (this.count < this.carousel_card_number - 1 && this.carousel_card_number > 1) {
        this.count++
        this.carousel_cards[this.count - 1].classList.remove("center")
        this.carousel_cards[this.count - 1].innerHTML = ""
        this.carousel_cards[this.count].classList.add("center")
        if (this.content != undefined && Array.isArray(this.content)) {
          this.carousel_cards[this.count].innerHTML = this.content[this.count]
        } else if (this.content != undefined) {
          this.carousel_cards[this.count].innerHTML = this.content
        }
        this.updateCarouselPosition()
      }
      if (this.carousel_card_number === 1) {
        this.count = (this.count === 0) ? 1 : this.count;
        if (this.content != undefined && Array.isArray(this.content) && this.count < this.content.length) {
          this.carousel_cards[0].innerHTML = this.content[this.count]
          this.count = (this.count < this.content.length - 1) ? this.count + 1 : this.count;
        }
      }
    })
  }
}




let carcont = ["center", "center", "center", "center", "center", "center"]
let carcont2 = ["1", "2", "3", "4", "5", "6"]

let testcar = new Carousel(carcardbox, true, carcont,3)
testcar.create()
testcar.move()
let testcar2 = new Carousel(carcardbox2, true, "test",4)
testcar2.create()
testcar2.move()
let testcar3 = new Carousel(carcardbox3, true, carcont2,1)
testcar3.create()
testcar3.move()
