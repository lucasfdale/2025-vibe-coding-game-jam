document.addEventListener('DOMContentLoaded', function () {
  // Initialize animations
  initAnimations();

  // Initialize countdown timer
  initCountdown();

  // Initialize copy button
  initCopyButton();

  // Initialize floating shapes
  initShapes();
});

function initAnimations() {
  // Fade up animations
  const fadeElements = document.querySelectorAll('.fade-up');
  fadeElements.forEach((element) => {
    const delay = parseFloat(element.getAttribute('data-delay') || 0);
    setTimeout(() => {
      element.style.transition = 'opacity 1s ease, transform 1s ease';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 500 + delay * 1000);
  });

  // Section fade animations
  const sectionElements = document.querySelectorAll('.section-fade');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.transition = 'opacity 1s ease, transform 1s ease';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';

        // Animate children with fade-up class
        const children = entry.target.querySelectorAll('.fade-up');
        children.forEach((child, index) => {
          const delay = parseFloat(child.getAttribute('data-delay') || 0);
          setTimeout(() => {
            child.style.transition = 'opacity 1s ease, transform 1s ease';
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
          }, 300 + (delay + index * 0.1) * 1000);
        });

        sectionObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sectionElements.forEach((section) => {
    sectionObserver.observe(section);
  });
}

function initCountdown() {
  const deadline = new Date('2025-04-01T23:59:59').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = deadline - now;

    if (distance < 0) {
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days
      .toString()
      .padStart(2, '0');
    document.getElementById('hours').textContent = hours
      .toString()
      .padStart(2, '0');
    document.getElementById('minutes').textContent = minutes
      .toString()
      .padStart(2, '0');
    document.getElementById('seconds').textContent = seconds
      .toString()
      .padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

function initCopyButton() {
  const copyButton = document.getElementById('copy-button');
  const codeElement = document.getElementById('entrant-code');

  copyButton.addEventListener('click', () => {
    navigator.clipboard
      .writeText(codeElement.textContent)
      .then(() => {
        copyButton.textContent = 'Copied! ✓';
        copyButton.classList.add('copied');

        setTimeout(() => {
          copyButton.textContent = 'Copy';
          copyButton.classList.remove('copied');
        }, 2000);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  });
}

function initShapes() {
  const shapes = document.querySelectorAll('.elegant-shape');

  shapes.forEach((shape, index) => {
    // Set random rotation values for varied orientations
    const randomRotateStart = Math.floor(Math.random() * 60) - 30; // Random value between -30 and 30
    const randomRotateEnd =
      randomRotateStart + (Math.random() > 0.5 ? 15 : -15); // Add or subtract 15 degrees

    shape.style.setProperty('--rotate-start', `${randomRotateStart}deg`);
    shape.style.setProperty('--rotate-end', `${randomRotateEnd}deg`);

    // Add random animation delay variation
    const currentDelay = parseFloat(
      window.getComputedStyle(shape).animationDelay
    );
    const newDelay = currentDelay + (Math.random() * 0.5 - 0.25); // Add -0.25 to 0.25 seconds
    shape.style.animationDelay = `${newDelay}s`;

    // Add random float animation duration variation
    const shapeInner = shape.querySelector('.shape-inner');
    if (shapeInner) {
      const randomDuration = 10 + Math.random() * 4; // Between 10 and 14 seconds
      shapeInner.style.animationDuration = `${randomDuration}s`;
    }
  });
}
