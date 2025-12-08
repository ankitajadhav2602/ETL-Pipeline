
document.getElementById('orderForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Get date from input
    let rawDate = document.getElementById('date').value; // This will already be YYYY-MM-DD if using <input type="date">

    // If you want to ensure format:
    let formattedDate = new Date(rawDate).toISOString().split('T')[0]; // Converts to YYYY-MM-DD

    const orderData = {
        order_id: document.getElementById('order_id').value,
        store_id: document.getElementById('store_id').value,
        date: formattedDate, // Use formatted date
        amount: document.getElementById('amount').value
    };

    const statusElement = document.getElementById('status');
    statusElement.innerText = 'Submitting order...';
    statusElement.style.color = 'blue';

    try {
        
            const response = await fetch('https://h4dvf83sph.execute-api.ap-south-1.amazonaws.com/prod/submit-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        const result = await response.json();
        statusElement.innerText = result.message || 'Order submitted successfully!';
        statusElement.style.color = 'green';

        document.getElementById('orderForm').reset();
    } catch (error) {
        statusElement.innerText = 'Error submitting order!';
        statusElement.style.color = 'red';
    }
});
