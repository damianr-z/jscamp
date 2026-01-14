const container = document.querySelector('.jobs-listings');

const RESULTS_PER_PAGE = 3;

fetch('./data.json') /* fetch es asíncrono */
  .then((response) => {
    return response.json();
  })
  .then((jobs) => {

    jobs.forEach((job) => {
      const article = document.createElement('article');
      article.className = 'job-listing-card';

      article.dataset.technology = job.data.technology;
      article.dataset.modalidad = job.data.modalidad;
      article.dataset.nivel = job.data.nivel;

      article.innerHTML = `<section class="jobHeader">
        <div>
          <h3>${job.titulo}</h3>
          <p>${job.empresa} | ${job.ubicacion}</p>
          </div>
          <button class="button-apply-job">Aplicar</button>
          </section>
          <p>${job.descripcion}</p>`;

          console.log(article);

      container.appendChild(article);
    });

  });

// <article data-experience="junior" class="jobPost">
//   <section class="jobHeader">
//     <div>
//       <h3>Software Engineer</h3>
//       <p>Tech Solutions Inc | Hybrid</p>
//     </div>
//     <button class="applyBtn">Apply</button>
//   </section>
//   <p>
//     We are looking for a Software Engineer with experience in web
//     development and knowledge of JavaScript, React, and Node.js. The
//     ideal candidate should be able to work in a team environment and
//     have good communication skills.
//   </p>
// </article>
///

