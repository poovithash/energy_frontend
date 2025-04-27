function makePrediction() {
    const country = document.getElementById("country").value;
    const year = document.getElementById("year").value;

    if (isNaN(year) || year.trim() === "") {
        document.getElementById("predictionResult").innerText = "Please enter a valid year.";
        return;
    }

    fetch('https://energy-model-api-4.onrender.com/predict', {  // <-- FIXED
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ country: country, year: year })
    })
    .then(response => response.json())
    .then(data => {
        if (data.prediction) {
            document.getElementById("predictionResult").innerText = `Predicted Energy Demand for ${country} in ${year}: ${data.prediction} TWh`;
        } else {
            document.getElementById("predictionResult").innerText = "Sorry, no data available for the selected parameters.";
        }
    })
    .catch(error => {
        console.error(error);
        document.getElementById("predictionResult").innerText = "An error occurred. Please try again later.";
    });
}
