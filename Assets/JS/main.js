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

const shadow_area_grid = document.getElementsByClassName("shadow_area_grid")[0]
let shadowCard
const shadowCards = [];
shadowList.forEach(shadow => {
    shadowCard = new ShadowCard({ shadowCode: shadow.box_shadow, hasMultipleShadows: shadow.hasMultipleShadows, colorName: shadow.colorName });
    shadowCard.createCard();
    shadowCard.extractHex()
    shadowCard.mount(shadow_area_grid);
    shadowCard.formatListUpdate();
    shadowCard.colorChanger()
    shadowCards.push(shadowCard);
});

// SHADOW BOX EFFECT CODE ENDS HERE










class Carousel {
  constructor({ carousel_box = undefined, want_controller = true, content = undefined, visible_cards = undefined, gap = 30, overflow = true, navigate = true, navigate_speed = 300, loop = false, cover = true, transition_speed = 300, transition_type = 'ease', autoplay = false, autoplay_time = 1000, autoplay_speed = 300, hover_Pause = true, auto_height = false, center = false, padding = 0, transition_animation = false, animate_in = "Default" }) {
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
    this.transition_animation = transition_animation
    this.animate_in = animate_in.toUpperCase()
    this.dragDirection = 0
    this.dragEnd = 0
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
        if (this.center) {
          this.navigate_dots_number = this.carousel_card_number;
        } else {
          this.navigate_dots_number = this.carousel_card_number - (this.visible_cards - 1);
        }
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
      } else if (this.carousel_card_number > 1 && this.loop) {
        for (let i = movecount; i < movecount + this.visible_cards; i++) {
          this.center_offset = (this.carousel_card_width[i + 1] / 2) - (this.carousel_width / 2) + this.padding
        }
      } else if (!this.cover && !this.loop) {
        for (let i = 0; i < movecount; i++) {
          this.center_offset = movecount > 0 ? (this.carousel_card_width[i + 1] / 2) - (this.carousel_width / 2) + this.padding : this.center_offset;
        }
        this.center_offset = (movecount == 0) ? (this.carousel_card_width[0] / 2) - (this.carousel_width / 2) + this.padding : this.center_offset;
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
    } else if (this.center) {
      this.class_index = movecount - 1
    } else if (this.loop && !this.center) {
      this.class_index = movecount + this.visible_cards
    } else {
      this.class_index = movecount
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

  #carouselDragController(movecount) {
    this.isDragging = false;
    this.dragOffset = 0;
    this.dragcheckstart = 0;
    this.dragcheckend = 0;

    this.carousel_box.addEventListener("pointerdown", (e) => {
      this.carousel_box.style.setProperty("transition", `all ${this.transition_type} 0ms`);
      this.dragStart = e.clientX;
      this.isDragging = true;

      this.onPointerMove = (e) => {
        if (this.isDragging) {
          this.dragDirection = this.dragStart - (e.clientX + this.dragOffset);
          this.finalDrag = this.dragDirection + this.dragEnd;
          this.carousel_box.style.setProperty("transform", `translateX(${-(this.finalDrag + this.carousel_move_offset + this.center_offset)}px)`);
          this.dragcheckstart = e.clientX;
          if (this.cover) {
            this.cardsDragged = this.dragDirection / (this.carousel_card_width + this.gap);
          } else {
            this.cardsDragged = this.dragDirection / (this.carousel_card_width.slice(movecount + this.visible_cards) + this.gap);
          }
        }
      };

      this.onPointerUp = (e) => {
        if (!Math.abs(this.dragcheckend - this.dragcheckstart) >= 1) {
          this.cardsDragged = 0
        }
        this.dragcheckend = this.dragcheckstart
        this.isDragging = false;
        this.carousel_box.removeEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
        document.removeEventListener("pointercancel", this.onPointerUp);

        this.dragEnd = this.finalDrag;
        this.count += Math.round(this.cardsDragged);

        if (this.count < 0 ||
          (this.loop && this.count > this.carousel_card_number - 1) ||
          (!this.loop && this.center && this.count > this.carousel_card_number - 1) ||
          (!this.loop && !this.center && this.count > this.carousel_card_number - this.visible_cards)) {
          if (this.loop) {
            this.count = this.count < 0 ? this.carousel_card_number - 1 : 0;
          } else {
            const maxCount = this.center ? this.carousel_card_number - 1 : this.carousel_card_number - this.visible_cards;
            this.count = Math.max(0, Math.min(this.count, maxCount));
          }
          this.finalDrag = this.count === 0 ? 0 : this.carousel_card_width * this.count + this.gap * (this.count - 1);
          this.dragOffset = this.finalDrag;
          this.dragEnd = this.finalDrag;
        }
        this.#moveUpdateHandler(this.count, this.transition_speed);
        this.dragOffset = this.finalDrag - this.carousel_move;
      };

      this.carousel_box.addEventListener("pointermove", this.onPointerMove);
      document.addEventListener("pointerup", this.onPointerUp);
      document.addEventListener("pointercancel", this.onPointerUp);
    });
  }


