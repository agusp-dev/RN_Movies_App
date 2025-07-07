import { useEffect, useRef, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image, Modal, Button } from 'react-native';
import { getPopularMovies } from '../../utils'
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const HomeScreen = () => {

  const [topImages, setTopImages] = useState<any>([]);
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);

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

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const openDetailsModal = () => {
    setShowDetailsModal(true);
  }

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
  }

  return (
    <View>
      <View style={styles.carouselSection}>
        <Carousel
          ref={ref}
          width={width}
          height={width * 1.5}
          data={topImages}
          autoPlay
          autoPlayInterval={5000}
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
              onPress={openDetailsModal}
            >
              <Text style={styles.textDetails}>Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Pagination.Basic
        progress={progress}
        data={topImages}
        dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      />
      <Modal
        visible={showDetailsModal}
        transparent
        animationType="slide"
        onRequestClose={closeDetailsModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* <Text style={styles.text}>Mostrando modal</Text> */}
            <Button title="Cerrar" onPress={closeDetailsModal} />
          </View>
        </View>
      </Modal>
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
    modalOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
      width: '100%',
      height: height / 1.4,
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      alignItems: 'center'
    }
});

