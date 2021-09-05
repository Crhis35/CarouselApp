import React, { useState, useRef, useEffect } from 'react';

import styled from 'styled-components/native';

import { Colors } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { Animated } from 'react-native';
import { Movie } from './src/infraestructure/types';
import { SafeArea } from './src/components/shared/SafeView';
import { Loading, LoadingContainer } from './src/components/shared/Loading';
import Carousel from './src/components/Carousel/Carousel';
import Backdrop from './src/components/Backdrop/Backdrop';
import { loadIndex } from './src/infraestructure/utils';

const NUM = 10;

export const Container = styled.View`
  flex: 1;
`;

export const getMovies = (): Promise<Movie[]> => {
  const movies = Array.from({ length: NUM }, (_, i) => ({
    key: i.toString(),
    title: `Movie ${i}`,
    // source: 'https://source.unsplash.com/random',
    source: `https://picsum.photos/1440/2842?random=${i}`,
  })) as Movie[];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(movies);
    }, 2000);
    if (movies.length === 0) {
      reject('No movies');
    }
  });
};

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [index, setCurrIndex] = useState(1);
  const [loading, setLoading] = useState(true);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let didCancel = true;
    const fetchData = async () => {
      try {
        const movies = await getMovies();
        setMovies([{ key: 'empty-left' }, ...movies, { key: 'empty-right' }]);
        const idx = await loadIndex();
        console.log('idx', idx);
        setCurrIndex(idx || 1);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (didCancel) fetchData();
    return () => {
      didCancel = false;
    };
  }, []);

  return (
    <SafeArea>
      {loading ? (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      ) : (
        <Container>
          <Backdrop movies={movies} scrollX={scrollX} index={index} />
          <Carousel movies={movies} scrollX={scrollX} index={index} />
        </Container>
      )}
      <StatusBar style="auto" />
    </SafeArea>
  );
}
