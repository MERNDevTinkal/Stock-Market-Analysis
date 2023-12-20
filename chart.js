let selectedStock = "AAPL";
let selectedDuration = "5y";

let fetchedStocksData = await fetch("https://stocks3.onrender.com/api/stocks/getstocksdata");
let parsedStocksData = await fetchedStocksData.json();
let stocksData = parsedStocksData.stocksData[0];

// function to update time frame
export function updateDuration(newDuration) {
    selectedDuration = newDuration;
}

// update and render chart when stock of time frame changed
export function renderChart(stockName) {
    selectedStock = stockName;
    let values = [], timestamps = [];
    let valuesArray = stocksData[selectedStock][selectedDuration]["value"];
    let timestampArray = stocksData[selectedStock][selectedDuration]["timeStamp"];
    let n = valuesArray.length;

    for (let ind = 0; ind < n; ind += 1) {
        values.push(valuesArray[ind]);
        let tempTimestamp = timestampArray[ind];
        let timestamp = new Date(tempTimestamp * 1000).toLocaleDateString();
        timestamps.push(timestamp);
    }

    let data = [{
        x: timestamps,
        y: values,
        type: 'scatter'
    }];

    // console.log(values, timestamps);

    Plotly.newPlot('chart', data);
}

// renderChart(selectedStock);