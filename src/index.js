'use strict'

init()

/**
 * @returns {void}
 */
async function init() {
    await addEventToMiro()

    // miro.onReady(() => {
    //     miro.initialize({
    //         extensionPoints: {
    //             toolbar: {
    //                 title: 'Sticker point counter(DEV)',
    //                 toolbarSvgIcon: '<svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" style="width: 32px; height: 32px; opacity: 1;" xml:space="preserve"><style type="text/css">.st0{fill:#4B4B4B;}</style><g>\t<path class="st0" d="M264.031,196.25h-35.297v71.063h35.297c22.375,0,40.563-15.938,40.563-35.531S286.406,196.25,264.031,196.25z" style="fill: rgb(1, 162, 199);"></path>\t<path class="st0" d="M256,0C114.625,0,0,114.625,0,256c0,141.391,114.625,256,256,256s256-114.609,256-256\t\tC512,114.625,397.375,0,256,0z M264.031,306.813h-35.297v51.75c0,9.938-8.063,18-18.016,18h-9.031c-9.969,0-18.016-8.063-18.016-18\t\tV174.75c0-9.938,8.047-18,18.016-18h62.344c47.219,0,85.625,33.656,85.625,75.031S311.25,306.813,264.031,306.813z" style="fill: rgb(1, 162, 199);"></path></g></svg>',
    //                 librarySvgIcon: '<svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" style="width: 32px; height: 32px; opacity: 1;" xml:space="preserve"><style type="text/css">.st0{fill:#4B4B4B;}</style><g>\t<path class="st0" d="M264.031,196.25h-35.297v71.063h35.297c22.375,0,40.563-15.938,40.563-35.531S286.406,196.25,264.031,196.25z" style="fill: rgb(1, 162, 199);"></path>\t<path class="st0" d="M256,0C114.625,0,0,114.625,0,256c0,141.391,114.625,256,256,256s256-114.609,256-256\t\tC512,114.625,397.375,0,256,0z M264.031,306.813h-35.297v51.75c0,9.938-8.063,18-18.016,18h-9.031c-9.969,0-18.016-8.063-18.016-18\t\tV174.75c0-9.938,8.047-18,18.016-18h62.344c47.219,0,85.625,33.656,85.625,75.031S311.25,306.813,264.031,306.813z" style="fill: rgb(1, 162, 199);"></path></g></svg>',
    //                 onClick: async () => {
    //                     const isAuthorized = await miro.isAuthorized()
    //                     if(!isAuthorized) await miro.requestAuthorization()
    //                     addEventToMiro()
    //                 }
    //             }
    //         }
    //     })
    // })
}

/**
 *
 * @returns {void}
 */
async function addEventToMiro() {
    await miro.board.notifications.showInfo('Select sticker to count!')
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
        .filter((el) => el.type === "sticky_note")
        .flatMap((sticker) => sticker.tagIds)
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

