import { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type ProfilePost = {
  id: string;
  title: string;
  snippet: string;
  time: string;
  likes: number;
  comments: number;
};

const profilePosts: ProfilePost[] = [
  {
    id: '1',
    title: 'Campus meetup recap',
    snippet:
      'Our study group locked in the final concept board and wrapped up the presentation with a cleaner timeline.',
    time: '2h ago',
    likes: 38,
    comments: 11,
  },
  {
    id: '2',
    title: 'Data sprint update',
    snippet:
      'Spent the evening validating the dashboard flow and narrowing down the strongest user stories for the next demo.',
    time: 'Yesterday',
    likes: 52,
    comments: 16,
  },
  {
    id: '3',
    title: 'Weekend learning notes',
    snippet:
      'Quick summary from today’s workshop: bookmark the core formulas, then stress-test them against a real dataset.',
    time: '2 days ago',
    likes: 27,
    comments: 9,
  },
];

export default function ProfileScreen() {
  const [activeAction, setActiveAction] = useState<'edit' | 'share'>('edit');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <Pressable
            style={styles.menuButton}
            accessibilityRole="button"
            accessibilityLabel="Open profile settings"
          >
            <Text style={styles.menuIcon}>⋮</Text>
          </Pressable>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.identityRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>AM</Text>
            </View>

            <View style={styles.identityBlock}>
              <Text style={styles.name}>Arjun Mehta</Text>
              <Text style={styles.school}>Goa University</Text>
              <Text style={styles.meta}>Data Science • 3rd Year</Text>
            </View>
          </View>

          <Text style={styles.bio}>Building ideas, learning every day.</Text>
          <Text style={styles.location}>📍 Panaji, Goa</Text>

          <View style={styles.actionRow}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Edit profile"
              style={[
                styles.actionButton,
                activeAction === 'edit' && styles.actionButtonActive,
              ]}
              onPress={() => setActiveAction('edit')}
            >
              <Text
                style={[
                  styles.actionText,
                  activeAction === 'edit' && styles.actionTextActive,
                ]}
              >
                Edit Profile
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Share profile"
              style={[
                styles.actionButton,
                styles.secondaryAction,
                activeAction === 'share' && styles.actionButtonActive,
              ]}
              onPress={() => setActiveAction('share')}
            >
              <Text
                style={[
                  styles.actionText,
                  styles.secondaryActionText,
                  activeAction === 'share' && styles.actionTextActive,
                ]}
              >
                Share Profile
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>248</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>186</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent posts</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="View all posts"
            style={styles.linkButton}
          >
            <Text style={styles.linkText}>View all posts</Text>
          </Pressable>
        </View>

        {profilePosts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postTime}>{post.time}</Text>
            </View>

            <Text style={styles.postSnippet}>{post.snippet}</Text>

            <View style={styles.postMeta}>
              <Text style={styles.metaText}>♡ {post.likes}</Text>
              <Text style={styles.metaText}>○ {post.comments}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#F7F8F6',
    flex: 1,
  },
  content: {
    paddingBottom: 28,
    paddingHorizontal: 18,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 18,
    paddingTop: 14,
  },
  headerTitle: {
    color: '#1B2A41',
    fontSize: 28,
    fontWeight: '800',
  },
  menuButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E7EC',
    borderRadius: 16,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  menuIcon: {
    color: '#1B2A41',
    fontSize: 24,
    fontWeight: '700',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E7EC',
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 14,
    padding: 18,
  },
  identityRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: '#D6C2E8',
    borderRadius: 40,
    height: 74,
    justifyContent: 'center',
    width: 74,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },
  identityBlock: {
    flex: 1,
    marginLeft: 14,
  },
  name: {
    color: '#1B2A41',
    fontSize: 24,
    fontWeight: '800',
  },
  school: {
    color: '#5E6C7B',
    fontSize: 14,
    marginTop: 4,
  },
  meta: {
    color: '#6D7B8D',
    fontSize: 13,
    marginTop: 3,
  },
  bio: {
    color: '#334155',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 18,
  },
  location: {
    color: '#5D6877',
    fontSize: 13,
    marginTop: 8,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: '#EEF2F7',
    borderColor: '#DDE5EE',
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    minHeight: 42,
  },
  secondaryAction: {
    backgroundColor: '#FFFFFF',
  },
  actionButtonActive: {
    backgroundColor: '#1B2A41',
    borderColor: '#1B2A41',
  },
  actionText: {
    color: '#1B2A41',
    fontSize: 13,
    fontWeight: '700',
  },
  secondaryActionText: {
    color: '#334155',
  },
  actionTextActive: {
    color: '#FFFFFF',
  },
  statsCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E7EC',
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    color: '#1B2A41',
    fontSize: 20,
    fontWeight: '800',
  },
  statLabel: {
    color: '#7A8799',
    fontSize: 12,
    marginTop: 4,
  },
  statDivider: {
    backgroundColor: '#EEF1F4',
    height: 32,
    width: 1,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 4,
  },
  sectionTitle: {
    color: '#1B2A41',
    fontSize: 20,
    fontWeight: '700',
  },
  linkButton: {
    justifyContent: 'center',
    minHeight: 28,
  },
  linkText: {
    color: '#E26D5A',
    fontSize: 12,
    fontWeight: '700',
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E7EC',
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
    padding: 15,
  },
  postHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postTitle: {
    color: '#1B2A41',
    fontSize: 15,
    fontWeight: '700',
  },
  postTime: {
    color: '#8B97A5',
    fontSize: 11,
  },
  postSnippet: {
    color: '#475467',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
  },
  postMeta: {
    alignItems: 'center',
    borderTopColor: '#EEF1F3',
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: 18,
    marginTop: 14,
    paddingTop: 12,
  },
  metaText: {
    color: '#68778B',
    fontSize: 12,
    fontWeight: '600',
  },
});
