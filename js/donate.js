function handleDonation(plan) {
    const numStudents = document.getElementById(`students${plan}`).textContent;
    const total = document.getElementById(`total${plan}`).textContent;
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    // Show payment modal
    const modal = document.createElement('div');
    modal.className = 'payment-modal card-3d';
    modal.innerHTML = `
        <div class="p-6 bg-white rounded-lg">
            <h3 class="text-xl font-bold mb-4 text-[#187ea8]">Payment Details</h3>
            <p class="mb-4">Please transfer ${total} USD to:</p>
            <div class="bg-gray-50 p-4 rounded-lg mb-4">
                <p class="font-bold">ABA Bank Account</p>
                <p class="text-lg select-all">009693942</p>
                <p class="text-sm text-gray-600 mt-2">Account Name: SonShine Kids Cambodia</p>
            </div>
            <p class="text-sm text-gray-600">
                After payment, please send your transaction screenshot to:
                <a href="mailto:utdamsong777@gmail.com" class="text-[#187ea8]">utdamsong777@gmail.com</a>
            </p>
            <button onclick="closePaymentModal()" 
                class="btn-3d w-full bg-[#187ea8] text-white px-6 py-3 rounded-full mt-4">
                Close
            </button>
        </div>
    `;
    
    // Add both overlay and modal to the body
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
}

function closePaymentModal() {
    document.querySelector('.modal-overlay').remove();
    document.querySelector('.payment-modal').remove();
    // Restore body scrolling
    document.body.style.overflow = 'auto';
}
