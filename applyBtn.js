const jobsListingSection = document.querySelector('.jobs-listing');

jobsListingSection.addEventListener('click', (event) => {
  const element = event.target;
  if (element.classList.contains('applyBtn')) {
    element.textContent = 'Applied';
    element.classList.add('applied');
    element.disabled = true;
  }
});

