export default {
    data: {
        isOpen: false,
        isAnimating: false,

        // Button positions - Starting at center, (187,187) for 80x80 size
        topX: 187,
        topY: 187,
        rightX: 187,
        rightY: 187,
        bottomX: 187,
        bottomY: 187,
        leftX: 187,
        leftY: 187,
        topRightX: 187,
        topRightY: 187,
        bottomRightX: 187,
        bottomRightY: 187,
        bottomLeftX: 187,
        bottomLeftY: 187,
        topLeftX: 187,
        topLeftY: 187,
    },

    onInit() {
        console.info('RadialMenuJS initialized')
    },

    onDestroy() {
        console.info('RadialMenuJS destroyed')
    },

    toggleMenu() {
        if (this.isAnimating) {
            console.info('Animation in progress, ignored')
            return
        }

            this.isOpen ? this.closeMenu() : this.openMenu()
    },

    openMenu() {
        this.isOpen = true
        this.animateButtons(this.getClosedPositions(), this.getOpenPositions(), 'ease-out')
    },

    closeMenu() {
        this.isOpen = false
        this.animateButtons(this.getOpenPositions(), this.getClosedPositions(), 'ease-in')
    },

    animateButtons(fromPos, toPos, easingType) {
        var that = this
        this.isAnimating = true

        var duration = 300
        var fps = 60
        var frames = Math.round(duration / (1000 / fps))
        var currentFrame = 0

        var animationInterval = setInterval(function () {
            currentFrame++

            if (currentFrame >= frames) {
                // Animation complete, snap to final pos
                Object.keys(toPos).forEach(function (key) {
                    that[key] = toPos[key]
                })
                that.isAnimating = false
                clearInterval(animationInterval)
                console.info((that.isOpen ? 'Open' : 'Close') + ' animation complete')
            } else {
                // Calculate progress with easing
                var progress = currentFrame / frames
                var eased = easingType === 'ease-out'
                    ? 1 - Math.pow(1 - progress, 3) // cubic ease out
                    : Math.pow(progress, 3)         // cubic ease-in

                Object.keys(toPos).forEach(function(key){
                    that[key] = fromPos[key] + (toPos[key] - fromPos[key]) * eased
                })
            }
        }, 1000 / fps)
    },

    getOpenPositions() {
        // distance from center = 140px
        // 8 buttons at 45 degree intervals, diagonal offset = 140 * cos(45), roughly 99
        var radius = 140
        var diagonalOffset = 99

        return {
            topX: 187,
            topY: 187 - radius,
            rightX: 187 + radius,
            rightY: 187,
            bottomX: 187,
            bottomY: 187 + radius,
            leftX: 187 - radius,
            leftY: 187,

            // Diagonals
            topRightX: 187 + diagonalOffset,
            topRightY: 187 - diagonalOffset,
            bottomRightX: 187 + diagonalOffset,
            bottomRightY: 187 + diagonalOffset,
            bottomLeftX: 187 - diagonalOffset,
            bottomLeftY: 187 + diagonalOffset,
            topLeftX: 187 - diagonalOffset,
            topLeftY: 187 - diagonalOffset,
        }
    },

    getClosedPositions() {
        return {
            topX: 187,
            topY: 187,
            rightX: 187,
            rightY: 187,
            bottomX: 187,
            bottomY: 187,
            leftX: 187,
            leftY: 187,
            topRightX: 187,
            topRightY: 187,
            bottomRightX: 187,
            bottomRightY: 187,
            bottomLeftX: 187,
            bottomLeftY: 187,
            topLeftX: 187,
            topLeftY: 187,
        }
    }
}