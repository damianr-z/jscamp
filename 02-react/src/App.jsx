import { useState } from 'react';

import { Header } from './components/Header.jsx';
import Search from './components/Search.jsx';
import { Footer } from './components/Footer.jsx';

import { SearchFormSection } from './components/SearchFormSection.jsx';

const RESULTS_PER_PAGE = 4;

function App() {
  return (
    <>
      <Header />
      <Search />
      <Footer />
    </>
  );
}

export default App;
