const jobsListingSection = document.querySelector('.jobs-listings');

jobsListingSection.addEventListener('click', (event) => {
  const element = event.target;
  if (element.classList.contains('button-apply-job')) {
    element.textContent = 'Applied';
    element.classList.add('applied');
    element.disabled = true;
  }
});

