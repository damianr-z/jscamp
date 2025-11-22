import { SearchFormSection } from './SearchFormSection';
import { JobListings } from './JobListings';
import { Pagination } from './Pagination';
import { useJobSearch } from '../hooks/useJobSearch';
import jobsData from '../data.json';

const RESULTS_PER_PAGE = 4;

export default function Search() {
  const {
    pagedResults,
    totalPages,
    currentPage,
    hasActiveFilters,
    handleSearch,
    handleTextFilter,
    handlePageChange,
    handleClearFilters,
  } = useJobSearch(jobsData, RESULTS_PER_PAGE);

  return (
    <main>
      <SearchFormSection
        onSearch={handleSearch}
        onTextFilter={handleTextFilter}
      />
      {hasActiveFilters && (
        <button onClick={handleClearFilters}>Clear filters</button>
      )}
      <section>
        <JobListings jobs={pagedResults} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </main>
  );
}
