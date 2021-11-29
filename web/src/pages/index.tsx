import type { NextPage } from 'next';
import { useState } from 'react';
import Header from '../ui/components/Header/Header';
import { MainContainer } from '../ui/styles/index.styled';

const Home: NextPage = () => {
  const [isLibrarySelected, setIsLibrarySelected] = useState(false);

  return (
    <MainContainer>
      <Header
        isLibrarySelected={isLibrarySelected}
        onSearchSelect={() => setIsLibrarySelected(false)}
        onLibrarySelect={() => setIsLibrarySelected(true)}
      />
    </MainContainer>
  );
};

export default Home;
