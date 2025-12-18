import { Image, TouchableOpacity, StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import React from 'react';
import Spacer from "../../components/Spacer";
import Themedtext from "../../components/Themedtext";
import { Link } from "expo-router";

const { width } = Dimensions.get('window');

const Main = () => {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header moderne */}
            <View style={styles.header}>
                {/* Navigation icons */}
                <View style={styles.topNav}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Image
                            source={require('../../assets/cartsuit.png')}
                            style={styles.navIcon}
                        />
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>3</Text>
                        </View>
                    </TouchableOpacity>

                    <Link href="/MainApplication/MyProfiles" asChild>
                        <TouchableOpacity style={styles.iconButton}>
                            <Image
                                source={require('../../assets/addprofile.png')}
                                style={styles.navIcon}
                            />
                        </TouchableOpacity>
                    </Link>
                </View>

                {/* Welcome section */}
                <View style={styles.welcomeSection}>
                    <Text style={styles.greeting}>Bienvenue</Text>
                    <Text style={styles.tagline}>Créez votre costume parfait</Text>
                </View>

                {/* Quick stats cards */}
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>12</Text>
                        <Text style={styles.statLabel}>Profils</Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>5</Text>
                        <Text style={styles.statLabel}>Commandes</Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>3</Text>
                        <Text style={styles.statLabel}>Favoris</Text>
                    </View>
                </View>
            </View>

            {/* Categories section */}
            <View style={styles.categoriesSection}>
                <View style={styles.sectionHeader}>
                    <Themedtext type='title' style={styles.sectionTitle}>
                        Catégories
                    </Themedtext>
                    <TouchableOpacity>
                        <Text style={styles.seeAllText}>Voir tout →</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.categoriesGrid}>
                    <Link href="/MainApplication/Profiles/Veste_profile" asChild>
                        <TouchableOpacity style={styles.categoryCard}>
                            <View style={styles.categoryImageContainer}>
                                <Text style={styles.categoryEmoji}>👔</Text>
                            </View>
                            <Text style={styles.categoryTitle}>Vestes</Text>
                            <Text style={styles.categoryCount}>Voir tout</Text>
                        </TouchableOpacity>
                    </Link>

                    <Link href="/MainApplication/Profiles/Pantalon_profile" asChild>
                        <TouchableOpacity style={styles.categoryCard}>
                            <View style={styles.categoryImageContainer}>
                                <Text style={styles.categoryEmoji}>👖</Text>
                            </View>
                            <Text style={styles.categoryTitle}>Pantalons</Text>
                            <Text style={styles.categoryCount}>Voir tout</Text>
                        </TouchableOpacity>
                    </Link>

                    <Link href="/MainApplication/Profiles/Gilet_profile" asChild>
                        <TouchableOpacity style={styles.categoryCard}>
                            <View style={styles.categoryImageContainer}>
                                <Text style={styles.categoryEmoji}>🦺</Text>
                            </View>
                            <Text style={styles.categoryTitle}>Gilets</Text>
                            <Text style={styles.categoryCount}>Voir tout</Text>
                        </TouchableOpacity>
                    </Link>

                    <Link href="/MainApplication/MyProfiles" asChild>
                        <TouchableOpacity style={styles.categoryCard}>
                            <View style={styles.categoryImageContainer}>
                                <Text style={styles.categoryEmoji}>👔</Text>
                            </View>
                            <Text style={styles.categoryTitle}>Tous les Profils</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>

            {/* Quick actions */}
            <View style={styles.quickActionsSection}>
                <Text style={styles.quickActionsTitle}>Actions rapides</Text>

                <View style={styles.actionsGrid}>
                    <Link href="/MainApplication/Profiles/Create/CreateVeste" asChild>
                        <TouchableOpacity style={[styles.actionCard, styles.purpleCard]}>
                            <Text style={styles.actionIcon}>👔</Text>
                            <Text style={styles.actionText}>Nouvelle Veste</Text>
                        </TouchableOpacity>
                    </Link>

                    <Link href="/MainApplication/Profiles/Create/CreatePantalon" asChild>
                        <TouchableOpacity style={[styles.actionCard, styles.pinkCard]}>
                            <Text style={styles.actionIcon}>👖</Text>
                            <Text style={styles.actionText}>Nouveau Pantalon</Text>
                        </TouchableOpacity>
                    </Link>

                    <Link href="/MainApplication/Profiles/Create/CreateGilet" asChild>
                        <TouchableOpacity style={[styles.actionCard, styles.blueCard]}>
                            <Text style={styles.actionIcon}>🦺</Text>
                            <Text style={styles.actionText}>Nouveau Gilet</Text>
                        </TouchableOpacity>
                    </Link>

                    <Link href="../../../MainApplication/Profiles/MyProfiles" asChild>
                        <TouchableOpacity style={[styles.actionCard, styles.greenCard]}>
                            <Text style={styles.actionIcon}>📋</Text>
                            <Text style={styles.actionText}>Mes Profils</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
            <View style={styles.recentSection}>
                <Text style={styles.recentTitle}>Activité récente</Text>

                <View style={styles.activityCard}>
                    <View style={styles.activityIconContainer}>
                        <Text style={styles.activityIcon}>✅</Text>
                    </View>
                    <View style={styles.activityContent}>
                        <Text style={styles.activityTitle}>Profil créé</Text>
                        <Text style={styles.activitySubtitle}>Costume classique noir</Text>
                    </View>
                    <Text style={styles.activityTime}>2h</Text>
                </View>

                <View style={styles.activityCard}>
                    <View style={styles.activityIconContainer}>
                        <Text style={styles.activityIcon}>🛒</Text>
                    </View>
                    <View style={styles.activityContent}>
                        <Text style={styles.activityTitle}>Commande passée</Text>
                        <Text style={styles.activitySubtitle}>Veste sur mesure</Text>
                    </View>
                    <Text style={styles.activityTime}>1j</Text>
                </View>
            </View>

            <Spacer height={30} />
        </ScrollView>
    );
};

