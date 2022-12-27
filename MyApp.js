import {
  DarkTheme,
  NavigationContainer,
  useTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import AllExpensesScreen from "./src/screens/AllExpensesScreen";
import { useContext, useLayoutEffect } from "react";
import { ThemeContext } from "./store/themeContext";
import { StatusBar } from "expo-status-bar";
import { AppStyle } from "./src/constants/style";
import LogoBarImage from "./src/util/LogoBarImage";
import BottomTabElement from "./src/components/UI/BottomTabElement";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import StatisticsScreen from "./src/screens/StatisticsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyApp = () => {
  const { currentTheme, isDarkTheme } = useContext(ThemeContext);
  const insets = useSafeAreaInsets();

  const ExpensesScreen = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          // tabBarShowLabel: false,
          headerShadowVisible: false,
          headerStyle: {
            // backgroundColor: "black",
            // borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerTintColor: currentTheme.colors.header,
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
          // tabBarActiveBackgroundColor: "orange",
          tabBarActiveTintColor: isDarkTheme
            ? currentTheme.colors.primary
            : currentTheme.colors.primary,
          tabBarStyle: {
            backgroundColor: currentTheme.colors.background,

            height: 60 + insets.bottom,
            // backgroundColor: "gray",
            // paddingVertical: 10,
            // paddingVertical: 4,
            borderTopWidth: 4,
            borderTopColor: currentTheme.colors.background,
            elevation: 0,
          },
          tabBarShowLabel: false,
          tabBarLabelStyle: {
            fontSize: AppStyle.fontSize.normal,
            fontWeight: AppStyle.fontWeight.bold,
            marginBottom: 4,
          },
        }}
        labeled={false}
      >
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profil",
            tabBarIcon: ({ color }) => (
              <BottomTabElement
                active={color === currentTheme.colors.primary}
                color={color}
                iconName="user-alt"
                // bgColor={isDarkTheme ? "#0e2149" : "#d0eeff"}
                title="Profil"
              />
            ),
            headerTitle: "Profil",
          }}
        />
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarLabel: "Wydatki",
            tabBarIcon: ({ color }) => (
              <BottomTabElement
                active={color === currentTheme.colors.primary}
                color={color}
                iconName="wallet"
                // bgColor={isDarkTheme ? "#0e2149" : "#d0eeff"}
                title="Wydatki"
              />
            ),
            headerTitle: "",
            headerBackground: () => <LogoBarImage />,
            // headerTitle: "Monitor Wydatków",
          }}
        />
        <Tab.Screen
          name="StatisticsScreen"
          component={StatisticsScreen}
          options={{
            tabBarLabel: "Statystyki",
            tabBarIcon: ({ color }) => (
              <BottomTabElement
                active={color === currentTheme.colors.primary}
                color={color}
                iconName="chart-bar"
                // bgColor={isDarkTheme ? "#0e2149" : "#d0eeff"}
                title="Statystyki"
              />
            ),

            headerTitle: "Statystyki",
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer theme={currentTheme}>
      <StatusBar
        style={currentTheme.colors.text === "#FFFFFF" ? "light" : "dark"}
      />

      <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: {
            borderBottomWidth: 0,
          },
          // headerTintColor: MyTheme.colors.accent,
          headerTitleAlign: "center",
          headerTintColor: currentTheme.colors.header,
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
          tabBarActiveTintColor: isDarkTheme
            ? currentTheme.colors.primary
            : currentTheme.colors.background,
          tabBarStyle: {
            height: 60,
            paddingVertical: 10,
          },
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name="ExpensesScreen"
          component={ExpensesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AllExpensesScreen"
          component={AllExpensesScreen}
          options={{
            headerTitle: "Wszystkie wydatki",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyApp;
