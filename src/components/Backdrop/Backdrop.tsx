import React, { useRef } from 'react';
import { Animated, FlatList } from 'react-native';
import { ITEM_SIZE, width } from '../../infraestructure/sizes';

import { Movie } from '../../infraestructure/types';
import {
  BackdropAnimatedView,
  BackdropGradient,
  BackdropImage,
  BackdropList,
  BackdropView,
} from './Backdrop.styles';

interface Props {
  movies: Movie[];
  scrollX: Animated.Value;
  index: number;
}

const Backdrop = ({ movies, scrollX, index }: Props) => {
  const flatList = useRef<FlatList>(null);

  return (
    <BackdropView>
      <BackdropList
        ref={(ref) => (flatList.current = ref)}
        data={movies.reverse()}
        initialScrollIndex={index}
        keyExtractor={(item) => item.key + '-backdrop'}
        removeClippedSubviews={false}
        onScrollToIndexFailed={(error) => {
          const offset = error.averageItemLength * error.index;
          flatList.current?.scrollToOffset({ offset, animated: false });
        }}
        renderItem={({ item, index }) => {
          if (!item.source) {
            return null;
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, width],
            extrapolate: 'clamp',
          });
          return (
            <BackdropAnimatedView
              removeClippedSubviews={false}
              style={{ width: translateX }}
            >
              <BackdropImage source={{ uri: item.source }} />
            </BackdropAnimatedView>
          );
        }}
      />
      <BackdropGradient colors={['rgba(0, 0, 0, 0)', 'white']} />
    </BackdropView>
  );
};
export default Backdrop;
