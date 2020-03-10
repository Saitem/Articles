export function formatDate(date){
    let diff = new Date() - date
    if(diff < 1000) return 'Right now'

    let seconds = Math.floor(diff / 1000)
    if(seconds < 60) return `${seconds} seconds ago`

    let minutes = Math.floor(diff / 60000)
    if(minutes < 60) return `${minutes} minutes ago`

    let date_processing = date
    date_processing = [
        '0' + date_processing .getDate(),
        '0' + (date_processing .getMonth() + 1),
        '' + date_processing .getFullYear(),
        '0' + date_processing .getHours(),
        '0' + date_processing .getMinutes()
    ].map(el => el.slice(-2))

    return date_processing .slice(0, 3).join('.') + ' ' + date_processing .slice(3).join(':')
}