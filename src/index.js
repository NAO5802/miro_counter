'use strict'

init()

/**
 * @returns {void}
 */
async function init() {
    const isAuthorized = await miro.isAuthorized()
    if(!isAuthorized) await miro.requestAuthorization()
    readyMiro()
}

/**
 * @returns {void}
 */
function readyMiro() {
    miro.onReady(() => {
        miro.initialize({
            extensionPoints: {
                toolbar: {
                    title: 'Sticker point counter',
                    toolbarSvgIcon: '<svg id="Outline" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><defs><style>.cls-1 {fill: none;}</style></defs><g><rect class="cls-1" width="40" height="40"/><path d="M31,6H9A3.00328,3.00328,0,0,0,6,9V31a3.00328,3.00328,0,0,0,3,3H23a.99928.99928,0,0,0,.707-.293l10-10A.99928.99928,0,0,0,34,23V9A3.00328,3.00328,0,0,0,31,6ZM9,32a1.00067,1.00067,0,0,1-1-1V9A1.001,1.001,0,0,1,9,8H31a1.001,1.001,0,0,1,1,1V22H25a3.00328,3.00328,0,0,0-3,3v7Zm21.58594-8L24,30.58594V25a1.00067,1.00067,0,0,1,1-1Z"/></g></svg>',
                    librarySvgIcon: '<svg id="Outline" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><defs><style>.cls-1 {fill: none;}</style></defs><g><rect class="cls-1" width="40" height="40"/><path d="M31,6H9A3.00328,3.00328,0,0,0,6,9V31a3.00328,3.00328,0,0,0,3,3H23a.99928.99928,0,0,0,.707-.293l10-10A.99928.99928,0,0,0,34,23V9A3.00328,3.00328,0,0,0,31,6ZM9,32a1.00067,1.00067,0,0,1-1-1V9A1.001,1.001,0,0,1,9,8H31a1.001,1.001,0,0,1,1,1V22H25a3.00328,3.00328,0,0,0-3,3v7Zm21.58594-8L24,30.58594V25a1.00067,1.00067,0,0,1,1-1Z"/></g></svg>',
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

