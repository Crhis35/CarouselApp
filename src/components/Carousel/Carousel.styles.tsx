import { Animated, Image, View } from 'react-native';
import styled from 'styled-components/native';
import { ITEM_SIZE, SPACING } from '../../infraestructure/sizes';

import { Movie } from '../../infraestructure/types';

export const CarouselList = styled(
  Animated.FlatList as new () => Animated.FlatList<Movie>
).attrs({
  contentContainerStyle: { alignItems: 'center' },
})``;

export const CarouselImage = styled(Image)`
  width: 100%;
  height: ${ITEM_SIZE * 1.2}px;
  border-radius: 24px;
  margin: 0px;
  margin-bottom: 10px;
`;

export const CarouselContainer = styled(View)`
  width: ${ITEM_SIZE}px;
`;
export const CarouselAnimatedView = styled(Animated.View)`
  margin-left: ${SPACING}px;
  margin-right: ${SPACING}px;
  padding: ${SPACING * 2}px;
  align-items: center;
  background-color: white;
  border-radius: 34px;
`;
