import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { getPopularMovies } from '../../utils'

export const HomeScreen = () => {

  useEffect(() => {
    getPopularMovies().then(data => {
      console.log('data', data);
    })
  }, [])

  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  )
}
