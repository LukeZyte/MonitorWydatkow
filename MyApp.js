import {
  DarkTheme,
  NavigationContainer,
  useTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import AllExpensesScreen from "./src/screens/AllExpensesScreen";
import { useContext } from "react";
import { ThemeContext } from "./store/themeContext";
import { StatusBar } from "expo-status-bar";
import { AppStyle } from "./src/constants/style";
import LogoBarImage from "./src/util/LogoBarImage";
import { View } from "react-native";
import TextUI from "./src/components/UI/TextUI";
import BottomTabElement from "./src/components/UI/BottomTabElement";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyApp = () => {
  const { currentTheme, isDarkTheme } = useContext(ThemeContext);

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
            height: 60,
            // backgroundColor: "gray",
            // paddingVertical: 10,
            // paddingVertical: 4,
            borderTopWidth: 0,
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
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarLabel: "Wydatki",
            tabBarIcon: ({ color }) => (
              <BottomTabElement
                color={color}
                iconName="wallet"
                bgColor={isDarkTheme ? "#0e2149" : "#d0eeff"}
                title="Wydatki"
              />
            ),
            headerTitle: "",
            headerBackground: () => <LogoBarImage />,
            // headerTitle: "Monitor Wydatków",
          }}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profil",
            tabBarIcon: ({ color }) => (
              <BottomTabElement
                color={color}
                iconName="user-alt"
                bgColor={isDarkTheme ? "#0e2149" : "#d0eeff"}
                title="Profil"
              />
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
