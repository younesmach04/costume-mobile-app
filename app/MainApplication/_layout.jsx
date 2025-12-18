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
                tabBarShowLabel: true,
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

            {/* 2. ONGLET PROFILE */}
            <Tabs.Screen
                name="Profile"
                options={{
                    title: "Profil",
                    tabBarIcon: ({ focused, color }) => (
                        <Ionicons name={focused ? "person" : "person-outline"} size={24} color={color} />
                    ),
                }}
            />

            {/* --- TOUS LES AUTRES DOIVENT ÊTRE À href: null --- */}
            {/* Ajoutez ici EXACTEMENT le nom du 3ème fichier qui s'affiche */}
            <Tabs.Screen name="index" options={{ href: null }} />
            <Tabs.Screen name="Create" options={{ href: null }} />
            <Tabs.Screen name="MyProfiles" options={{ href: null }} />
            <Tabs.Screen name="Profiles/Gilet_profile" options={{ href: null }} />
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
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#ffffff",
        borderTopWidth: 1,
        borderTopColor: "#e2e8f0",
        height: Platform.OS === 'ios' ? 90 : 70,
        paddingBottom: Platform.OS === 'ios' ? 30 : 12,
        paddingTop: 10,
        elevation: 10, // Ombre Android
        shadowColor: '#000', // Ombre iOS
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    }
});