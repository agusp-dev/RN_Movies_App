import { SafeAreaView, ScrollView, StatusBar, useColorScheme, View } from 'react-native';
import { HomeScreen } from './src/screens';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundColor = isDarkMode ? 'light-content' : 'dark-content'

  return (
    <SafeAreaView style={{ backgroundColor }}>
      <StatusBar barStyle={ backgroundColor } />
      <ScrollView contentInsetAdjustmentBehavior='automatic' />
      <View>
        <HomeScreen />
      </View>
    </SafeAreaView>
  );
}

export default App;
