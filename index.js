function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
};

function searchParks(query, maxResults=10) {
    let searchURL = "https://developer.nps.gov/api/v1/parks";
    let apiKey = "R8SiY892asOCX7bn1loeQGbFUcKw2Hm3i9KfNcOQ"
    const params = {
        stateCode: query,
        limit: maxResults-1,
        api_key: apiKey,
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;
    fetch(url)
        .then(response => response.json())
        .then(responseJson => displayParkInfo(responseJson))
        .catch(err => alert(`${err}`))
};

function displayParkInfo(responseJson) {
    if (responseJson.total == 0) {
        alert('Invalid State Code. Please try again.')
    } else {
        $('#results').empty();
        for (i = 0; i < responseJson.data.length; i++) {
            $('#results').append(`
            <li id="title">${responseJson.data[i].fullName}</li>
            <li>${responseJson.data[i].description}</li>
            <li><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></li>
            `)
        };
    };
};

 function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const stateCode = $('#state').val();
      const maxResults = $('#number').val();
      searchParks(stateCode, maxResults);
    });
};

$(watchForm());