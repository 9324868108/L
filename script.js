function startDetection(mode) {
    const ray = document.getElementById('mainRay');
    const results = document.getElementById('results');
    const pulseContainer = document.getElementById('pulseContainer');
    
    // Reset everything
    ray.style.height = '0';
    pulseContainer.innerHTML = '';
    results.classList.remove('visible');
    results.innerHTML = '';

    // Start ray animation
    ray.style.transition = 'height 2s ease';
    ray.style.height = '80%';

    // Generate pulses
    for(let i = 0; i < 5; i++) {
        const pulse = document.createElement('div');
        pulse.className = 'ultrasonic-pulse';
        pulse.style.left = ${45 + Math.random() * 10}%;
        pulse.style.top = ${20 + i * 15}%;
        pulse.style.animation = pulse 1s ${i * 0.2}s ease;
        pulseContainer.appendChild(pulse);
        
        // Remove pulse after animation
        setTimeout(() => {
            pulse.remove();
        }, (i * 200) + 1000);
    }

    // Show results
    setTimeout(() => {
        const flaws = Math.floor(Math.random() * 5);
        let resolution, depth;
        
        switch(mode) {
            case 'optical':
                resolution = '0.1μm';
                depth = '100m';
                break;
            case 'ultrasonic':
                resolution = '0.5mm';
                depth = '5m';
                break;
            case 'hybrid':
                resolution = '0.25μm';
                depth = '50m';
                break;
        }

        results.innerHTML = `
            <h3>Scan Results (${mode.toUpperCase()})</h3>
            <p>Detected Flaws: ${flaws}</p>
            <p>Resolution: ${resolution}</p>
            <p>Scan Depth: ${depth}</p>
        `;
        results.classList.add('visible');
        
        // Reset ray
        setTimeout(() => {
            ray.style.transition = 'none';
            ray.style.height = '0';
        }, 1000);
    }, 2000);
}

// Scroll animations for cards
const cards = document.querySelectorAll('.card');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

cards.forEach(card => observer.observe(card));

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    const results = document.getElementById('results');
    results.innerHTML = '<p>Please select a scan mode to begin</p>';
});