export default Main;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fa',
    },
    header: {
        backgroundColor: '#1e3a8a',
        paddingTop: 60,
        paddingBottom: 30,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 8,
        shadowColor: '#1e3a8a',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    topNav: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 15,
        marginBottom: 30,
    },
    iconButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    navIcon: {
        width: 24,
        height: 24,
        tintColor: '#fff',
    },
    badge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: '#ef4444',
        width: 22,
        height: 22,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#1e3a8a',
    },
    badgeText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: 'bold',
    },
    welcomeSection: {
        marginBottom: 25,
    },
    greeting: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
        letterSpacing: 0.5,
    },
    tagline: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.85)',
        fontWeight: '400',
    },
    statsContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    statCard: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.25)',
    },
    statNumber: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.85)',
        fontWeight: '500',
    },
    categoriesSection: {
        marginTop: 25,
        paddingHorizontal: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    seeAllText: {
        fontSize: 14,
        color: '#3b82f6',
        fontWeight: '600',
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
    },
    categoryCard: {
        width: (width - 55) / 2,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    categoryImageContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f0f9ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    categoryEmoji: {
        fontSize: 40,
    },
    categoryTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 4,
    },
    categoryCount: {
        fontSize: 13,
        color: '#6b7280',
    },
    quickActionsSection: {
        marginTop: 30,
        paddingHorizontal: 20,
    },
    quickActionsTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 15,
    },
    actionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
    },
    actionCard: {
        width: (width - 55) / 2,
        height: 130,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    purpleCard: {
        backgroundColor: '#8b5cf6',
    },
    pinkCard: {
        backgroundColor: '#ec4899',
    },
    blueCard: {
        backgroundColor: '#3b82f6',
    },
    greenCard: {
        backgroundColor: '#10b981',
    },
    actionIcon: {
        fontSize: 36,
        marginBottom: 10,
    },
    actionText: {
        color: 'black',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
    },
    recentSection: {
        marginTop: 30,
        paddingHorizontal: 20,
    },
    recentTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 15,
    },
    activityCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    activityIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f0f9ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    activityIcon: {
        fontSize: 24,
    },
    activityContent: {
        flex: 1,
    },
    activityTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 3,
    },
    activitySubtitle: {
        fontSize: 13,
        color: '#6b7280',
    },
    activityTime: {
        fontSize: 13,
        color: '#9ca3af',
        fontWeight: '500',
    },
});