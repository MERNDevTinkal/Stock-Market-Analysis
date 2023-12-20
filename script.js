import { renderChart, updateDuration } from "./chart.js";
import { populateStockSummary } from "./summary.js";

// global state
const stockStatsRes = await fetch("https://stocks3.onrender.com/api/stocks/getstockstatsdata");
const stockStats = await stockStatsRes.json();
export const stockData = stockStats.stocksStatsData[0];


const stockList = document.querySelector("#stock-list");
export const stockInfo = document.querySelector("#stock-info");
const timeChangerBtns = document.querySelectorAll(".time-changer-btn");
let currentHighlightedStock;
let currentHighlightedTimeframe = document.querySelector("#five-years-btn");

export let selectedStockName = "AAPL";

// function to populate stock list at the time of initial loading of page
async function populateStockList() {

    Object.entries(stockData).forEach((d) => {
        if (d[0] != "_id") {
            let stockDiv = document.createElement("div");
            let stockName = document.createElement("button");
            let stockBookValue = document.createElement("span");
            let stockProfit = document.createElement("span");
            let profitValue = Number(d[1].profit).toFixed(2);

            stockName.textContent = d[0];
            stockName.classList.add("stock-list-btn");

            if (d[0] == "AAPL") {
                stockName.classList.add("selected-stock");
                currentHighlightedStock = stockName;
            }

            // stockName.id = d[0];
            stockBookValue.textContent = `${Number(d[1].bookValue).toFixed(3)}`;
            stockBookValue.classList.add("stock-list-value");
            stockProfit.textContent = `${profitValue}%`;
            stockProfit.classList.add("stock-list-profit");

            if (profitValue <= 0.00) {
                stockProfit.classList.add("loss");
            } else {
                stockProfit.classList.add("profit");
            }

            stockName.addEventListener("click", (e) => {
                let targetedStock = e.target;
                let targetedStockName = targetedStock.textContent;
                selectedStockName = targetedStockName;
                if (currentHighlightedStock) {
                    currentHighlightedStock.classList.remove("selected-stock");
                }
                currentHighlightedStock = targetedStock;
                targetedStock.classList.add("selected-stock");
                stockLoader();
            });

            stockDiv.append(stockName, stockBookValue, stockProfit);
            stockList.appendChild(stockDiv);
        }
    });
}

// updates chart and summary section when change of stock takes place
function stockLoader() {
    populateStockSummary();
    renderChart(selectedStockName);
}

populateStockList();
populateStockSummary();
renderChart(selectedStockName);

// adding event handlers to timeframe changing buttons
timeChangerBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        currentHighlightedTimeframe.classList.remove("selected-time-btn");
        btn.classList.add("selected-time-btn");
        currentHighlightedTimeframe = btn;
        updateDuration(btn.getAttribute("time"));
        renderChart(selectedStockName);
    })
});