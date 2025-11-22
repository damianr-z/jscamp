import { useState, useMemo } from 'react';

export function useJobSearch(jobsData, resultsPerPage = 4) {
  const [filters, setFilters] = useState({
    technology: '',
    location: '',
    experienceLevel: '',
  });
  const [textToFilter, setTextToFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const hasActiveFilters = Object.values(filters).some((value) => value !== '') || textToFilter !== '';

  const handleClearFilters = () => {
    setFilters({
      technology: '',
      location: '',
      experienceLevel: '',
    });
    setTextToFilter('');
  };

  // Filter jobs based on current filters
  const filteredJobs = useMemo(() => {
    let jobs = jobsData;

    // Apply technology filter
    if (filters.technology) {
      jobs = jobs.filter((job) => job.data.technology === filters.technology);
    }

    // Apply location filter
    if (filters.location) {
      jobs = jobs.filter((job) => job.data.modalidad === filters.location);
    }

    // Apply experience level filter
    if (filters.experienceLevel) {
      jobs = jobs.filter((job) => job.data.nivel === filters.experienceLevel);
    }

    // Apply text search
    if (textToFilter) {
      jobs = jobs.filter((job) =>
        job.titulo.toLowerCase().includes(textToFilter.toLowerCase())
      );
    }

    return jobs;
  }, [jobsData, filters, textToFilter]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredJobs.length / resultsPerPage);
  const pagedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = currentPage * resultsPerPage;
    return filteredJobs.slice(startIndex, endIndex);
  }, [filteredJobs, currentPage, resultsPerPage]);

  // Handler functions
  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleTextFilter = (newTextToFilter) => {
    setTextToFilter(newTextToFilter);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return {
    // State
    filters,
    textToFilter,
    currentPage,

    // Computed values
    filteredJobs,
    pagedResults,
    totalPages,
    totalResults: filteredJobs.length,
    hasActiveFilters,

    // Handler functions
    handleSearch,
    handleTextFilter,
    handlePageChange,
    handleClearFilters,
  };
}
