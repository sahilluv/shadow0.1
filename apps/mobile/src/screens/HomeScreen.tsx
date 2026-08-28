import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type FeedPost = {
  id: string;
  initials: string;
  avatarColor: string;
  name: string;
  context: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
};

const posts: FeedPost[] = [
  {
    id: '1',
    initials: 'JM',
    avatarColor: '#F5B7A4',
    name: 'Jordan Miller',
    context: 'Computer Science  •  Northbridge University',
    time: '18 min ago',
    content:
      'The quiet floor is finally open again. If anyone wants to pair on algorithms later, I will be at the window seats.',
    likes: 24,
    comments: 8,
  },
  {
    id: '2',
    initials: 'AK',
    avatarColor: '#A8C6B5',
    name: 'Aisha Khan',
    context: 'Design Society  •  Westlake College',
    time: '42 min ago',
    content:
      'Small win: our studio project made it through critique. Still processing the feedback, but feeling very grateful for this team.',
    likes: 41,
    comments: 12,
  },
  {
    id: '3',
    initials: 'LC',
    avatarColor: '#AFC4E3',
    name: 'Leo Chen',
    context: 'Environmental Science  •  Northbridge University',
    time: '1 hr ago',
    content:
      'Free coffee at the sustainability fair until 3pm. The upcycled tote workshop is worth stopping by between classes.',
    likes: 17,
    comments: 5,
  },
  {
    id: '4',
    initials: 'SR',
    avatarColor: '#D8B6D8',
    name: 'Sofia Reyes',
    context: 'Film Club  •  Eastfield University',
    time: '2 hrs ago',
    content:
      'Looking for one more person to help with sound on our short film this weekend. No experience needed, just a good ear.',
    likes: 29,
    comments: 14,
  },
];

function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <View style={[styles.avatar, { backgroundColor: color }]}>
      <Text style={styles.avatarText}>{initials}</Text>
    </View>
  );
}

function FeedPostCard({ post }: { post: FeedPost }) {
  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Avatar initials={post.initials} color={post.avatarColor} />
        <View style={styles.postIdentity}>
          <Text style={styles.postName}>{post.name}</Text>
          <Text style={styles.postContext}>{post.context}</Text>
        </View>
        <Text style={styles.postTime}>{post.time}</Text>
      </View>

      <Text style={styles.postContent}>{post.content}</Text>

      <View style={styles.postActions}>
        <Pressable
          style={styles.actionButton}
          accessibilityRole="button"
          accessibilityLabel={`Like ${post.name}'s post`}
        >
          <Text style={styles.actionIcon}>♡</Text>
          <Text style={styles.actionText}>{post.likes}</Text>
        </Pressable>
        <Pressable
          style={styles.actionButton}
          accessibilityRole="button"
          accessibilityLabel={`Comment on ${post.name}'s post`}
        >
          <Text style={styles.actionIcon}>○</Text>
          <Text style={styles.actionText}>{post.comments}</Text>
        </Pressable>
        <Pressable
          style={styles.shareButton}
          accessibilityRole="button"
          accessibilityLabel={`Share ${post.name}'s post`}
        >
          <Text style={styles.shareText}>Share</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.wordmark}>SHADOW</Text>
            <Text style={styles.subtitle}>Your campus, in motion.</Text>
          </View>
          <Pressable
            style={styles.notificationButton}
            accessibilityRole="button"
            accessibilityLabel="Notifications"
          >
            <Text style={styles.notificationIcon}>!</Text>
            <View style={styles.notificationDot} />
          </Pressable>
        </View>

        <View style={styles.composer}>
          <Avatar initials="YOU" color="#1B2A41" />
          <Pressable
            style={styles.composerPrompt}
            accessibilityRole="button"
            accessibilityLabel="Create a post"
          >
            <Text style={styles.composerText}>What's happening?</Text>
          </Pressable>
          <View style={styles.composerAccent} />
        </View>

        <View style={styles.feedHeading}>
          <Text style={styles.sectionTitle}>Your feed</Text>
          <Text style={styles.sectionMeta}>Fresh from campus</Text>
        </View>

        {posts.map((post) => (
          <FeedPostCard key={post.id} post={post} />
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
    paddingBottom: 24,
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
  notificationButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E7EC',
    borderRadius: 22,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  notificationIcon: {
    color: '#1B2A41',
    fontSize: 19,
    fontWeight: '700',
  },
  notificationDot: {
    backgroundColor: '#E26D5A',
    borderColor: '#FFFFFF',
    borderRadius: 5,
    borderWidth: 2,
    height: 10,
    position: 'absolute',
    right: 7,
    top: 6,
    width: 10,
  },
  composer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E7EC',
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 28,
    minHeight: 72,
    paddingHorizontal: 14,
  },
  composerPrompt: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 12,
    minHeight: 44,
  },
  composerText: {
    color: '#8792A3',
    fontSize: 15,
  },
  composerAccent: {
    backgroundColor: '#E26D5A',
    borderRadius: 3,
    height: 22,
    width: 5,
  },
  feedHeading: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#1B2A41',
    fontSize: 21,
    fontWeight: '700',
  },
  sectionMeta: {
    color: '#8792A3',
    fontSize: 12,
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
  },
  avatar: {
    alignItems: 'center',
    borderRadius: 21,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  postIdentity: {
    flex: 1,
    marginLeft: 10,
  },
  postName: {
    color: '#1B2A41',
    fontSize: 14,
    fontWeight: '700',
  },
  postContext: {
    color: '#8792A3',
    fontSize: 11,
    marginTop: 3,
  },
  postTime: {
    color: '#A2AAB5',
    fontSize: 11,
    marginLeft: 8,
  },
  postContent: {
    color: '#334155',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18,
    marginTop: 15,
  },
  postActions: {
    alignItems: 'center',
    borderTopColor: '#EEF1F3',
    borderTopWidth: 1,
    flexDirection: 'row',
    paddingTop: 12,
  },
  actionButton: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 22,
    minHeight: 30,
    minWidth: 44,
  },
  actionIcon: {
    color: '#6F7C8E',
    fontSize: 21,
    marginRight: 5,
  },
  actionText: {
    color: '#6F7C8E',
    fontSize: 12,
    fontWeight: '600',
  },
  shareButton: {
    justifyContent: 'center',
    marginLeft: 'auto',
    minHeight: 30,
    paddingHorizontal: 4,
  },
  shareText: {
    color: '#E26D5A',
    fontSize: 12,
    fontWeight: '700',
  },
});
