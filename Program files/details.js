document.addEventListener('DOMContentLoaded', () => {
    const passengerCount = localStorage.getItem('passengers');
    
    if (passengerCount) {
        const passengerDetailsContainer = document.getElementById('passenger-details-container');
        
        for (let i = 1; i <= passengerCount; i++) {
            const passengerFields = `
                <fieldset>
                    <legend>Passenger ${i} Details</legend>
                    <label for="pax${i}-name">Name:</label>
                    <input type="text" id="pax${i}-name" required><br>
                    <label for="pax${i}-middle-name">Middle Name:</label>
                    <input type="text" id="pax${i}-middle-name"><br>
                    <label for="pax${i}-last-name">Last Name:</label>
                    <input type="text" id="pax${i}-last-name" required><br>
                    <label for="pax${i}-email">Email:</label>
                    <input type="email" id="pax${i}-email" required><br>
                    <label for="pax${i}-phone">Phone:</label>
                    <input type="tel" id="pax${i}-phone" pattern="\\d{10}" title="Phone number must be exactly 10 digits" required><br>
                    <label for="pax${i}-age">Age:</label>
                    <input type="number" id="pax${i}-age" min="1" required><br>
                    <label for="pax${i}-passport">Passport:</label>
                    <input type="text" id="pax${i}-passport" minlength="15" title="Passport number must be at least 15 characters long" required>
                </fieldset>
                <hr>
            `;
            passengerDetailsContainer.innerHTML += passengerFields;
        }

        const detailsForm = document.getElementById('passenger-details-form');
        detailsForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Collect all passenger details
            const passengers = [];
            let hasError = false;

            for (let i = 1; i <= passengerCount; i++) {
                const name = document.querySelector(`#pax${i}-name`).value;
                const middleName = document.querySelector(`#pax${i}-middle-name`).value;
                const lastName = document.querySelector(`#pax${i}-last-name`).value;
                const email = document.querySelector(`#pax${i}-email`).value;
                const phone = document.querySelector(`#pax${i}-phone`).value;
                const age = document.querySelector(`#pax${i}-age`).value;
                const passport = document.querySelector(`#pax${i}-passport`).value;

                // Validate phone number
                if (!/^\d{10}$/.test(phone)) {
                    alert(`Passenger ${i}: Please enter a valid 10-digit phone number.`);
                    hasError = true;
                    break;
                }

                // Validate age
                if (age < 18) {
                    alert(`Passenger ${i}: You must be at least 18 years old to book a flight ticket.`);
                    hasError = true;
                    break;
                }

                // Validate passport number
                if (passport.length < 15) {
                    alert(`Passenger ${i}: Please enter a passport number with at least 15 characters.`);
                    hasError = true;
                    break;
                }

                passengers.push({ name, middleName, lastName, email, phone, age, passport });
            }

            if (!hasError) {
                // Save all passengers' details as an array in local storage
                localStorage.setItem('passengerDetails', JSON.stringify(passengers));
                window.location.href = 'ticket.html'; // Redirect to ticket generation page
            }
        });
    }
});
