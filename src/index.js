'use strict'

init()

/**
 * @returns {void}
 */
async function init() {
    await miro.board.ui.on('icon:click', async ()=> {
        await addEventToMiro()
    })
}

/**
 *
 * @returns {void}
 */
async function addEventToMiro() {
    await miro.board.notifications.showInfo('Select items to count!')
    miro.board.ui.on('selection:update', selectionCallback)
}

/**
 *
 * @returns {Promise<void>}
 */
async function selectionCallback(event) {
    const selections = event.items
    const points = await getPoints(selections)
    const result = sumPoints(points)
    await showNotification(result)
}

/**
 *
 * @returns {Promise<(string|string|*)[]>}
 */
async function getTags(selections) {
    const promises = selections
        .flatMap((item) => item.tagIds ? item.tagIds : [])
        .map(async (tagId) => {
            const tag = await miro.board.getById(tagId)
            return tag.title
        })
    return await Promise.all(promises)
}

/**
 *
 * @returns {Promise<(number|number)[]>}
 */
async function getPoints(selections) {
    const tags = await getTags(selections)
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
async function showNotification(result) {
    if (result !== 0) await miro.board.notifications.showInfo('total: ' + result + 'pt!')
}

