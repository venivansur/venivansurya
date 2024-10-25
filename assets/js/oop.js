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

 const testimonial1 = new Testimonial(
   "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
   "Mantap sekali bro!",
  "",
  5
 );

 const testimonial2 = new Testimonial(
   "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600",
   "Okelah!",
   "Anti",
  3
);

 const testimonial3 = new Testimonial(
  "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=600",
  "Sip!",
  "Ucok",
   1
 );

 const testimonial4 = new Testimonial(
   "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=600",
   "Mantap lah!",
   "Ganang",
   5
 );


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
    content: "Awesome!",
    author: "grace",
    star: 5,
  },

  {
    image:
    "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=600",
    content: "so cool!",
    author: "alice",
    star: 5,
  },







];

let testimonialHTML = "";
for (let index = 0; index < testimonials.length; index++) {
  const { image, content, author, star } = testimonials[index];

  testimonialHTML += new Testimonial(image, content, author, star).toHTMLWithoutRating();
}

document.getElementById("testimonials").innerHTML = testimonialHTML;