  ///////////////////////////////////////////////////////////////////////////////////////////

  #carouselMoveDefiner(movecount, movespeed) {
    this.carousel_box.style.setProperty("transition", `all ${this.transition_type} ${movespeed}ms`);
    this.carousel_move = 0;
    if (this.cover) {
      this.carousel_move = (this.carousel_card_width + this.gap) * movecount;
    } else {
      if (this.loop) {
        for (let i = 0; i < movecount; i++) {
          this.carousel_move += (this.carousel_card_width[i + this.visible_cards] + this.gap);
        }
      } else {
        for (let i = 0; i < movecount; i++) {
          this.carousel_move += (this.carousel_card_width[i] + this.gap);
        }
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
        if (this.carousel_cards[i]) {
          this.carousel_cards[i].classList.add('active');
        }
      }
      if (this.visible_cards % 2 === 1) {
        if (this.carousel_cards[this.class_index + Math.floor(this.visible_cards / 2)]) {
          this.carousel_cards[this.class_index + Math.floor(this.visible_cards / 2)].classList.add("center");
        }
      } else {
        if (this.carousel_cards[this.class_index + (this.visible_cards / 2)]) {
          this.carousel_cards[this.class_index + (this.visible_cards / 2)].classList.add("last_center");
        }
        if (this.carousel_cards[this.class_index + (this.visible_cards / 2) - 1]) {
          this.carousel_cards[this.class_index + (this.visible_cards / 2) - 1].classList.add("first_center");
        }
      }
      if (this.carousel_cards[this.class_index]) {
        this.carousel_cards[this.class_index].classList.add("first_active");
      }
      if (this.carousel_cards[(this.class_index + this.visible_cards) - 1]) {
        this.carousel_cards[(this.class_index + this.visible_cards) - 1].classList.add("last_active");
      }
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  // #animationInHandler() {
  //   if (this.transition_animation) {
  //     Array.from(this.carousel_cards).forEach(carousel_cards => {
  //       carousel_cards.classList.remove("animate_in", "animate_out")
  //       if (carousel_cards.classList.contains("active")) {
  //         carousel_cards.classList.add("animate_in")
  //         if (carousel_cards.previousElementSibling) {
  //           carousel_cards.previousElementSibling.classList.add("animate_out")
  //         }
  //       }
  //     })
  //     const onTransitionEnd = (event) => {
  //       if (event.propertyName === 'transform') {
  //         Array.from(this.carousel_cards).forEach(carousel_cards => {
  //           carousel_cards.classList.remove("animate_in", "animate_out")
  //         })
  //         this.carousel_box.removeEventListener('transitionend', onTransitionEnd);
  //       }
  //     };
  //     this.carousel_box.addEventListener("transitionend", onTransitionEnd);
  //   }
  // }

  ///////////////////////////////////////////////////////////////////////////////////////////

  // #animationOutHandler() {
  //   if (this.transition_animation) {
  //     Array.from(this.carousel_cards).forEach(carousel_cards => {
  //       carousel_cards.classList.remove("animate_in", "animate_out")
  //       if (carousel_cards.classList.contains("active")) {
  //         carousel_cards.classList.add("animate_in")
  //       }
  //       if (carousel_cards.classList.contains("animate_in") && carousel_cards.nextElementSibling) {
  //         test()
  //         carousel_cards.nextElementSibling.classList.add("animate_out")
  //       }
  //     })
  //     const onTransitionEnd = (event) => {
  //       if (event.propertyName === 'transform') {
  //         Array.from(this.carousel_cards).forEach(carousel_cards => {
  //           carousel_cards.classList.remove("animate_in", "animate_out")
  //         })
  //         this.carousel_box.removeEventListener('transitionend', onTransitionEnd);
  //       }
  //     };
  //     this.carousel_box.addEventListener("transitionend", onTransitionEnd);
  //   }

  // }

  ///////////////////////////////////////////////////////////////////////////////////////////

  // #animationClassHandler() {
  //   Array.from(this.carousel_cards).forEach(carousel_cards => {
  //     carousel_cards.classList.remove("animate_in", "animate_out")
  //   })

  //   if (this.transition_animation) {
  //     if (this.visible_cards === 1) {
  //       Array.from(this.carousel_cards).forEach(carousel_cards => {
  //         switch (this.animate_in) {
  //           case "DEFAULT":
  //             if (carousel_cards.classList.contains("active")) {
  //               carousel_cards.classList.add("animate_in")
  //               if (carousel_cards.previousElementSibling) {
  //                 carousel_cards.previousElementSibling.classList.add("animate_out")
  //               }
  //             }
  //             break;
  //         }
  //       })
  //     } else if (this.visible_cards > 1) {

  //     }
  //   }

  //   const onTransitionEnd = (event) => {
  //     if (event.propertyName === 'transform') {
  //       Array.from(this.carousel_cards).forEach(carousel_cards => {
  //         carousel_cards.classList.remove("animate_in", "animate_out")
  //       })
  //       this.carousel_box.removeEventListener('transitionend', onTransitionEnd);
  //     }
  //   };
  //   this.carousel_box.addEventListener("transitionend", onTransitionEnd);

  // }

  ///////////////////////////////////////////////////////////////////////////////////////////

  updateCarouselPosition = (movecount, movespeed) => {

    this.#carouselHeightDefiner(movecount)

    this.#carouselMoveDefiner(movecount, movespeed)

    this.#carouselClassHandler()

    if (this.navigate) {
      Array.from(this.navigate_box.children).forEach(navigate_dots => {
        navigate_dots.style.setProperty("background", "#D6D6D6");
      })
      if (movecount >= 0) {
        this.navigate_box.children[movecount].style.setProperty("background", "#979797");
      }
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

  #moveUpdateHandler(movecount, movespeed) {
    this.updateCarouselContent(movecount);
    this.#indexCalculator(movecount)
    this.updateCarouselPosition(movecount, movespeed);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  move() {
    this.#hoverPauseHandler()

    this.prev_btn.addEventListener("click", (e) => {
      if (!this.loop && this.carousel_card_number > 1) {
        if (this.count > 0 && this.count <= this.carousel_card_number - 1) {
          this.count--;
          this.#moveUpdateHandler(this.count, this.transition_speed)
        }
      } else if (this.carousel_card_number > 1) {
        if (this.count >= 0 && this.count <= this.carousel_card_number - 1) {
          this.count--;
          this.count = (this.count < 0) ? (this.carousel_card_number - 1) : this.count;
          this.#moveUpdateHandler(this.count, this.transition_speed)
        }
      }

      if (this.carousel_card_number === 1 && this.content != undefined && Array.isArray(this.content) && this.count > 0) {
        this.count--;
        this.carousel_cards[0].innerHTML = this.content[this.count];
      }

      // this.#animationOutHandler()
    })

    this.next_btn.addEventListener("click", (e) => {
      if (!this.loop && this.carousel_card_number > 1) {
        if (this.count < this.remain_next) {
          this.count++;
          this.#moveUpdateHandler(this.count, this.transition_speed)
        } else if (this.center && this.count < this.carousel_card_number - 1) {
          this.count++;
          this.#moveUpdateHandler(this.count, this.transition_speed)
        }
      } else if (this.carousel_card_number > 1) {
        if (this.count < this.carousel_card_number) {
          this.count++;
          this.#moveUpdateHandler(this.count, this.transition_speed)
        }
        ///////////////////////
        this.#indexCalculator(0)
        this.count === this.carousel_card_number ? (this.updateCarouselPosition(0, this.transition_speed), this.count = 0) : null;
      }
      if (this.carousel_card_number === 1 && this.content != undefined && Array.isArray(this.content)) {
        this.count = (this.count < this.content.length - 1) ? this.count + 1 : this.count;
        this.carousel_cards[0].innerHTML = this.content[this.count];
      }
      // this.#animationClassHandler()
      // this.#animationInHandler()
    })

    Array.from(this.navigate_box.children).forEach((navigate_dots, index) => {
      navigate_dots.addEventListener("click", () => {
        if (!this.loop) {
          if (index < this.remain_next + 1 && !this.center) {
            this.#indexCalculator(index)
            this.count = index;
            this.updateCarouselPosition(this.count, this.navigate_speed);
          } else if (index < this.carousel_card_number && this.center) {
            this.#indexCalculator(index)
            this.count = index;
            this.updateCarouselPosition(this.count, this.navigate_speed);
          }
        } else {
          index = (index == this.carousel_card_number) ? 0 : index;
          this.#indexCalculator(index)
          this.count = index;
          this.updateCarouselPosition(this.count, this.navigate_speed);
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
      this.#centerOffsetCalculator(1)
      this.#indexCalculator(0)
      this.#carouselMoveDefiner(0)
      // this.#animationClassHandler()
      this.move()
      this.updateCarouselPosition(0)
      this.#carouselDragController(this.count)
    })
  }
}



let carcont = ["center", "center", "center", "center", "center", "center"]
let carcont2 = ["1", "2", "3", "4", "5", "6"]
let testcar = new Carousel({ carousel_box: carcardbox, want_controller: true, content: undefined, visible_cards: 4, gap: 30, overflow: true, navigate: true, loop: true, transition_speed: 2000, auto_height: false, navigate_speed: 100, center: true, padding: 40, animate_in: "Default", transition_animation: true })
testcar.carouselUpdate()
let testcar2 = new Carousel({ carousel_box: carcardbox2, want_controller: true, content: undefined, visible_cards: 3, gap: 15, overflow: true, navigate: true, loop: false, cover: false, autoplay: false, autoplay_time: 2000, auto_height: false, autoplay_speed: 2000, padding: 40, center: true })
testcar2.carouselUpdate()
let testcar3 = new Carousel({ carousel_box: carcardbox3, want_controller: true, content: carcont2, visible_cards: 1, gap: 5, overflow: false, navigate: false })
testcar3.carouselUpdate()

// loop center cover
// true true true
// true false true
// false true true
// false false true
