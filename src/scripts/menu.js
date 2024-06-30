// JavaScript for Hamburger Button and Off-canvas Menu

const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const nav = document.querySelector('nav');

burger.addEventListener('click', () => {
    // Toggle Nav
    navLinks.classList.toggle('nav-active');
    
    // Burger Animation
    burger.classList.toggle('active');
});
