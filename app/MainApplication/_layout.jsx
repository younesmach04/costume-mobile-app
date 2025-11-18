import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { colors } from "../../Constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function MainApplicationLayout() {
    const colorScheme = useColorScheme();
    const theme = colors[colorScheme];

    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#d6e5f4",
                    borderTopWidth: 0,
                    borderRadius: 20,
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    height: 80,
                    elevation: 20,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.12,
                    shadowRadius: 20,
                    paddingBottom: 10,
                    paddingLeft: 40,
                    paddingRight: 40,
                    marginHorizontal: 50,
                },
                tabBarActiveTintColor: "#151235",
                tabBarInactiveTintColor: theme.inactiveColor || '#666666',
                headerShown: false,
                animation: "fade"
            }}
        >
            <Tabs.Screen
                name="Main"
                options={{
                    title: "Main",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? "grid" : "grid-outline"}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="Create"
                options={{
                    title: "Create",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name="add"
                            size={32}
                            color="#ffffff"
                        />
                    ),
                    tabBarItemStyle: {
                        width: 70,
                        height: 70,
                        borderRadius: 35,
                        backgroundColor: "#335333",
                        marginTop: -25,
                        marginHorizontal: 10,
                        shadowColor: '#2c952c',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: 8,
                        borderWidth: 4,
                        borderColor: "#d6e5f4",
                    },
                }}
            />
            <Tabs.Screen
                name="Profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? "person" : "person-outline"}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            {/* Manually hidden screens */}
            <Tabs.Screen
                name="MyProfiles"
                options={{
                    tabBarItemStyle: { display: "none" }
                }}
            />
            <Tabs.Screen
                name="Profiles/Gilet_profile"
                options={{
                    tabBarItemStyle: { display: "none" }
                }}
            />
            <Tabs.Screen
                name="Profiles/Pantalon_profile"
                options={{
                    tabBarItemStyle: { display: "none" }
                }}
            />
            <Tabs.Screen
                name="Profiles/Veste_profile"
                options={{
                    tabBarItemStyle: { display: "none" }
                }}
            />
            <Tabs.Screen
                name="Profiles/Create/CreateGilet"
                options={{
                    tabBarItemStyle: { display: "none" }
                }}
            />
            <Tabs.Screen
                name="Profiles/Create/CreatePantalon"
                options={{
                    tabBarItemStyle: { display: "none" }
                }}
            />
            <Tabs.Screen
                name="Profiles/Create/CreateVeste"
                options={{
                    tabBarItemStyle: { display: "none" }
                }}
            />
        </Tabs>
    );
}