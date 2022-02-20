'use strict'

init()

function init() {
    miro.onReady(() => {
        miro.initialize({
            extensionPoints: {
                toolbar: {
                    title: 'Sticker point counter',
                    toolbarSvgIcon: '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"/>',
                    librarySvgIcon: '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"/>',
                    onClick: () => {
                        miro.showNotification('Select sticker to count!')
                        miro.addListener('SELECTION_UPDATED', selectionCallback)
                    }
                }
            }
        })
    })
}

/**
 *
 * @returns {Promise<void>}
 */
async function selectionCallback() {
    const points = await getPoints()
    const result = sumPoints(points)
    showNotification(result)
}

/**
 *
 * @returns {Promise<(string|string|*)[]>}
 */
async function getTags() {
    const selections = await miro.board.selection.get()
    return selections
        .filter((el) => el.type === "STICKER")
        .flatMap((sticker) => sticker.tags)
        .map((tag) => tag.title)
}

/**
 *
 * @returns {Promise<(number|number)[]>}
 */
async function getPoints() {
    const tags = await getTags()
    return tags
            .filter((tag) => tag.match(/^[\dpt]/))
            .map((tagText) => {
                const point = parseFloat(tagText.replace('pt', ''))
                return point ? point : 0
            })
}

/**
 *
 * @param {number[]} points
 * @returns {number}
 */
function sumPoints(points) {
    if(points.length === 0) return 0
    return points.reduce((sum, point)=> sum + point, 0)
}

/**
 *
 * @param {number} result
 * @returns {void}
 */
function showNotification(result) {
    if (result !== 0) miro.showNotification('total: ' + result + 'pt!')
}