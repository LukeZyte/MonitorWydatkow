import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";

const Stack = createNativeStackNavigator();

const MyApp = () => {
  const MyTheme = {
    colors: {
      primary: "#3F51B5",
      accent: "#03A9F4",
      background: "#000000",
      card: "#212121",
      text: "#FFFFFF",
      border: "#303F9F",
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            // backgroundColor: "black",
          },
          headerTintColor: MyTheme.colors.accent,
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyApp;
