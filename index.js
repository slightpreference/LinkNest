
const inputBtn = document.getElementById("input-btn");

const ulEl = document.getElementById("ul-el");

const tabBtn = document.getElementById("tab-btn");

const inputEl = document.getElementById("input-el");

const delBtn = document.getElementById("del-btn");

const leadsFromStorage = JSON.parse(localStorage.getItem("myLeads"));

let myLeads = []

if (leadsFromStorage) {
    myLeads = leadsFromStorage;
    renderLeads(myLeads);
}

const tabs = [
    {
        url: "https://www.linkedin.com"
    }
]

console.log(tabs[0].url)

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        renderLeads(myLeads);
    })
})

inputBtn.addEventListener("click", function() {

    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads(myLeads);
})


delBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    myLeads = [];
    renderLeads(myLeads);
} )


function renderLeads(leads) {
    let listItems = "";
    for (let i=0; i<leads.length; i++) {
        listItems += `
        <li>  
            <a target='_blank' href='${leads[i]}  '>${leads[i]} </a>
        </li>`;
    }
    
    ulEl.innerHTML = listItems;
}

