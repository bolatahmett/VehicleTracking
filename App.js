import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import reducers from './redux/configureStore';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
var store = createStore(reducers);
export default function App() {
    var isLoadingComplete = useCachedResources();
    var colorScheme = useColorScheme();
    if (!isLoadingComplete) {
        return null;
    }
    else {
        return (React.createElement(Provider, { store: store },
            React.createElement(SafeAreaProvider, null,
                React.createElement(Navigation, { colorScheme: colorScheme }),
                React.createElement(StatusBar, null))));
    }
}
