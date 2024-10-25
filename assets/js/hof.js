class Testimonial {
  constructor(image, content, author, star) {
    this.image = image;
    this.content = content;
    this.author = author;
    this.star = star;
  }

  toHTML() {
    return `<div class="testimonial">
            <img src="${this.image}" class="profile-testimonial" />
            <p class="quote">"${this.content}"</p>
            <p class="author">- ${this.author}</p>
            <p class="author"><i class="fas fa-star"></i>${this.star}</p>
        </div>`;
  }

  toHTMLWithoutRating() {
    return `<div class="testimonial">
            <img src="${this.image}" class="profile-testimonial" />
            <p class="quote">"${this.content}"</p>
            <p class="author">- ${this.author}</p>
        </div>`;
  }
}
const testimonials = [
  {
    image:
      "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=600",
    content: "Nice",
    author: "jeny",
    star: 5,
  },
  {
    image:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    content: "So bad!",
    author: "grace",
    star: 2,
  },

  {
    image:
    "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=600",
    content: "so cool!",
    author: "alice",
    star: 4,
  },

  {
  image:
  "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=600",

  content: "Good",
  author: "Natalie",
  star: 3,
},


{
image:
  "https://images.pexels.com/photos/718978/pexels-photo-718978.jpeg?auto=compress&cs=tinysrgb&w=600",

  content: "Good",
  author: "Lyla",
  star: 5,
}
]





function getAllTestimonials() { 
  const testimonialHTML = testimonials.map((testimonial) => {
    return `<div class="testimonial">
              <img src="${testimonial.image}" class="profile-testimonial" />
              <p class="quote">"${testimonial.content}"</p>
              <p class="author">- ${testimonial.author}</p>
              <p class="author"><i class="fas fa-star"></i>${testimonial.star}</p>
          </div>`
  })
  
  document.getElementById("testimonials").innerHTML = testimonialHTML.join("")
}
function getTestimonialByStar(star) {
  const filteredTestimonials = testimonials.filter((testimonial) => {
    return testimonial.star === star
  })
  const testimonialHTML = filteredTestimonials.map((testimonial) => {
    return `<div class="testimonial">
              <img src="${testimonial.image}" class="profile-testimonial" />
              <p class="quote">"${testimonial.content}"</p>
              <p class="author">- ${testimonial.author}</p>
              <p class="author"><i class="fas fa-star"></i>${testimonial.star}</p>
          </div>`
  })
  
  document.getElementById("testimonials").innerHTML = testimonialHTML.join("")
}

getAllTestimonials()
