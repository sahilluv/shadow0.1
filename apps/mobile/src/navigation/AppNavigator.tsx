import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PlaceholderScreen from '../screens/PlaceholderScreen';

export type RootTabParamList = {
  Home: undefined;
  Discover: undefined;
  Create: undefined;
  Notifications: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

function HomeScreen() {
  return <PlaceholderScreen title="Home" />;
}

function DiscoverScreen() {
  return <PlaceholderScreen title="Discover" />;
}

function CreateScreen() {
  return <PlaceholderScreen title="Create" />;
}

function NotificationsScreen() {
  return <PlaceholderScreen title="Notifications" />;
}

function ProfileScreen() {
  return <PlaceholderScreen title="Profile" />;
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Discover" component={DiscoverScreen} />
        <Tab.Screen name="Create" component={CreateScreen} />
        <Tab.Screen name="Notifications" component={NotificationsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}