import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { MovieCarousel } from './ui/components/MovieCarousel/MovieCarousel';
import { appStyle } from './ui/styles/App.styles';
import useApiGet from './data/hooks/useApiGet';

const App: React.FC = () => {
  const { isLoading, libraryMovies, error, setError, getLibraryMovies } =
    useApiGet();

  function onRecord() {}

  function onRemove() {}

  return (
    <SafeAreaView style={appStyle.container}>
      <Text>My Library</Text>
      {!isLoading && error === '' && libraryMovies.length > 0 && (
        <MovieCarousel
          movies={libraryMovies}
          onRecord={onRecord}
          onRemove={onRemove}
        />
      )}
    </SafeAreaView>
  );
};

export default App;
