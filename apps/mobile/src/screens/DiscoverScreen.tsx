import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Topic = {
  id: string;
  title: string;
  detail: string;
  color: string;
};

type Student = {
  id: string;
  initials: string;
  name: string;
  course: string;
  color: string;
};

type Community = {
  id: string;
  name: string;
  detail: string;
  members: string;
  color: string;
};

const topics: Topic[] = [
  {
    id: '1',
    title: 'Study spots',
    detail: '248 conversations',
    color: '#DDE9E2',
  },
  {
    id: '2',
    title: 'Campus events',
    detail: '192 conversations',
    color: '#F8DDD3',
  },
  {
    id: '3',
    title: 'Internships',
    detail: '156 conversations',
    color: '#DCE5F3',
  },
];

const categories = [
  'All interests',
  'Design',
  'Technology',
  'Music',
  'Wellness',
  'Entrepreneurship',
];

const students: Student[] = [
  {
    id: '1',
    initials: 'NB',
    name: 'Nia Brooks',
    course: 'Architecture',
    color: '#D6B5A9',
  },
  {
    id: '2',
    initials: 'OM',
    name: 'Owen Malik',
    course: 'Economics',
    color: '#A8C6B5',
  },
  {
    id: '3',
    initials: 'EP',
    name: 'Elena Park',
    course: 'Visual Arts',
    color: '#AFC4E3',
  },
  {
    id: '4',
    initials: 'TW',
    name: 'Theo Williams',
    course: 'Mechanical Engineering',
    color: '#D8B6D8',
  },
];

const communities: Community[] = [
  {
    id: '1',
    name: 'Late Night Library',
    detail: 'Study community',
    members: '1.2k members',
    color: '#1B2A41',
  },
  {
    id: '2',
    name: 'First-Year Founders',
    detail: 'Student community',
    members: '684 members',
    color: '#E26D5A',
  },
  {
    id: '3',
    name: 'Campus Creatives',
    detail: 'College-wide group',
    members: '426 members',
    color: '#6D8C7C',
  },
];

function InitialAvatar({ initials, color }: { initials: string; color: string }) {
  return (
    <View style={[styles.avatar, { backgroundColor: color }]}>
      <Text style={styles.avatarText}>{initials}</Text>
    </View>
  );
}

function TopicCard({ topic }: { topic: Topic }) {
  return (
    <Pressable style={[styles.topicCard, { backgroundColor: topic.color }]} accessibilityRole="button">
      <Text style={styles.topicTitle}>{topic.title}</Text>
      <Text style={styles.topicDetail}>{topic.detail}</Text>
      <Text style={styles.topicArrow}>{'->'}</Text>
    </Pressable>
  );
}

function StudentCard({ student }: { student: Student }) {
  return (
    <Pressable style={styles.studentCard} accessibilityRole="button" accessibilityLabel={`View ${student.name}`}>
      <InitialAvatar initials={student.initials} color={student.color} />
      <Text style={styles.studentName} numberOfLines={1}>{student.name}</Text>
      <Text style={styles.studentCourse} numberOfLines={1}>{student.course}</Text>
      <View style={styles.viewProfileButton}>
        <Text style={styles.viewProfileText}>View profile</Text>
      </View>
    </Pressable>
  );
}

function CommunityCard({ community }: { community: Community }) {
  return (
    <Pressable style={styles.communityCard} accessibilityRole="button" accessibilityLabel={`View ${community.name}`}>
      <View style={[styles.communityMark, { backgroundColor: community.color }]}>
        <Text style={styles.communityMarkText}>{community.name.slice(0, 1)}</Text>
      </View>
      <View style={styles.communityInfo}>
        <Text style={styles.communityName} numberOfLines={1}>{community.name}</Text>
        <Text style={styles.communityDetail}>{community.detail}</Text>
        <Text style={styles.communityMembers}>{community.members}</Text>
      </View>
      <Text style={styles.chevron}>{'->'}</Text>
    </Pressable>
  );
}

