// Main JavaScript file for Video Editor Portfolio

// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';

            // Initialize skill bars after preloader is hidden
            initSkillBars();

            // Add active class to animate elements that are in viewport on load
            checkIfInView();
        }, 500);
    }, 1500);
});

// Initialize Particles.js
document.addEventListener('DOMContentLoaded', function() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#00e5ff', '#ff00e1', '#654aff']
                },
                shape: {
                    type: 'circle',
                },
                opacity: {
                    value: 0.5,
                    random: true,
                },
                size: {
                    value: 3,
                    random: true,
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00e5ff',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    out_mode: 'out',
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 3
                    },
                }
            },
            retina_detect: true
        });
    }

    // Initialize the rest of the script
    initScript();
});

function initScript() {
    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (cursor && cursorFollower) {
        cursor.style.display = 'block';
        cursorFollower.style.display = 'block';

        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            setTimeout(function() {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 80);
        });

        document.addEventListener('mousedown', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });

        document.addEventListener('mouseup', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        // Add hover effect to all links and buttons
        const hoverElements = document.querySelectorAll('a, button, .portfolio-item, .service-card, .filter-item');

        hoverElements.forEach(item => {
            item.addEventListener('mouseenter', function() {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.5)';
                cursorFollower.style.opacity = '0.5';
            });

            item.addEventListener('mouseleave', function() {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.opacity = '1';
            });
        });
    }

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');

            // Change burger icon to X
            const spans = this.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }

    // Portfolio filter functionality
    const filterItems = document.querySelectorAll('.filter-item');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all filter items
            filterItems.forEach(filter => filter.classList.remove('active'));

            // Add active class to clicked filter item
            this.classList.add('active');

            // Get filter value
            const filterValue = this.getAttribute('data-filter');

            // Show/hide portfolio items based on filter value
            portfolioItems.forEach(portfolio => {
                if (filterValue === 'all') {
                    portfolio.style.display = 'block';
                    setTimeout(() => {
                        portfolio.style.opacity = '1';
                        portfolio.style.transform = 'scale(1)';
                    }, 300);
                } else if (portfolio.getAttribute('data-category') === filterValue) {
                    portfolio.style.display = 'block';
                    setTimeout(() => {
                        portfolio.style.opacity = '1';
                        portfolio.style.transform = 'scale(1)';
                    }, 300);
                } else {
                    portfolio.style.opacity = '0';
                    portfolio.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        portfolio.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (mobileMenuToggle) {
                        mobileMenuToggle.classList.remove('active');

                        // Reset burger icon
                        const spans = mobileMenuToggle.querySelectorAll('span');
                        spans.forEach(span => span.classList.remove('active'));
                    }
                }
            }
        });
    });

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');

    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (this.scrollY > 500) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });

        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Animation on scroll for elements with .animate class
    const animateElements = document.querySelectorAll('.animate');

    function checkIfInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    // Run on scroll
    window.addEventListener('scroll', checkIfInView);

    // Skill bars animation
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');

        skillBars.forEach(bar => {
            const width = bar.parentElement.parentElement.querySelector('.skill-name span:last-child').textContent;
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });
    }

    // Form validation
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            let isValid = true;
            const formElements = this.elements;

            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].type !== 'submit' && formElements[i].value.trim() === '') {
                    isValid = false;
                    formElements[i].classList.add('error');
                } else if (formElements[i].type !== 'submit') {
                    formElements[i].classList.remove('error');
                }
            }

            if (isValid) {
                // Form is valid, you can add AJAX submission here
                const submitButton = this.querySelector('.btn-submit');
                const originalText = submitButton.textContent;

                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;

                // Simulate form submission
                setTimeout(() => {
                    this.reset();
                    submitButton.textContent = 'Message Sent!';
                    submitButton.classList.add('success');

                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                        submitButton.classList.remove('success');
                    }, 3000);
                }, 1500);
            }
        });
    }

    // Parallax effect
    const parallaxElements = document.querySelectorAll('.parallax');

    window.addEventListener('scroll', function() {
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -this.scrollY * speed;
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}
  const viewBtn = document.getElementById('viewProjectBtn');
  const videoContainer = document.getElementById('videoContainer');
  const video = document.getElementById('projectVideo');
  const playPauseBtn = document.getElementById('playPauseBtn');
   const projectCard  = document.getElementById("projectCard")
  viewBtn.addEventListener('click', (e) => {
    e.preventDefault();
    projectCard.style.display = "none"
    videoContainer.style.display = 'block';
    video.play();
    playPauseBtn.textContent = '⏸ Pause';
  });

  playPauseBtn.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      playPauseBtn.textContent = '⏸ Pause';
    } else {
      video.pause();
      playPauseBtn.textContent = '▶️ Play';
    }
  });