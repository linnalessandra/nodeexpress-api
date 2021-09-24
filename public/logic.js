window.addEventListener("load", async () => {
    updateCatName(await makeRequest(`/api/catFacts`, "GET"))
})


// Get fact from external API
async function getCatFact() {
    let response = await fetch("https://catfact.ninja/fact?max_length=140")
    console.log(response)
    let result = await response.json()
    console.log(result.fact)
    const printFact = document.getElementById("Fact")
    printFact.innerText = result.fact

}

// Saves name from the input field
async function addCatName() {
    let catName = document.getElementById("newName").value
    console.log(catName)
    const status = await makeRequest("/api/catFacts", "POST", { catName })
    updateCatName(await makeRequest(`/api/catFacts`, "GET"))

}

// Prints the name
function updateCatName(catNames) {
    let findCatName = document.getElementById("kittenName")
    findCatName.innerHTML = catNames.map(c => c.catName).join('<br>')
    console.log(catNames)
}

// Deletes the name
async function deleteCat() {
    let catName = document.getElementById("newName").value
    updateCatName(await makeRequest(`/api/catFacts/${catName}`, "DELETE"))
}


async function makeRequest(url, method, body) {
    try {
        const response = await fetch(url, {
            headers: { "Content-Type": "application/json" },
            method,
            body: JSON.stringify(body)
        })

        const result = await response.json()

        return result
    } catch (err) {
        console.error(err)
    }
}