//////////// Jobs filter ////////////

const jobPosts = document.querySelectorAll('.jobPost');
const techSelect = document.querySelector('#technology');
const locationSelect = document.querySelector('#location');
const experienceSelect = document.querySelector('#experience');

function filterJobs() {
  const techValue = techSelect.value;
  const locationValue = locationSelect.value;
  const experienceValue = experienceSelect.value.toLowerCase();

  console.log(experienceValue);

  jobPosts.forEach((job) => {
    const jobContent = job.textContent.toLowerCase();

    // match when no value is selected or when the whole word appear in the job content
    let techMatch =
      !techValue || new RegExp(`\\b${techValue}\\b`, 'i').test(jobContent);
    let locationMatch =
      !locationValue ||
      new RegExp(`\\b${locationValue}\\b`, 'i').test(jobContent);
    let experienceMatch =
      !experienceValue ||
      job.dataset?.experience === experienceValue ||
      new RegExp(`\\b${experienceValue}\\b`, 'i').test(jobContent);

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
