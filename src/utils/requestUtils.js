export function getUrlParameter ( parameterName ) {
    const pageQueryString = window.location.search.substring(1);
    const urlVariables = pageQueryString.split('&');
    for (let i = 0; i < urlVariables.length; i ++) {
        const keyValuePair = urlVariables[i].split('=');
        if (keyValuePair[0] === parameterName) {
            return keyValuePair[1];
        }
    }
    return null;
}

export function generateDateSeed (){
    let date = new Date();
    let yearString = '' + date.getFullYear();
    let month = date.getMonth() + 1;
    let monthString = (month < 10? '0' : '') + month;

    let day = date.getDate();
    let dayString = (day < 10? '0' : '') + day;

    return (yearString + monthString + dayString);
}
