'use strict'

init()

function init() {
    miro.onReady(() => {
        miro.initialize({
            extensionPoints: {
                toolbar: {
                    title: 'Sticker point counter',
                    librarySvgIcon: '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"/>',
                    toolbarSvgIcon: '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"/>',
                    onClick: () => {
                        miro.showNotification('Select sticker to count!')
                        addEventListener('SELECTION_UPDATED', countStickerPoints)
                    }
                }
            }
        })
    })
}

function countStickerPoints() {
    console.log('count')
}