(function() {
    "use strict";

    let checkLoaded, scrollActive,
        scrollAmountVertical = 40, scrollAmountHorizontal = 20, 
        _2keyCommand = 0, _2KeyTimeout = 1000,
        activeKeys = {};

    let checkDocumentLoaded = () => {

        if(document.readyState === 'complete') {
            clearInterval(checkLoaded)
            main()
        }

    }

    checkLoaded = setInterval(checkDocumentLoaded, 100)

    let scrollLikeVim = () => {

        if(activeKeys['k'] == 1)
            window.scrollBy(0, -scrollAmountVertical)

        if(activeKeys['j'] == 1)
            window.scrollBy(0, scrollAmountVertical)

        if(activeKeys['h'] == 1)
            window.scrollBy(-scrollAmountHorizontal, 0)

        if(activeKeys['l'] == 1)
            window.scrollBy(scrollAmountHorizontal, 0)

    }

    let main = () => {

        document.body.addEventListener("keydown", register)
        document.body.addEventListener("keyup", unRegister)

    }

    let register = e => {

        let key = e.key
        activeKeys[key] = 1

        if(key == 'G')
            window.scrollBy({ left: 0, top: 99999999, behavior: 'smooth' })

        if(_2keyCommand) {

            if(key == 'g')
                window.scrollBy({ left: 0, top: -99999999, behavior: 'smooth' })

            _2keyCommand = 0

        } else {

            if(scrollAmountVertical < 180)
                scrollAmountVertical += 10

            if(key == 'g') {
                _2keyCommand = 1
                setTimeout(() => { _2keyCommand = 0 }, _2KeyTimeout)
            }

        }

        if(!scrollActive)
            scrollActive = setInterval(scrollLikeVim, 100)

    }

    let unRegister = e => {

        let key = e.key
        activeKeys[key] = 0

        scrollAmountVertical = 40

        clearInterval(scrollActive)
        scrollActive = false

    }

})()
