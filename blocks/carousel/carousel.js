export default function decorate(block) {
  const slides = [...block.children].filter(
    (el) => !el.classList.contains('button-action-container') && el.tagName !== 'UL',
  );
 
  if (slides.length === 1) {
    slides[0].classList.add('carousel-active');
    return;
  }
 
  const dots = document.createElement('ul');
 
  slides.forEach((slide, i) => {
    const li = document.createElement('li');
 
    if (i === 0) {
      slide.classList.add('carousel-active');
      li.classList.add('list-active');
    }
 
    dots.append(li);
  });
 
  block.append(dots);
 
  const actions = document.createElement('div');
  actions.className = 'button-action-container';
 
  actions.innerHTML = `
    <button class="action-previous" type="button" aria-label="Prev Button"></button>
    <button class="action-next" type="button" aria-label="Next Button"></button>
  `;
 
  block.append(actions);
 
  const prevBtn = block.querySelector('.action-previous');
  const nextBtn = block.querySelector('.action-next');
  const indicators = [...dots.children];
 
  let current = 0;
 
  function updateCarousel() {
    slides.forEach((slide, i) => {
      slide.classList.toggle('carousel-active', i === current);
    });
 
    indicators.forEach((dot, i) => {
      dot.classList.toggle('list-active', i === current);
    });
  }
 
  function showPrev() {
    current = (current - 1 + slides.length) % slides.length;
    updateCarousel();
  }
 
  function showNext() {
    current = (current + 1) % slides.length;
    updateCarousel();
  }
 
  function goToSlide(index) {
    current = index;
    updateCarousel();
  }
 
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);
 
  indicators.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
  });
}
