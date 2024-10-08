class Tilt {
    constructor(tilt_card, tilt_strength, tilt_x, tilt_y, float, scale, startX, startY, reverse, page, reset, infinity) {
        this.tilt_card = tilt_card
        this.tilt_strength = tilt_strength || 5
        this.tilt_x = tilt_x || 'true'
        this.tilt_y = tilt_y || 'true'
        this.float = float || 0
        this.scale = scale || 1
        this.startX = startX || 0
        this.startY = startY || 0
        this.reverse = reverse || 'false'
        this.page = page || 'false'
        this.reset = reset || 'true'
        this.infinity = infinity || 'false'
        this.infinity_data = this.infinity.split(/\s+/).map(Number)
        this.card_data = tilt_card.getBoundingClientRect()
        this.tilt_card_half_width = this.card_data.width / 2
        this.tilt_card_half_height = this.card_data.height / 2
        this.tilt_infinity_child
    }

    update() {
        document.addEventListener("scrollend", (e) => {
            this.card_data = this.tilt_card.getBoundingClientRect()
        })

        if (this.float <= 360 && this.float > 0) {
            this.final_float = this.float
        }

        if (this.scale <= 2 && this.scale >= 0.5) {
            this.final_scale = this.scale
        } else { this.final_scale = 1 }

        if (this.startX != 90 && this.startX != 180) {
            this.final_startX = this.startX
        }

        if (this.startY != 90 && this.startY != 180) {
            this.final_startY = this.startY
        }

        this.tilt_card.style.cssText = `transform-style: preserve-3d; transition: all 200ms ease ; transform: perspective(500px) rotateY(${this.final_startY}deg) rotateX(${this.final_startX}deg);`

        if (this.infinity_data[0] > 0) {
            nest(this.tilt_card, this.infinity_data[0])
        }

        this.tilt_infinity_child = document.getElementsByClassName("tilt_infinity_child")
        this.tilt_infinity_child_size = Math.pow(this.infinity_data[2], 1 / this.infinity_data[0]) * 100;

        this.child = this.tilt_card.children
        Array.from(this.child).forEach(childs => {
            childs.style.cssText = `transform: translateZ(${this.final_float}px);`
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
                    this.rotateY = ((e.clientX - (window.innerWidth / 2)) / this.tilt_strength)
                } else {
                    this.rotateY = (((e.clientX - this.card_data.x) - this.card_data.width / 2) / this.tilt_strength)
                }
            } else { this.rotateY = 0 }

            if (this.reverse === "true") {
                this.final_rotateX = -this.rotateX
                this.final_rotateY = this.rotateY
            } else {
                this.final_rotateX = this.rotateX
                this.final_rotateY = -this.rotateY
            }

            if (this.infinity_data[0] > 0) {
                this.overflow = "hidden"
                this.infinity_moveY = ((e.clientY - this.card_data.y) - this.card_data.height / 2) / ((this.card_data.height / 2) / this.infinity_data[1])
                this.infinity_moveX = ((e.clientX - this.card_data.x) - this.card_data.width / 2) / ((this.card_data.width / 2) / this.infinity_data[1])
            } else {
                this.overflow = "visible"
            }

            this.tilt_card.style.cssText = `overflow:${this.overflow}; transform-style: preserve-3d; transform: scale(${this.final_scale})perspective(500px) rotateY(${this.final_rotateY}deg) rotateX(${this.final_rotateX}deg);`

            if (this.infinity_data[0] > 0) {
                Array.from(this.tilt_infinity_child).forEach(tilt_infinity_childs => {
                    tilt_infinity_childs.style.cssText = `width:${this.tilt_infinity_child_size}% ; height:${this.tilt_infinity_child_size}% ; transform: perspective(500px) translateY(${this.infinity_moveY}%) translateX(${this.infinity_moveX}%);`
                })
            }
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
            if (this.infinity_data[0] > 0) {
                Array.from(this.tilt_infinity_child).forEach(tilt_infinity_childs => {
                    tilt_infinity_childs.style.cssText = `width:${this.tilt_infinity_child_size}% ; height:${this.tilt_infinity_child_size}% ; transition: all 200ms ease ;transform: perspective(500px) translateY(0%) translateX(0%);`
                })
            }

            if (this.reset === "true") {
                this.tilt_card.style.cssText = `overflow:${this.overflow}; transform-style: preserve-3d; transition: all 200ms ease ; transform: perspective(500px) rotateY(${this.final_startY}deg) rotateX(${this.final_startX}deg);`
            }
        })
    }
}