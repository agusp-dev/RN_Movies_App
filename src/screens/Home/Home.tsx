import { useEffect, useRef, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, useColorScheme, Image } from 'react-native';
import { getPopularMovies } from '../../utils'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';

export const HomeScreen = () => {

  const [topImages, setTopImages] = useState([]);

  console.log('topImages', topImages);

  const data = [...new Array(6).keys()];
  const width = Dimensions.get("window").width;

  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  useEffect(() => {
    getPopularMovies().then(response => {
      const movies = response?.map((item: any) => ({
        posterPath: `https://image.tmdb.org/t/p/w500${item.poster_path}`
      }))
      setTopImages(movies);
    })
  }, [])

  return (
   <View>
      <Carousel
        ref={ref}
        width={width}
        height={width * 1.5}
        data={topImages}
        autoPlay
        onProgressChange={progress}
        renderItem={({ index }) => (
          <View style={styles.imageContainer}>
            <Image
              style={styles.image} 
              source={{
                uri: topImages[index].posterPath
              }} 
            />
          </View>
        )}
      />
      <View style={styles.overlayContainer}>
        <View style={ styles.titleSection }>
          <Text style={ styles.textDesc }>My List</Text>
          <Text style={ styles.textDesc }>Discover</Text>
        </View>
        <View style={ styles.buttonSection }>
          <TouchableOpacity style={styles.buttonWishList}>
            <Text style={styles.textWishList}>+ WishList</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonDetail}
          >
            <Text style={styles.textDetails}>Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        backgroundColor: '#000000',
    },
    carouselContainer: {
        flex: 1,
        backgroundColor: '#000000',
    },
    carouselSection: {
        position: 'relative',
    },
    overlayContainer: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: 5,
    },
    titleSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    buttonSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    textDesc: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical: 20,
        color: 'white',
    },
    buttonDetail: {
        backgroundColor: '#F2C94C',
        paddingHorizontal: 50,
        paddingVertical: 20,
        borderRadius: 13,
        alignItems: 'center',
    },
    imageContainer: {
      flex: 1,
      borderWidth: 1,
      justifyContent: "center",
    },
    image: {
        width: '100%',
        height: '100%',
    },
    textWishList: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    buttonWishList: {
        backgroundColor: '#333333',
        paddingHorizontal: 50,
        paddingVertical: 20,
        borderRadius: 13,
        alignItems: 'center',
    },
    textDetails: {
        fontWeight: 'bold',
        fontSize: 18,
    },
});

