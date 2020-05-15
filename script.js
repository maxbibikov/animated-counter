function fetchData() {
  return fetch('https://api.exchangerate-api.com/v6/latest')
    .then((response) => {
      if (!response.ok) {
        throw Error('Network Error');
      }

      return response
        .json()
        .then((data) => {
          const eur = { name: 'EUR', value: data.rates.EUR };
          const gbp = { name: 'GBP', value: data.rates.GBP };
          const jpy = { name: 'JPY', value: data.rates.JPY };
          const uah = { name: 'UAH', value: data.rates.UAH };
          incrementValue(eur);
          incrementValue(gbp);
          incrementValue(jpy);
          incrementValue(uah);
        })
        .catch((error) => {
          throw Error(error);
        });
    })
    .catch((error) => {
      throw Error(error);
    });
}

function incrementValue(currencyObj, currentValue = 0) {
  const currencyEl = document.getElementById(currencyObj.name);
  const target = currencyObj.value;
  const step = target / 50;
  let timer;
  const nextValue = currentValue + step;
  if (nextValue < target) {
    timer = setTimeout(() => {
      currencyEl.textContent = nextValue.toFixed(2);
      incrementValue(currencyObj, nextValue);
    }, 10);
  } else {
    currencyEl.textContent = target.toFixed(2);
    clearTimeout(timer);
  }
}

const fetchDataBtnEl = document.getElementById('fetch_data_btn');
fetchDataBtnEl.addEventListener('click', () => {
  fetchData();
});
