'use strict'

init()

function init() {
    miro.onReady(() => {
        miro.initialize({
            extensionPoints: {
                toolbar: {
                    title: 'Sticker point counter',
                    toolbarSvgIcon: '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"/>',
                    onClick: () => {
                        miro.showNotification('Select sticker to count!')
                        miro.addListener('SELECTION_UPDATED', selectionCallback)
                    }
                }
            }
        })
    })
}

async function selectionCallback() {
    console.log('count')
    const selection = await miro.board.selection.get()
    console.log('selection:', selection)
}