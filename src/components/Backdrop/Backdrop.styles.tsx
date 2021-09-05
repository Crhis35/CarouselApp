import { Animated, FlatList, Image, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import styled from 'styled-components/native';
import { BACKDROP_HEIGHT, height, width } from '../../infraestructure/sizes';
import { Movie } from '../../infraestructure/types';

export const BackdropView = styled(View)`
  position: absolute;
`;

export const BackdropList = styled(FlatList as new () => FlatList<Movie>).attrs(
  {
    contentContainerStyle: {
      width,
      height: BACKDROP_HEIGHT,
    },
  }
)``;

export const BackdropAnimatedView = styled(Animated.View)// <{
// translateX: number;
// }>
`
  height: ${height}px;
  position: absolute;
  overflow: hidden;
`;

export const BackdropImage = styled(Image)`
  width: ${width}px;
  height: ${BACKDROP_HEIGHT}px;
  position: absolute;
`;

export const BackdropGradient = styled(LinearGradient)`
  position: absolute;
  bottom: 0;
`;