export default function DiscoverScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.wordmark}>SHADOW</Text>
            <Text style={styles.subtitle}>Find your people.</Text>
          </View>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>DISCOVER</Text>
          </View>
        </View>

        <Text style={styles.pageTitle}>Explore campus life</Text>
        <Text style={styles.pageIntro}>
          Find conversations, communities, and students who make your campus feel smaller.
        </Text>

        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>?</Text>
          <TextInput
            accessibilityLabel="Search people, topics, or colleges"
            editable={false}
            placeholder="Search people, topics, or colleges"
            placeholderTextColor="#8792A3"
            style={styles.searchInput}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending now</Text>
          <Text style={styles.sectionMeta}>See all</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.topicList}>
          {topics.map((topic) => <TopicCard key={topic.id} topic={topic} />)}
        </ScrollView>

        <Text style={styles.sectionTitle}>Browse interests</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipList}>
          {categories.map((category, index) => (
            <Pressable
              key={category}
              style={[styles.chip, index === 0 && styles.activeChip]}
              accessibilityRole="button"
            >
              <Text style={[styles.chipText, index === 0 && styles.activeChipText]}>{category}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Students to meet</Text>
          <Text style={styles.sectionMeta}>See all</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.studentList}>
          {students.map((student) => <StudentCard key={student.id} student={student} />)}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Communities</Text>
          <Text style={styles.sectionMeta}>See all</Text>
        </View>
        <View style={styles.communityList}>
          {communities.map((community) => <CommunityCard key={community.id} community={community} />)}
        </View>

        <View style={styles.suggestionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Suggested for you</Text>
            <Text style={styles.suggestionSubtitle}>Based on campus conversations</Text>
          </View>
          <Text style={styles.spark}>+</Text>
        </View>
        <View style={styles.suggestionCard}>
          <View style={styles.suggestionStrip} />
          <Text style={styles.suggestionTitle}>The 8am Club</Text>
          <Text style={styles.suggestionText}>
            A low-key corner for early birds, quiet mornings, and surviving the first lecture.
          </Text>
          <Text style={styles.suggestionMeta}>92 students are talking here</Text>
        </View>
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
  pageTitle: {
    color: '#1B2A41',
    fontSize: 26,
    fontWeight: '700',
    marginTop: 4,
  },
  pageIntro: {
    color: '#728096',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 7,
    maxWidth: 340,
  },
  searchContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E7EC',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: 19,
    minHeight: 52,
    paddingHorizontal: 14,
  },
  searchIcon: {
    alignItems: 'center',
    borderColor: '#8792A3',
    borderRadius: 8,
    borderWidth: 1.5,
    color: '#8792A3',
    fontSize: 12,
    height: 17,
    lineHeight: 15,
    overflow: 'hidden',
    textAlign: 'center',
    width: 17,
  },
  searchInput: {
    color: '#334155',
    flex: 1,
    fontSize: 14,
    marginLeft: 10,
    paddingVertical: 0,
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
    color: '#E26D5A',
    fontSize: 12,
    fontWeight: '700',
  },
  topicList: {
    paddingRight: 8,
  },
  topicCard: {
    borderRadius: 14,
    height: 126,
    justifyContent: 'space-between',
    marginRight: 10,
    padding: 15,
    width: 154,
  },
  topicTitle: {
    color: '#1B2A41',
    fontSize: 16,
    fontWeight: '700',
    maxWidth: 120,
  },
  topicDetail: {
    color: '#607082',
    fontSize: 11,
  },
  topicArrow: {
    color: '#1B2A41',
    fontSize: 16,
    fontWeight: '700',
  },
  chipList: {
    paddingBottom: 2,
    paddingTop: 13,
    paddingRight: 8,
  },
  chip: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DDE3E8',
    borderRadius: 18,
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  activeChip: {
    backgroundColor: '#1B2A41',
    borderColor: '#1B2A41',
  },
  chipText: {
    color: '#607082',
    fontSize: 12,
    fontWeight: '600',
  },
  activeChipText: {
    color: '#FFFFFF',
  },
  studentList: {
    paddingRight: 8,
  },
  studentCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E7EC',
    borderRadius: 14,
    borderWidth: 1,
    marginRight: 10,
    padding: 13,
    width: 142,
  },
  avatar: {
    alignItems: 'center',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    marginBottom: 10,
    width: 48,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  studentName: {
    color: '#1B2A41',
    fontSize: 13,
    fontWeight: '700',
    maxWidth: 116,
  },
  studentCourse: {
    color: '#8792A3',
    fontSize: 11,
    marginTop: 4,
    maxWidth: 116,
  },
  viewProfileButton: {
    borderColor: '#E2E7EC',
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 12,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  viewProfileText: {
    color: '#537365',
    fontSize: 10,
    fontWeight: '700',
  },
  communityList: {
    gap: 9,
  },
  communityCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E7EC',
    borderRadius: 13,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 76,
    paddingHorizontal: 13,
  },
  communityMark: {
    alignItems: 'center',
    borderRadius: 10,
    height: 46,
    justifyContent: 'center',
    width: 46,
  },
  communityMarkText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  communityInfo: {
    flex: 1,
    marginLeft: 12,
  },
  communityName: {
    color: '#1B2A41',
    fontSize: 14,
    fontWeight: '700',
  },
  communityDetail: {
    color: '#607082',
    fontSize: 11,
    marginTop: 3,
  },
  communityMembers: {
    color: '#A2AAB5',
    fontSize: 10,
    marginTop: 3,
  },
  chevron: {
    color: '#E26D5A',
    fontSize: 15,
    fontWeight: '700',
    paddingLeft: 8,
  },
  suggestionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 28,
  },
  suggestionSubtitle: {
    color: '#8792A3',
    fontSize: 11,
    marginTop: 4,
  },
  spark: {
    alignItems: 'center',
    backgroundColor: '#F8DDD3',
    borderRadius: 16,
    color: '#B94F3E',
    fontSize: 20,
    height: 32,
    lineHeight: 30,
    textAlign: 'center',
    width: 32,
  },
  suggestionCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E7EC',
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 16,
  },
  suggestionStrip: {
    backgroundColor: '#E26D5A',
    height: 4,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  suggestionTitle: {
    color: '#1B2A41',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 3,
  },
  suggestionText: {
    color: '#607082',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 8,
  },
  suggestionMeta: {
    color: '#537365',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 13,
  },
});
