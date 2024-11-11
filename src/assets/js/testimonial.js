async function displayTestimonials(testimonials) {
  const testimonialContainer = document.getElementById('testimonials');
  testimonialContainer.innerHTML = '';  

  testimonials.forEach(testimonial => {
    const testimonialCard = document.createElement('div');
    testimonialCard.classList.add('testimonial-card');

    const img = document.createElement('img');
    img.src = testimonial.image; 
    img.alt = `${testimonial.name}'s photo`;
    testimonialCard.appendChild(img);

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');

    const name = document.createElement('h4');
    name.textContent = testimonial.name;
    cardContent.appendChild(name);

    const message = document.createElement('p');
    message.textContent = testimonial.messege; 
    cardContent.appendChild(message);

    const rating = document.createElement('div');
    rating.classList.add('rating');
    for (let i = 0; i < testimonial.rating; i++) {
      const star = document.createElement('i');
      star.classList.add('fa-solid', 'fa-star');
      rating.appendChild(star);
    }
    cardContent.appendChild(rating);

    testimonialCard.appendChild(cardContent);
    testimonialContainer.appendChild(testimonialCard);
  });
}

async function fetchAndDisplayTestimonials() {
  const testimonialContainer = document.getElementById('testimonials');
  testimonialContainer.innerHTML = '';  

  try {
    const response = await fetch("https://api.npoint.io/1a967f2a65134544c20b");
    if (!response.ok) {
      throw new Error('Gagal mengambil data testimonial');
    }
    const testimonials = await response.json();
    displayTestimonials(testimonials);
    
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    testimonialContainer.innerHTML = ' terjadi kesalahan saat memuat testimonial ';
  }
}

async function filterTestimonialsByRating(ratingFilter) {
  const testimonialContainer = document.getElementById('testimonials');
  testimonialContainer.innerHTML = '';  

  try {
    const response = await fetch("https://api.npoint.io/1a967f2a65134544c20b");
    if (!response.ok) {
      throw new Error('Gagal mengambil data testimonial');
    }
    const testimonials = await response.json();

    const filteredTestimonials = testimonials.filter(testimonial => {
      return ratingFilter === 0 || testimonial.rating === ratingFilter;
    });

    displayTestimonials(filteredTestimonials);

  } catch (error) {
    console.error('Error fetching testimonials:', error);
    testimonialContainer.innerHTML = ' terjadi kesalahan saat memuat testimonial ';
  }
}

function getTestimonialByStar(rating) {
  filterTestimonialsByRating(rating);
}

function getAllTestimonials() {
  fetchAndDisplayTestimonials();
}

fetchAndDisplayTestimonials();
