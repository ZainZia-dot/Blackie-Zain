document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle Functionality ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to set the theme based on local storage or system preference
    const setTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (!savedTheme) {
            // If no theme is saved, check user's system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                body.classList.add('dark-mode');
            } else {
                body.classList.add('light-mode');
            }
        } else if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
        } else {
            body.classList.add('light-mode');
        }
    };

    // Apply the correct theme when the DOM is loaded
    setTheme();

    // Event listener for the theme toggle button
    themeToggleButton.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark'); // Save preference
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light'); // Save preference
        }
    });

    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor jump

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                window.scrollTo({
                    top: targetSection.offsetTop - headerHeight, // Adjust for fixed header
                    behavior: 'smooth' // Smooth scroll effect
                });
            }
        });
    });

    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            const nameInput = contactForm.querySelector('input[type="text"]');
            const emailInput = contactForm.querySelector('input[type="email"]');
            const messageTextarea = contactForm.querySelector('textarea');

            // Basic client-side validation
            if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || messageTextarea.value.trim() === '') {
                displayFormMessage('Please fill in all fields.', 'error');
                return;
            }

            if (!validateEmail(emailInput.value.trim())) {
                displayFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission (in a real app, send to backend)
            console.log('Form submitted:', {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                message: messageTextarea.value.trim()
            });

            displayFormMessage('Your message has been sent successfully!', 'success');

            // Clear the form after successful submission
            contactForm.reset();
        });
    }

    // Function to display form messages (success/error)
    function displayFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message'; // Reset classes
        formMessage.classList.add(type); // Add 'success' or 'error' class
        formMessage.classList.remove('hidden'); // Make it visible

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000);
    }

    // Email validation helper function
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // --- Intersection Observer for Section Animations (Fade-in-Up) ---
    const sections = document.querySelectorAll('main section:not(#hero)'); // Exclude hero as it has separate animations

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up'); // Apply fade-in-up animation
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('animated-section'); // Add base class for transition
        sectionObserver.observe(section);
    });

    // --- Dynamic Background for Hero Section (Subtle Parallax-like effect) ---
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            // Adjust the background position based on scroll to create a slight parallax effect
            heroSection.style.backgroundPositionY = -scrollPosition * 0.1 + 'px'; // Slower movement
        });
    }

    // --- Staggered Animation for Skill Cards ---
    const skillCards = document.querySelectorAll('.skill-card');
    const skillSection = document.getElementById('skills');

    if (skillSection && skillCards.length > 0) {
        const skillObserverOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3 // Trigger when 30% of the skill section is visible
        };

        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillCards.forEach((card, index) => {
                        // Apply a delay to each card for a staggered animation
                        card.style.animationDelay = `${index * 0.15}s`; // 150ms delay per card
                        card.classList.add('slide-in-bottom'); // New animation class
                    });
                    observer.unobserve(skillSection); // Stop observing after animation
                }
            });
        }, skillObserverOptions);

        skillObserver.observe(skillSection);
    }
});
