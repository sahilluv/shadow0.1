import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type NotificationKind = 'like' | 'comment' | 'connection' | 'community';

type NotificationItem = {
  id: string;
  initials: string;
  avatarColor: string;
  name: string;
  action: string;
  detail: string;
  time: string;
  kind: NotificationKind;
  unread: boolean;
};

const notifications: NotificationItem[] = [
  {
    id: '1',
    initials: 'AK',
    avatarColor: '#A8C6B5',
    name: 'Aisha Khan',
    action: 'liked your post',
    detail: 'Small win: our studio project made it through critique.',
    time: '8 min ago',
    kind: 'like',
    unread: true,
  },
  {
    id: '2',
    initials: 'LC',
    avatarColor: '#AFC4E3',
    name: 'Leo Chen',
    action: 'commented on your post',
    detail: 'The quiet floor is finally open again.',
    time: '24 min ago',
    kind: 'comment',
    unread: true,
  },
  {
    id: '3',
    initials: 'EP',
    avatarColor: '#D8B6D8',
    name: 'Elena Park',
    action: 'wants to connect',
    detail: 'Visual Arts  •  Northbridge University',
    time: '1 hr ago',
    kind: 'connection',
    unread: true,
  },
  {
    id: '4',
    initials: 'LN',
    avatarColor: '#1B2A41',
    name: 'Late Night Library',
    action: 'shared a new update',
    detail: 'Quiet study rooms are open until midnight this week.',
    time: '3 hrs ago',
    kind: 'community',
    unread: false,
  },
  {
    id: '5',
    initials: 'SR',
    avatarColor: '#F5B7A4',
    name: 'Sofia Reyes',
    action: 'liked your comment',
    detail: 'Film Club  •  Eastfield University',
    time: 'Yesterday',
    kind: 'like',
    unread: false,
  },
];

const kindLabels: Record<NotificationKind, string> = {
  like: 'LIKE',
  comment: 'COMMENT',
  connection: 'CONNECTION',
  community: 'COMMUNITY',
};

function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <View style={[styles.avatar, { backgroundColor: color }]}>
      <Text style={styles.avatarText}>{initials}</Text>
    </View>
  );
}

function NotificationCard({ notification }: { notification: NotificationItem }) {
  return (
    <Pressable
      accessibilityLabel={`${notification.name} ${notification.action}`}
      accessibilityRole="button"
      style={[styles.notificationCard, notification.unread && styles.unreadCard]}
    >
      <Avatar initials={notification.initials} color={notification.avatarColor} />
      <View style={styles.notificationBody}>
        <Text style={styles.notificationCopy}>
          <Text style={styles.notificationName}>{notification.name}</Text>{' '}
          {notification.action}
        </Text>
        <Text style={styles.notificationDetail} numberOfLines={2}>{notification.detail}</Text>
        <View style={styles.notificationMeta}>
          <Text style={styles.notificationTime}>{notification.time}</Text>
          <Text style={styles.kindLabel}>{kindLabels[notification.kind]}</Text>
        </View>
      </View>
      {notification.unread && <View style={styles.unreadDot} />}
    </Pressable>
  );
}

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.wordmark}>SHADOW</Text>
            <Text style={styles.subtitle}>Stay in the loop.</Text>
          </View>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>ACTIVITY</Text>
          </View>
        </View>

        <View style={styles.titleRow}>
          <View>
            <Text style={styles.pageTitle}>Notifications</Text>
            <Text style={styles.pageIntro}>The latest from your campus circle.</Text>
          </View>
          <View style={styles.unreadSummary}>
            <Text style={styles.unreadNumber}>3</Text>
            <Text style={styles.unreadLabel}>new</Text>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryMark}>
            <View style={styles.summaryDot} />
          </View>
          <View style={styles.summaryCopy}>
            <Text style={styles.summaryTitle}>You have 3 new updates</Text>
            <Text style={styles.summaryText}>Three new updates are waiting in your activity.</Text>
          </View>
          <Text style={styles.summaryArrow}>{'->'}</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent activity</Text>
          <Text style={styles.sectionMeta}>Static preview</Text>
        </View>

        {notifications.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
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
    paddingBottom: 30,
    paddingHorizontal: 18,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 22,
    paddingTop: 14,
  },
  wordmark: {
    color: '#1B2A41',
    fontSize: 25,
    fontWeight: '800',
    letterSpacing: 2,
  },
  subtitle: {
    color: '#728096',
    fontSize: 12,
    marginTop: 3,
  },
  headerBadge: {
    backgroundColor: '#EAF0EC',
    borderRadius: 6,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  headerBadgeText: {
    color: '#537365',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  titleRow: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pageTitle: {
    color: '#1B2A41',
    fontSize: 26,
    fontWeight: '700',
  },
  pageIntro: {
    color: '#728096',
    fontSize: 14,
    marginTop: 7,
  },
  unreadSummary: {
    alignItems: 'center',
    backgroundColor: '#F8DDD3',
    borderRadius: 14,
    height: 56,
    justifyContent: 'center',
    marginLeft: 10,
    width: 56,
  },
  unreadNumber: {
    color: '#B94F3E',
    fontSize: 20,
    fontWeight: '800',
  },
  unreadLabel: {
    color: '#B94F3E',
    fontSize: 10,
    fontWeight: '700',
    marginTop: -2,
  },
  summaryCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E7EC',
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: 20,
    minHeight: 78,
    paddingHorizontal: 14,
  },
  summaryMark: {
    alignItems: 'center',
    backgroundColor: '#EAF0EC',
    borderRadius: 11,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  summaryDot: {
    backgroundColor: '#6D8C7C',
    borderRadius: 7,
    height: 14,
    width: 14,
  },
  summaryCopy: {
    flex: 1,
    marginLeft: 12,
  },
  summaryTitle: {
    color: '#1B2A41',
    fontSize: 13,
    fontWeight: '700',
  },
  summaryText: {
    color: '#8792A3',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
  },
  summaryArrow: {
    color: '#E26D5A',
    fontSize: 15,
    fontWeight: '700',
    paddingLeft: 8,
  },
  sectionHeader: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 28,
  },
  sectionTitle: {
    color: '#1B2A41',
    fontSize: 19,
    fontWeight: '700',
  },
  sectionMeta: {
    color: '#8792A3',
    fontSize: 11,
  },
  notificationCard: {
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E7EC',
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 10,
    minHeight: 94,
    padding: 13,
  },
  unreadCard: {
    backgroundColor: '#FFFCFA',
    borderColor: '#F0D9D1',
  },
  avatar: {
    alignItems: 'center',
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  notificationBody: {
    flex: 1,
    marginLeft: 11,
    paddingRight: 8,
  },
  notificationCopy: {
    color: '#607082',
    fontSize: 13,
    lineHeight: 19,
  },
  notificationName: {
    color: '#1B2A41',
    fontWeight: '700',
  },
  notificationDetail: {
    color: '#8792A3',
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
  },
  notificationMeta: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8,
  },
  notificationTime: {
    color: '#A2AAB5',
    fontSize: 10,
  },
  kindLabel: {
    color: '#6D8C7C',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.7,
    marginLeft: 10,
  },
  unreadDot: {
    backgroundColor: '#E26D5A',
    borderRadius: 4,
    height: 8,
    marginTop: 5,
    width: 8,
  },
});
