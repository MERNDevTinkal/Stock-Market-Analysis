import { stockData, stockInfo, selectedStockName } from "./script.js";

const stockProfileRes = await fetch("https://stocks3.onrender.com/api/stocks/getstocksprofiledata");
const stockProfileData = await stockProfileRes.json();
const stockProfiles = stockProfileData.stocksProfileData[0];

// function to update and show stock information every time we choose a different stock
export async function populateStockSummary() {
    stockInfo.innerHTML = `<h2 class="text-center">Know Your Stock</h2>`;
    // console.log(stockProfileData);
    Object.entries(stockProfiles).forEach((d) => {
        if (d[0] == selectedStockName) {
            let summaryStockName = document.createElement("h4");
            let summaryStockValue = document.createElement("h4");
            let summaryStockProfit = document.createElement("h4");
            let sumStockSummary = document.createElement("p");

            summaryStockName.textContent = selectedStockName;

            Object.entries(stockData).forEach((d) => {
                if (d[0] == selectedStockName) {
                    let profit = Number(d[1].profit);

                    summaryStockProfit.textContent = `${profit}%`;
                    if (profit > 0) {
                        summaryStockProfit.classList.add("profit");
                    } else {
                        summaryStockProfit.classList.add("loss");
                    }
                    summaryStockValue.textContent = `$${d[1].bookValue}`;
                }
            });

            sumStockSummary.textContent = d[1].summary;
            summaryStockName.classList.add("display-ib", "stock-info-name", "m-10");
            summaryStockValue.classList.add("display-ib", "stock-info-value", "m-10");
            summaryStockProfit.classList.add("display-ib", "stock-info-profit", "m-10");


            stockInfo.append(summaryStockName, summaryStockValue, summaryStockProfit, sumStockSummary);
            // console.log(summaryStockName, summaryStockProfit, summaryStockValue, sumStockSummary);
        }
    });

}