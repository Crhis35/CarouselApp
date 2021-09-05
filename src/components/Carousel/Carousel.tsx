import React, { useRef, createRef } from 'react';
import { Platform, Animated, Text, View, FlatList } from 'react-native';

import { EMPTY_ITEM_SIZE, ITEM_SIZE } from '../../infraestructure/sizes';
import { Movie } from '../../infraestructure/types';
import { saveIndex } from '../../infraestructure/utils';
import {
  CarouselAnimatedView,
  CarouselContainer,
  CarouselImage,
  CarouselList,
} from './Carousel.styles';

interface CarouselProps {
  movies: Movie[];
  scrollX: Animated.Value;
  index: number;
}

const Carousel = ({ movies, scrollX, index }: CarouselProps) => {
  const flatList = createRef<FlatList<Movie> | null>();

  const onViewRef = useRef(async ({ changed }) => {
    const index = changed[0].index;
    if (index) {
      await saveIndex(index);
    } else {
      await saveIndex(1);
    }
  });

  return (
    <CarouselList
      ref={(ref) => (flatList.current = ref)}
      initialScrollIndex={index}
      showsHorizontalScrollIndicator={false}
      data={movies}
      onScrollToIndexFailed={(error) => {
        const offset = error.averageItemLength * error.index;
        flatList.current?.scrollToOffset({ offset, animated: false });
      }}
      keyExtractor={(item) => item.key}
      horizontal
      bounces={false}
      decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
      renderToHardwareTextureAndroid
      snapToInterval={ITEM_SIZE}
      snapToAlignment="start"
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
      )}
      onViewableItemsChanged={onViewRef.current}
      scrollEventThrottle={16}
      renderItem={({ item, index }) => {
        if (!item.title) {
          return <View style={{ width: EMPTY_ITEM_SIZE }} />;
        }
        const inputRange = [
          (index - 2) * ITEM_SIZE,
          (index - 1) * ITEM_SIZE,
          index * ITEM_SIZE,
        ];

        const translateY = scrollX.interpolate({
          inputRange,
          outputRange: [100, 50, 100],
          extrapolate: 'clamp',
        });

        return (
          <CarouselContainer>
            <CarouselAnimatedView
              style={{
                transform: [{ translateY }],
              }}
            >
              <CarouselImage source={{ uri: item.source }} />
              <Text style={{ fontSize: 24 }} numberOfLines={1}>
                {item.title}
              </Text>
            </CarouselAnimatedView>
          </CarouselContainer>
        );
      }}
    />
  );
};

export default Carousel;
