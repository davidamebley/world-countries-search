
/* 
1. Function to find country data from url 'https://restcountries.com/v3.1/name/[name]'
the data fetched from url should be displayed to index.html. References can befound from README
 */
const btn = document.getElementById('btn--search');

btn.addEventListener('click', () => {
    const searchName = document.getElementById('txt--name').value;
    let labelCountry = document.getElementById('country');
    let labelCurrency = document.getElementById('currency');
    let labelLanguage = document.getElementById('language');
    let labelCapital = document.getElementById('capital');
    let labelRegion = document.getElementById('region');
    let labelPopulation = document.getElementById('population');
    let divFlag = document.getElementById('flag');
    let flag;
    let flagImg;

    if (searchName === "") {
        alert("Enter a name in the search field");
        exit();
    }
    labelCountry.style.display = 'block';
    // labelCurrency.style.display = 'block';
    labelCapital.style.display = 'block';
    labelRegion.style.display = 'block';
    labelCurrency.style.display = 'block';
    labelLanguage.style.display = 'block';
    labelPopulation.style.display = 'block';
    divFlag.style.display = 'block;'
    // Call fetchCountries Function
    const countryJson = fetchCountries(searchName);
    countryJson.then(
        // (json) => console.log(json[0].name)
        (values) => {
            const currencyObj = values[0].currencies
            const languageObj = values[0].languages
            labelCountry.innerHTML = ('<em><b>Official Name: </b></em>' + values[0].name.official)
            labelCapital.innerHTML = ('<em><b>Capital City: </b></em>' + values[0].capital)
            labelCurrency.innerHTML = ('<em><b>Currency: </b></em>' + Object.values(currencyObj)[0].name + ' ' + '<em><b>Symbol: </b></em>' + Object.values(currencyObj)[0].symbol)
            labelLanguage.innerHTML = ('<em><b>Language: </b></em>' + Object.values(languageObj)[0])
            labelRegion.innerHTML = ('<em><b>Region: </b></em>' + values[0].region)
            labelPopulation.innerHTML = ('<em><b>Population: </b></em>' + values[0].population)
            flag = (values[0]['flags']['png'])
            flagImg = document.createElement('img')
            flagImg.src = flag
            divFlag.innerHTML = ''
            divFlag.appendChild(flagImg)

        }
        // (json) => labelCountry.innerHTML = json[0].name.common
    );

});

async function fetchCountries(countryName) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        // document.body.removeChild(flagImg);
        // If could not locate page or data
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        // If response Ok, proceed
        const json = await response.json();     //Convert response to Json format
        return json;
    } catch (error) {
        console.error(`Country data could not be retrieved: ${error}`);
        alert('Check your spelling and try again')
    }
}