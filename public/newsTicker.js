document.addEventListener('DOMContentLoaded', (event) => {
    const apiKey = 'chq6hp1r01qt7cgvte3gchq6hp1r01qt7cgvte40';  // Replace with your actual API key
    const newsTicker = document.getElementById('newsTicker');
    const tickerInput = document.getElementById('tickerInput');

    function fetchNews() {
        const tickerSymbol = tickerInput.value;
        const toDate = new Date();
        const fromDate = new Date();  // Current date

        // Format the dates as YYYY-MM-DD
        const toDateString = `${toDate.getFullYear()}-${('0' + (toDate.getMonth() + 1)).slice(-2)}-${('0' + toDate.getDate()).slice(-2)}`;
        const fromDateString = `${fromDate.getFullYear()}-${('0' + (fromDate.getMonth() + 1)).slice(-2)}-${('0' + fromDate.getDate()).slice(-2)}`;

        fetch(`https://finnhub.io/api/v1/company-news?symbol=${tickerSymbol}&from=${fromDateString}&to=${toDateString}&token=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                newsTicker.innerHTML = '';
                data.slice(0, 4).forEach(item => {  // Only take the first 4 news items
                    newsTicker.innerHTML += `<div class="newsItem"><a href="${item.url}" target="_blank">${item.headline}</a></div>`;
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    window.fetchNews = fetchNews;  // Make the function available globally
});
