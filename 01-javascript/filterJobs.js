//////////// Jobs filter ////////////
const techSelect = document.querySelector('#technology');
const locationSelect = document.querySelector('#location');
const experienceSelect = document.querySelector('#experience');

function filterJobs() {
  const jobPosts = document.querySelectorAll('.job-listing-card');
  const techValue = techSelect.value;
  const locationValue = locationSelect.value;
  const experienceValue = experienceSelect.value.toLowerCase();

  jobPosts.forEach((job) => {
    const jobContent = job.innerHTML.toLowerCase();
    console.log(techSelect);

    // match when no value is selected or when the whole word appear in the job content
    // let techMatch = !techValue || new RegExp(`\\b${techValue}\\b`, 'i').test(jobContent);

    let techMatch =
      !techValue ||
      (job.dataset?.technology &&
        job.dataset.technology.toLowerCase().includes(techValue)) ||
      new RegExp(`\\b${techValue}\\b`, 'i').test(jobContent);

    let locationMatch =
      !locationValue ||
      (job.dataset?.modalidad &&
        job.dataset.modalidad.toLowerCase().includes(locationValue)) ||
      new RegExp(`\\b${locationValue}\\b`, 'i').test(jobContent);

    let experienceMatch =
      !experienceValue ||
      (job.dataset?.nivel &&
        job.dataset.nivel.toLowerCase().includes(experienceValue)) ||
      new RegExp(`\\b${experienceValue}\\b`, 'i').test(jobContent);

    // let locationMatch =
    //   !locationValue ||
    //   new RegExp(`\\b${locationValue}\\b`, 'i').test(jobContent) ||
    //   locationValue === job.modalidad;
    // let experienceMatch =
    //   !experienceValue ||
    //   job.dataset?.experience === experienceValue ||
    //   new RegExp(`\\b${experienceValue}\\b`, 'i').test(jobContent);

    // show if all match
    const isShown = techMatch && locationMatch && experienceMatch;
    job.classList.toggle('hidden', !isShown);

    // Old version - only one filter at a time

    //   if (selectedValue === '' || selectedValue === modalidad) {
    //     job.style.display = 'flex';
    //   } else {
    //     job.style.display = 'none';
    //   }
  });
}

techSelect.addEventListener('change', filterJobs);
locationSelect.addEventListener('change', filterJobs);
experienceSelect.addEventListener('change', filterJobs);

// Initial filter on page load
filterJobs();
