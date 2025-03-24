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
  // Set shapes container height to match document height
  const shapesContainer = document.querySelector('.shapes-container');
  if (shapesContainer) {
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    shapesContainer.style.height = `${docHeight}px`;
  }

  // Process all shapes
  const shapes = document.querySelectorAll('.elegant-shape');
  shapes.forEach((shape, index) => {
    // Determine if this is a hero shape
    const isHero = shape.classList.toString().includes('shape-hero');

    // Set random rotation values for varied orientations
    let randomRotateStart, randomRotateEnd;

    if (isHero) {
      // More pronounced rotation for hero shapes
      const baseRotate = index % 2 === 0 ? 15 : -15;
      randomRotateStart = baseRotate - 15;
      randomRotateEnd = baseRotate;
    } else {
      // Subtle rotation for other shapes
      randomRotateStart = Math.floor(Math.random() * 60) - 30;
      randomRotateEnd = randomRotateStart + (Math.random() > 0.5 ? 15 : -15);
    }

    shape.style.setProperty('--rotate-start', `${randomRotateStart}deg`);
    shape.style.setProperty('--rotate-end', `${randomRotateEnd}deg`);

    // Add animation delay variation
    let baseDelay =
      parseFloat(window.getComputedStyle(shape).animationDelay) || 0;
    if (isNaN(baseDelay)) baseDelay = 0;

    // Ensure we don't override explicit delays set in CSS
    if (baseDelay === 0) {
      const newDelay = isHero ? 0.3 + index * 0.1 : 0.6 + index * 0.1;
      shape.style.animationDelay = `${newDelay}s`;
    }

    // Add float animation variation
    const shapeInner = shape.querySelector('.shape-inner');
    if (shapeInner) {
      // Vary the animation duration
      const baseDuration = isHero ? 12 : 15;
      const randomDuration = baseDuration + Math.random() * 3;
      shapeInner.style.animationDuration = `${randomDuration}s`;

      // Add horizontal floating to some shapes
      if (index % 3 === 1) {
        shapeInner.style.animationName = 'shape-float-horizontal';
      }
    }

    // Set initial opacity for animation
    shape.style.opacity = '0';
  });

  // Update shapes container height on window resize
  window.addEventListener('resize', () => {
    if (shapesContainer) {
      const newDocHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      shapesContainer.style.height = `${newDocHeight}px`;
    }
  });
}
