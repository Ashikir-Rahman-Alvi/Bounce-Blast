const joystick = document.getElementById('joystick');
const container = document.querySelector('.joystick-container');




let isDragging = false;
let maxDistance;
let containerRect;
let centerX, centerY;




function updateContainerRect() {
    containerRect = container.getBoundingClientRect();
    maxDistance = (containerRect.width - joystick.offsetWidth) / 2;
    centerX = containerRect.left + containerRect.width / 2;
    centerY = containerRect.top + containerRect.height / 2;
}

function handleMove(clientX, clientY) {
    if (!isDragging) return;

    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    let x = (clientX + scrollX) - centerX;
    let y = (clientY + scrollY) - centerY;

    const distance = Math.sqrt(x * x + y * y);

    if (distance > maxDistance) {
        x = x * (maxDistance / distance);
        y = y * (maxDistance / distance);
    }

    joystick.style.transform = `
    translate(-50%, -50%)
    translate(${x}px, ${y}px)
    `;

    const normalizedX = (x / maxDistance).toFixed(2);
    const normalizedY = (y / maxDistance).toFixed(2);

    window.normalizedX = normalizedX;
    window.normalizedY = normalizedY;


}

// Event Listeners
function startDragging() {
    isDragging = true;
    updateContainerRect();
}



function stopDragging() {
    isDragging = false;
    joystick.style.transform = 'translate(-50%, -50%)';
    window.normalizedX = 0;
    window.normalizedY = 0;

}

// Mouse Events
joystick.addEventListener('mousedown', startDragging);
document.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
document.addEventListener('mouseup', stopDragging);

// Touch Events
joystick.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startDragging();
    handleMove(e.touches[0].clientX, e.touches[0].clientY);
});
document.addEventListener('touchmove', (e) => {
    e.preventDefault();
    handleMove(e.touches[0].clientX, e.touches[0].clientY);
}, {
    passive: false
});

document.addEventListener('touchend', (e) => {
    if (e.touches.length === 0) {
        stopDragging();
    }
});

// Resize Handling
window.addEventListener('resize', updateContainerRect);
const resizeObserver = new ResizeObserver(updateContainerRect);
resizeObserver.observe(container);

updateContainerRect();

// Prevent context menu
joystick.addEventListener('contextmenu', (e) => e.preventDefault());