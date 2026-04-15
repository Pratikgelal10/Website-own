document.addEventListener("DOMContentLoaded", () => {

    // --- 1. DECRYPTION SCRAMBLE EFFECT ---
    const decryptLinks = document.querySelectorAll('.decrypt-link');
    const scrambleChars = "$%#&/()?¿*><+[]{}";

    decryptLinks.forEach(link => {
        const originalText = link.getAttribute('data-text');
        const textElement = link.querySelector('.decrypt-text');

        function scrambleText() {
            let iteration = 0;
            let interval = setInterval(() => {
                textElement.innerText = originalText
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) return originalText[index];
                        return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                    })
                    .join("");

                if (iteration >= originalText.length) {
                    clearInterval(interval);
                    textElement.innerText = originalText;
                }
                iteration += 1 / 3;
            }, 30);
        }

        link.addEventListener('mouseover', scrambleText);
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href') === '#') e.preventDefault();
            scrambleText();
        });
    });

    // --- 2. PYTHON UPLINK (FORM SUBMISSION) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.btn-hacker');
            const originalBtnText = submitBtn.innerText;

            const payload = {
                full_name: document.getElementById('userName').value,
                email: document.getElementById('userEmail').value,
                message: document.getElementById('userMessage').value
            };

            submitBtn.innerText = "TRANSMITTING...";
            submitBtn.disabled = true;

            try {
                const response = await fetch('http://127.0.0.1:5000/send-message', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    alert("PROTOCOL SUCCESS: Message Sent.");
                    contactForm.reset();
                } else {
                    alert("UPLINK ERROR: Server rejected payload.");
                }
            } catch (err) {
                alert("CRITICAL ERROR: Backend server is offline.");
            } finally {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});