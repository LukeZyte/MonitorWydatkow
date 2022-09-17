import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ManageExpenseScreen from "./src/screens/ManageExpenseScreen";
import { useContext, useState } from "react";
import { Alert } from "react-native";
import { ThemeContext } from "./store/themeContext";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyApp = () => {
  const { currentTheme, isDarkTheme } = useContext(ThemeContext);

  const ExpensesScreen = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            // backgroundColor: "black",
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 26,
            fontWeight: "bold",
          },
          tabBarActiveTintColor: isDarkTheme
            ? currentTheme.colors.primary
            : currentTheme.colors.background,
        }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarLabel: "Wydatki",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="wallet" size={24} color={color} />
            ),
            headerTitle: "Moje wydatki",
          }}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profil",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="user-alt" size={24} color={color} />
            ),
            headerTitle: "Profil",
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
          headerStyle: {
            // backgroundColor: "black",
          },
          // headerTintColor: MyTheme.colors.accent,
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="ExpensesScreen"
          component={ExpensesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageExpenseScreen"
          component={ManageExpenseScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyApp;
