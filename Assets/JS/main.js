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
  constructor({ carousel_box = undefined, want_controller = true, content = undefined, visible_cards = undefined, gap = 30, overflow = true, navigate = true, navigate_speed = 300, loop = false, cover = true, transition_speed = 300, transition_type = 'ease', autoplay = false, autoplay_time = 1000, autoplay_speed = 300, hover_Pause = true, auto_height = false, center = false, padding = 0 }) {
    this.carousel_box = carousel_box;
    this.want_controller = want_controller;
    this.btn_box = document.createElement('div');
    this.prev_btn = document.createElement('div');
    this.next_btn = document.createElement('div');
    this.carousel_box_width = this.carousel_box.offsetWidth;
    this.carousel_cards = this.carousel_box.children;
    this.carousel_card_number = this.carousel_box.children.length;
    this.carousel_card_width = undefined || [];
    this.carousel_card_height = undefined || [];
    this.carousel_wrapper = document.createElement('div');
    this.cover = cover;
    this.carousel_width = undefined;
    this.gap = gap;
    this.count = 0;
    this.content = content;
    this.visible_cards = visible_cards;
    this.remain_next = this.carousel_card_number - this.visible_cards;
    this.overflow = overflow;
    this.navigate = navigate;
    this.navigate_speed = navigate_speed
    this.navigate_box = document.createElement('div');
    this.navigate_length = this.carousel_card_number;
    this.loop = loop;
    this.carousel_move = undefined;
    this.transition_speed = transition_speed;
    this.transition_type = transition_type;
    this.autoplay = autoplay;
    this.autoplay_time = autoplay_time;
    this.autoplay_speed = autoplay_speed
    this.animate = undefined;
    this.hover_Pause = hover_Pause;
    this.first_cloned_cards = []
    this.carousel_move_offset = 0
    this.auto_height = auto_height
    this.cards_visible = undefined
    this.center = center
    this.center_offset = 0
    this.padding = padding
    this.class_index = 0
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  #loopCloneCardsMaker() {
    if (this.loop) {
      if (this.carousel_card_number > 1) {
        for (let i = (this.carousel_card_number - this.visible_cards); i < this.carousel_card_number; i++) {
          this.cloned_cards = this.carousel_cards[i].cloneNode(true);
          this.cloned_cards.classList.add("Cloned");
          this.first_cloned_cards.push(this.cloned_cards)
        }
        for (let i = 0; i < this.visible_cards; i++) {
          this.cloned_cards = this.carousel_cards[i].cloneNode(true);
          this.cloned_cards.classList.add("Cloned");
          this.carousel_box.appendChild(this.cloned_cards);
        }
        for (let i = this.visible_cards - 1; i >= 0; i--) {
          this.carousel_box.insertBefore(this.first_cloned_cards[i], this.carousel_box.firstChild);
        }
      }
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  #carouselButtonMaker() {
    if (this.want_controller) {
      this.carousel_wrapper.appendChild(this.btn_box);
      this.btn_box.appendChild(this.prev_btn);
      this.btn_box.style.cssText = `display: flex; gap: 5px; justify-content: center`
      this.prev_btn.classList.add("prev");
      this.prev_btn.style.cssText = `width: 50px; height: 50px; border-radius: 5px; background: #f5f5f5; border: 1px solid #e5e5e5;`;
      this.btn_box.appendChild(this.next_btn);
      this.next_btn.classList.add("next");
      this.next_btn.style.cssText = `width: 50px; height: 50px; border-radius: 5px; background: #f5f5f5; border: 1px solid #e5e5e5;`;
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  #carouselCardsWidthDefine() {
    if (this.cover) {
      this.carousel_card_width = ((this.carousel_width - (this.padding * 2)) - ((this.visible_cards - 1) * this.gap)) / this.visible_cards;
      Array.from(this.carousel_box.children).forEach(carousel_cards => {
        this.carousel_card_height.push(carousel_cards.offsetHeight);
        carousel_cards.style.setProperty("width", this.carousel_card_width + "px");
      })
    } else if (this.carousel_card_number > 1) {
      Array.from(this.carousel_box.children).forEach(carousel_cards => {
        this.carousel_card_width.push(carousel_cards.offsetWidth);
        this.carousel_card_height.push(carousel_cards.offsetHeight);
      })
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  #navigateDotsMaker() {
    if (this.navigate) {
      this.navigate_box.classList.add('navigate_box')
      this.navigate_box.style.cssText = `display: flex; gap: 5px; justify-content: center; height: 15px; align-items: center;`;
      if (!this.loop) {
        this.navigate_dots_number = this.carousel_card_number - (this.visible_cards - 1);
      } else {
        this.navigate_dots_number = this.carousel_card_number + 1;
      }
      for (let i = 0; i < this.navigate_dots_number; i++) {
        this.navigate_dots = document.createElement('div');
        this.navigate_dots.style.cssText = `width: 5px; height: 5px; background: #D6D6D6; border-radius: 50%;`;
        this.navigate_box.appendChild(this.navigate_dots);
      }
      Array.from(this.navigate_box.children)[this.count].style.setProperty("background", "#979797");
      this.carousel_wrapper.appendChild(this.navigate_box);
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  #carouselMoveOffsetDefiner() {
    if (this.loop && this.cover) {
      for (let i = 0; i < this.visible_cards; i++) {
        this.carousel_move_offset += (this.carousel_card_width + this.gap);
      }
    } else if (this.loop) {
      for (let i = 0; i < this.visible_cards; i++) {
        this.carousel_move_offset += (this.carousel_card_width[i] + this.gap);
      }
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  create() {
    this.carousel_box.style.setProperty("display", `flex`);
    this.carousel_box.style.setProperty("gap", this.gap + `px`);
    this.carousel_wrapper.classList.add('carousel_wrapper');
    this.carousel_wrapper.style.setProperty("padding", `0px ` + this.padding + `px`);

    this.#loopCloneCardsMaker()

    this.carousel_box.parentNode.insertBefore(this.carousel_wrapper, this.carousel_box);
    this.carousel_width = this.carousel_wrapper.offsetWidth;

    this.#carouselCardsWidthDefine()

    this.#carouselMoveOffsetDefiner()

    this.carousel_wrapper.appendChild(this.carousel_box);

    this.#navigateDotsMaker()

    this.#carouselButtonMaker()

    this.carousel_wrapper.style.setProperty("overflow", this.overflow ? "hidden" : "visible");
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  #centerOffsetCalculator(movecount) {
    if (this.center) {
      if (this.cover && this.carousel_card_number > 1) {
        if (this.visible_cards % 2 === 0) {
          this.center_offset = ((this.carousel_card_width + this.gap) / 2) - ((this.carousel_card_width + this.gap) * (this.visible_cards / 2))
        } else if (this.visible_cards % 2 === 1) {
          this.center_offset = 0 - (this.carousel_card_width + this.gap) * (Math.floor(this.visible_cards / 2))
        }
      } else if (this.carousel_card_number > 1) {
        for (let i = movecount; i < movecount + this.visible_cards; i++) {
          this.center_offset = (this.carousel_card_width[i + 1] / 2) - (this.carousel_width / 2) + this.padding
        }
      }
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  #countCardsToReachWidth(cardWidths, mainWidth) {
    this.totalWidth = 0;
    this.cardCount = 0;
    for (let width of cardWidths) {
      this.totalWidth += (width + this.gap);
      this.cardCount++;
      if (this.totalWidth >= mainWidth) {
        break;
      }
    }
    return this.cardCount;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  #finalHeightFinder(movecount, comapare_to) {
    this.sub_height = this.carousel_card_height.slice(movecount + this.visible_cards, movecount + comapare_to);
    this.final_height = Math.max(...this.sub_height);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  #indexCalculator(movecount) {
    if (this.loop && this.center) {
      if (this.visible_cards % 2 === 1) {
        this.class_index = (movecount + this.visible_cards) - Math.floor(this.visible_cards / 2)
      } else {
        this.class_index = (movecount + this.visible_cards) - (this.visible_cards % 2) - 1
      }
    } else if(this.center){
      this.class_index = movecount
    } else {
      this.class_index = movecount + this.visible_cards
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  #carouselHeightDefiner(movecount) {
    if (this.auto_height && this.carousel_card_number > 1) {
      if (this.cover) {
        this.#finalHeightFinder(movecount, this.visible_cards * 2)
        this.carousel_box.style.setProperty("height", this.final_height + 'px');
      } else {
        this.cards_visible = this.#countCardsToReachWidth(this.carousel_card_width.slice(movecount + this.visible_cards), this.carousel_width)
        this.#finalHeightFinder(movecount, this.cards_visible + this.visible_cards)
        this.carousel_box.style.setProperty("height", this.final_height + 'px');
      }
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  #carouselMoveDefiner(movecount, movespeed) {
    this.carousel_box.style.setProperty("transition", `all ${this.transition_type} ${movespeed}ms`);
    this.carousel_move = 0;
    if (this.cover) {
      this.carousel_move = (this.carousel_card_width + this.gap) * movecount;
    } else {
      for (let i = 0; i < movecount; i++) {
        this.carousel_move += (this.carousel_card_width[i + this.visible_cards] + this.gap);
      }
      this.#centerOffsetCalculator(movecount);
    }
    this.carousel_box.style.setProperty("transform", `translateX(${-(this.carousel_move + this.carousel_move_offset + this.center_offset)}px)`);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  #carouselClassHandler() {
    Array.from(this.carousel_cards).forEach(carousel_cards => {
      carousel_cards.classList.remove("active", "center", "first_center", "last_center", "first_active", "last_active");
    })
    if (this.carousel_card_number > 1) {
      for (let i = this.class_index; i < this.class_index + this.visible_cards; i++) {
        this.carousel_cards[i].classList.add('active');
      }
      if (this.visible_cards % 2 === 1) {
        this.carousel_cards[this.class_index + Math.floor(this.visible_cards / 2)].classList.add("center");
      } else {
        this.carousel_cards[this.class_index + (this.visible_cards / 2)].classList.add("last_center");
        this.carousel_cards[this.class_index + (this.visible_cards / 2) - 1].classList.add("first_center");
      }
      this.carousel_cards[this.class_index].classList.add("first_active");
      this.carousel_cards[(this.class_index + this.visible_cards) - 1].classList.add("last_active");
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  updateCarouselPosition = (movecount, movespeed) => {

    this.#carouselHeightDefiner(movecount)

    this.#carouselMoveDefiner(movecount, movespeed)

    this.#carouselClassHandler()

    if (this.navigate) {
      Array.from(this.navigate_box.children).forEach(navigate_dots => {
        navigate_dots.style.setProperty("background", "#D6D6D6");
      })
      this.navigate_box.children[movecount].style.setProperty("background", "#979797");
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////

  #animteCarousel() {
    this.animate = setInterval(() => {
      this.count++;
      this.#indexCalculator(this.count)
      this.updateCarouselPosition(this.count, this.autoplay_speed);

      /////////////////////
      this.count === this.carousel_card_number ? (this.updateCarouselPosition(0, this.autoplay_speed), this.count = 0) : null;
    }, this.autoplay_time + this.autoplay_speed);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  updateCarouselContent(movecount) {
    Array.from(this.carousel_cards).forEach(carousel_cards => {
      // carousel_cards.innerHTML = ""
    })
    if (this.content != undefined && Array.isArray(this.content)) {
      this.carousel_cards[movecount].innerHTML = this.content[movecount];
    } else if (this.content != undefined) {
      this.carousel_cards[movecount].innerHTML = this.content;
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  #handleMouseEnter() {
    clearInterval(this.animate);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////

  #handleMouseLeave() {
    if (this.autoplay) {
      this.#animteCarousel();
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////

  #hoverPauseHandler() {
    if (this.hover_Pause) {
      this.carousel_box.addEventListener("mouseenter", () => { this.#handleMouseEnter() });
      this.prev_btn.addEventListener("mouseenter", () => { this.#handleMouseEnter() });
      this.next_btn.addEventListener("mouseenter", () => { this.#handleMouseEnter() });
      this.carousel_box.addEventListener("mouseleave", () => { this.#handleMouseLeave() });
      this.prev_btn.addEventListener("mouseleave", () => { this.#handleMouseLeave() });
      this.next_btn.addEventListener("mouseleave", () => { this.#handleMouseLeave() });
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  #moveUpdateHandler() {
    this.updateCarouselContent(this.count);
    this.#indexCalculator(this.count)
    this.updateCarouselPosition(this.count, this.transition_speed);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  move() {
    this.#hoverPauseHandler()

    this.prev_btn.addEventListener("click", (e) => {
      if (!this.loop) {
        if (this.count > 0 && this.count <= this.carousel_card_number - 1 && this.carousel_card_number > 1) {
          this.count--;
          this.#moveUpdateHandler()
        }
      } else {
        if (this.count >= 0 && this.count <= this.carousel_card_number - 1 && this.carousel_card_number > 1) {
          this.count--;
          this.count = (this.count < 0) ? (this.carousel_card_number - 1) : this.count;
          this.#moveUpdateHandler()
        }
      }
      if (this.carousel_card_number === 1 && this.content != undefined && Array.isArray(this.content) && this.count > 0) {
        this.count--;
        this.carousel_cards[0].innerHTML = this.content[this.count];
      }
    })

    this.next_btn.addEventListener("click", (e) => {
      if (!this.loop) {
        if (this.count < this.remain_next && this.carousel_card_number > 1) {
          this.count++;
          this.#moveUpdateHandler()
        }
      } else {
        if (this.count < this.carousel_card_number && this.carousel_card_number > 1) {
          this.count++;
          this.#moveUpdateHandler()
        }
        ///////////////////////
        this.#indexCalculator(0)
        this.count === this.carousel_card_number ? (this.updateCarouselPosition(0, this.transition_speed), this.count = 0) : null;
      }
      if (this.carousel_card_number === 1 && this.content != undefined && Array.isArray(this.content)) {
        this.count = (this.count < this.content.length - 1) ? this.count + 1 : this.count;
        this.carousel_cards[0].innerHTML = this.content[this.count];
      }
    })

    Array.from(this.navigate_box.children).forEach((navigate_dots, index) => {
      navigate_dots.addEventListener("click", () => {
        if (!this.loop) {
          if (index < this.remain_next + 1) {
            this.#indexCalculator(index)
            this.updateCarouselPosition(this.count, this.navigate_speed);
            this.count = index;
          }
        } else {
          index = (index == this.carousel_card_number) ? 0 : index;
          this.#indexCalculator(index)
          this.updateCarouselPosition(this.count, this.navigate_speed);
          this.count = index;
        }
      })
    })

    if (this.autoplay) {
      this.#animteCarousel();
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  carouselUpdate() {
    document.addEventListener("DOMContentLoaded", () => {
      this.create()
      this.#centerOffsetCalculator(0)
      this.#indexCalculator(0)
      this.move()
      this.updateCarouselPosition(0)
    })
  }
}



let carcont = ["center", "center", "center", "center", "center", "center"]
let carcont2 = ["1", "2", "3", "4", "5", "6"]
let testcar = new Carousel({ carousel_box: carcardbox, want_controller: true, content: undefined, visible_cards: 4, gap: 30, overflow: true, navigate: true, loop: false, transition_speed: 500, auto_height: false, navigate_speed: 100, center: true, padding: 40 })
testcar.carouselUpdate()
let testcar2 = new Carousel({ carousel_box: carcardbox2, want_controller: true, content: undefined, visible_cards: 3, gap: 15, overflow: true, navigate: true, loop: true, cover: false, autoplay: false, autoplay_time: 2000, auto_height: true, autoplay_speed: 2000, padding: 40, center: true })
testcar2.carouselUpdate()
let testcar3 = new Carousel({ carousel_box: carcardbox3, want_controller: true, content: carcont2, visible_cards: 1, gap: 5, overflow: false, navigate: false })
testcar3.carouselUpdate()
