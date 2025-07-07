import { useColorScheme, View } from 'react-native';
import { HomeScreen } from './src/screens';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundColor = isDarkMode ? 'light-content' : 'dark-content'

  return (
    <View style={{ backgroundColor }}>
      <View>
        <HomeScreen />
      </View>
    </View>
  );
}

export default App;
