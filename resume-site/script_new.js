/**
 * ADI DIGITAL WORLD - Main JavaScript
 * Handles dynamic functionality and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Update current year in footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Handle contact form submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }

  // Add smooth scroll behavior for navigation links
  addSmoothScrolling();

  // Initialize intersection observer for scroll animations
  initializeIntersectionObserver();
});

/**
 * Handle contact form submission
 */
function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  // Get form values
  const name = formData.get('name');
  const email = formData.get('email');
  const company = formData.get('company');
  const service = formData.get('service');
  const message = formData.get('message');

  // Basic validation
  if (!name || !email || !message) {
    showNotification('Please fill in all required fields', 'error');
    return;
  }

  // Email validation
  if (!isValidEmail(email)) {
    showNotification('Please enter a valid email address', 'error');
    return;
  }

  // Simulate form submission (replace with actual API call)
  console.log('Form submitted:', {
    name,
    email,
    company,
    service,
    message,
    timestamp: new Date().toISOString()
  });

  // Show success message
  showNotification(
    'Thank you! Your message has been sent. We\'ll get back to you soon.',
    'success'
  );

  // Reset form
  form.reset();

  // Optional: Send to backend API
  // sendFormToBackend(formData);
}

/**
 * Email validation helper
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Show notification message to user
 */
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Style the notification
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#0066ff'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    animation: slideIn 0.3s ease;
    font-weight: 500;
  `;

  // Add animation keyframes if not already present
  if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(400px);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Add to page
  document.body.appendChild(notification);

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

/**
 * Add smooth scrolling to navigation links
 */
function addSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Skip if it's just "#"
      if (href === '#') {
        return;
      }

      e.preventDefault();

      const targetElement = document.querySelector(href);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Adjust for sticky header
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Initialize Intersection Observer for scroll animations
 */
function initializeIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all service cards, case study cards, and testimonials
  const elements = document.querySelectorAll(
    '.service-card, .case-study-card, .testimonial-card'
  );

  elements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });
}

/**
 * Optional: Send form data to backend API
 * Uncomment and modify endpoint as needed
 */
/*
async function sendFormToBackend(formData) {
  try {
    const response = await fetch('https://your-api.com/contact', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
    showNotification('There was an error sending your message. Please try again.', 'error');
  }
}
*/

/**
 * Analytics tracking helper (integrate with Google Analytics, etc.)
 */
function trackEvent(eventName, eventData = {}) {
  if (window.gtag) {
    gtag('event', eventName, eventData);
  }
  console.log(`Event tracked: ${eventName}`, eventData);
}

// Track CTA button clicks
document.addEventListener('click', (e) => {
  if (e.target.matches('.button')) {
    const buttonText = e.target.textContent.trim();
    trackEvent('button_click', {
      button_text: buttonText
    });
  }
});
