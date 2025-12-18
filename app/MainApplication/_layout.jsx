import { Tabs } from "expo-router";
import { Platform, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MainApplicationLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: styles.footer,
                tabBarActiveTintColor: "#151235",
                tabBarInactiveTintColor: "#94a3b8",
                headerShown: false,
            }}
        >
            {/* 1. ONGLET ACCUEIL */}
            <Tabs.Screen
                name="Main"
                options={{
                    title: "Accueil",
                    tabBarIcon: ({ focused, color }) => (
                        <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="Profiles/UserDetails"
                options={{
                    title: "Profil",
                    tabBarIcon: ({ focused, color }) => (
                        <Ionicons name={focused ? "person" : "person-outline"} size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen name="index" options={{ href: null }} />
            <Tabs.Screen name="Create" options={{ href: null }} />
            <Tabs.Screen name="MyProfiles" options={{ href: null }} />
            <Tabs.Screen name="Profile" options={{ href: null }} />


            <Tabs.Screen name="Profiles/Gilet_profile" options={{ href: null  ,  headerShown: false}} />
            <Tabs.Screen name="Profiles/Pantalon_profile" options={{ href: null }} />
            <Tabs.Screen name="Profiles/Veste_profile" options={{ href: null }} />
            <Tabs.Screen name="Profiles/Create/CreateGilet" options={{ href: null }} />
            <Tabs.Screen name="Profiles/Create/CreatePantalon" options={{ href: null }} />
            <Tabs.Screen name="Profiles/Create/CreateVeste" options={{ href: null }} />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    footer: {
        backgroundColor: "#ffffff",
        height: Platform.OS === 'ios' ? 90 : 70,
        paddingBottom: Platform.OS === 'ios' ? 30 : 12,
        elevation: 10,
        borderTopWidth: 1,
        borderTopColor: "#e2e8f0",
    }
});