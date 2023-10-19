import React from "react";
import { useColorScheme } from "react-native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { isReadyRef, navigationRef } from "react-navigation-helpers";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
/**
 * ? Local & Shared Imports
 */
import { SCREENS } from "@shared-constants";
import { DarkTheme, LightTheme, palette } from "@theme/themes";
// ? Screens
import SearchScreen from "@screens/search/SearchScreen";
import DetailScreen from "@screens/detail/DetailScreen";
import ProfileScreen from "@screens/profile/ProfileScreen";
import NotificationScreen from "@screens/notification/NotificationScreen";
import OnBoardScreen from "@screens/onBoard/OnBoardScreen";
import AuthScreen from "@screens/auth/AuthScreen";
import ExploreScreen from "@screens/explore/ExploreScreen";
import ExploreRoomDetailDetailScreen from "@screens/explore/detail/ExploreRoomDetailScreen";
import ErrorScreen from "@screens/error/ErrorScreen";
import BookingScreen from "@screens/booking/BookingScreen";
import LaunchScreen from "@screens/launch/LaunchScreen";
import StripScreen from "@screens/trip/TripScreen";
// ? If you want to use stack or tab or both
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Navigation = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";

  React.useEffect((): any => {
    return () => (isReadyRef.current = false);
  }, []);

  const renderTabIcon = (
    route: any,
    focused: boolean,
    color: string,
    size: number,
  ) => {
    let iconName = "home";
    switch (route.name) {
      case SCREENS.EXPLORE:
        iconName = focused ? "compass" : "compass-outline";
        break;
      case SCREENS.WISHLISTS:
        iconName = focused ? "search" : "search-outline";
        break;
      case SCREENS.INBOX:
        iconName = focused ? "notifications" : "notifications-outline";
        break;
      case SCREENS.PROFILE:
        iconName = focused ? "person" : "person-outline";
        break;
      case SCREENS.TRIP:
        iconName = focused ? "home" : "home-outline";
        break;
      default:
        iconName = focused ? "home" : "home-outline";
        break;
    }
    return (
      <Icon
        name={iconName}
        type={IconType.Ionicons}
        size={size}
        color={color}
      />
    );
  };

  const TabNavigation = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) =>
            renderTabIcon(route, focused, color, size),
          tabBarActiveTintColor: palette.primary,
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: isDarkMode ? palette.black : palette.white,
          },
        })}
      >
        <Tab.Screen
          name={SCREENS.EXPLORE}
          component={
            LaunchScreen
            // BookingScreen
            // () => <ErrorScreen statusCode={400} />
          }
        />
        <Tab.Screen name={SCREENS.TRIP} component={StripScreen} />
        <Tab.Screen name={SCREENS.WISHLISTS} component={SearchScreen} />
        <Tab.Screen name={SCREENS.INBOX} component={NotificationScreen} />
        <Tab.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
      theme={isDarkMode ? DarkTheme : LightTheme}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SCREENS.HOME} component={TabNavigation} />
        <Stack.Screen name={SCREENS.ON_BOARD} component={OnBoardScreen} />
        <Stack.Screen name={SCREENS.TRIP} component={StripScreen} />
        <Stack.Screen name={SCREENS.AUTH} component={AuthScreen} />
        <Stack.Screen name={SCREENS.EXPLORE} component={ExploreScreen} />
        <Stack.Screen
          name={SCREENS.ERROR}
          component={() => <ErrorScreen statusCode={500} />}
        />
        <Stack.Screen name={SCREENS.BOOKING} component={BookingScreen} />
        <Stack.Screen
          name={SCREENS.EXPLORE_DETAIL}
          component={ExploreRoomDetailDetailScreen}
        />
        <Stack.Screen name={SCREENS.PROFILE}>
          {(props) => <DetailScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
