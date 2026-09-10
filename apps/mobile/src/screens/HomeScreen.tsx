import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { apiClient } from '../api/client';
import type { RootTabParamList } from '../navigation/RootNavigator';
import { Post } from '../types/api';

const avatarColors = ['#F5B7A4', '#A8C6B5', '#AFC4E3', '#D8B6D8'];

function getInitials(name: string | null) {
  if (!name) {
    return 'SH';
  }

  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function formatPostTime(createdAt: string) {
  const created = new Date(createdAt);
  if (Number.isNaN(created.getTime())) {
    return '';
  }

  const elapsedMinutes = Math.max(
    0,
    Math.floor((Date.now() - created.getTime()) / 60000),
  );
  if (elapsedMinutes < 1) {
    return 'Just now';
  }
  if (elapsedMinutes < 60) {
    return `${elapsedMinutes} min ago`;
  }

  const elapsedHours = Math.floor(elapsedMinutes / 60);
  if (elapsedHours < 24) {
    return `${elapsedHours} hr${elapsedHours === 1 ? '' : 's'} ago`;
  }

  const elapsedDays = Math.floor(elapsedHours / 24);
  return `${elapsedDays} day${elapsedDays === 1 ? '' : 's'} ago`;
}

function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <View style={[styles.avatar, { backgroundColor: color }]}>
      <Text style={styles.avatarText}>{initials}</Text>
    </View>
  );
}

function FeedPostCard({ post, index }: { post: Post; index: number }) {
  const name = post.author.name || 'Shadow user';
  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Avatar
          initials={getInitials(post.author.name)}
          color={avatarColors[index % avatarColors.length]}
        />
        <View style={styles.postIdentity}>
          <Text style={styles.postName}>{name}</Text>
          <Text style={styles.postContext}>Shadow community</Text>
        </View>
        <Text style={styles.postTime}>{formatPostTime(post.createdAt)}</Text>
      </View>

      <Text style={styles.postContent}>{post.content}</Text>

      <View style={styles.postActions}>
        <Pressable
          style={styles.actionButton}
          accessibilityRole="button"
          accessibilityLabel={`Like ${name}'s post`}
        >
          <Text style={styles.actionIcon}>♡</Text>
          <Text style={styles.actionText}>0</Text>
        </Pressable>
        <Pressable
          style={styles.actionButton}
          accessibilityRole="button"
          accessibilityLabel={`Comment on ${name}'s post`}
        >
          <Text style={styles.actionIcon}>○</Text>
          <Text style={styles.actionText}>0</Text>
        </Pressable>
        <Pressable
          style={styles.shareButton}
          accessibilityRole="button"
          accessibilityLabel={`Share ${name}'s post`}
        >
          <Text style={styles.shareText}>Share</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const navigation = useNavigation<
    BottomTabNavigationProp<RootTabParamList>
  >();
  const route = useRoute<
    import('@react-navigation/native').RouteProp<RootTabParamList, 'Home'>
  >();
  const [posts, setPosts] = useState<Post[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isLoadingMoreRef = useRef(false);

  const loadFeed = useCallback(async (refresh = false) => {
    if (refresh) {
      setIsRefreshing(true);
      setNextCursor(null);
    } else {
      setIsLoading(true);
    }

    try {
      const response = await apiClient.getFeed({ limit: 20 });
      setPosts(response.items);
      setNextCursor(response.nextCursor);
      setError(null);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Unable to load your feed.',
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  const loadMorePosts = async () => {
    if (!nextCursor || isLoadingMoreRef.current) {
      return;
    }

    isLoadingMoreRef.current = true;
    setIsLoadingMore(true);

    try {
      const response = await apiClient.getFeed({
        limit: 20,
        cursor: nextCursor,
      });
      setPosts((currentPosts) => [...currentPosts, ...response.items]);
      setNextCursor(response.nextCursor);
    } catch (loadError) {
      console.error('Unable to load more feed posts.', loadError);
    } finally {
      isLoadingMoreRef.current = false;
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    void loadFeed();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (route.params?.postCreated !== true) {
        return;
      }

      navigation.setParams({ postCreated: undefined });
      void loadFeed(true);
    }, [loadFeed, navigation, route.params?.postCreated]),
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        onScroll={({ nativeEvent }) => {
          const distanceFromBottom =
            nativeEvent.contentSize.height -
            (nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y);

          if (distanceFromBottom <= 300) {
            void loadMorePosts();
          }
        }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => {
              void loadFeed(true);
            }}
            tintColor="#1B2A41"
          />
        }
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
            onPress={() => {
              navigation.navigate('Create');
            }}
          >
            <Text style={styles.composerText}>What's happening?</Text>
          </Pressable>
          <View style={styles.composerAccent} />
        </View>

        <View style={styles.feedHeading}>
          <Text style={styles.sectionTitle}>Your feed</Text>
          <Text style={styles.sectionMeta}>Fresh from campus</Text>
        </View>

        {isLoading ? (
          <ActivityIndicator
            accessibilityLabel="Loading feed"
            color="#1B2A41"
            size="small"
          />
        ) : error ? (
          <View style={styles.feedMessage}>
            <Text style={styles.feedMessageText}>{error}</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Retry loading feed"
              onPress={() => {
                void loadFeed();
              }}
            >
              <Text style={styles.retryText}>Try again</Text>
            </Pressable>
          </View>
        ) : posts.length === 0 ? (
          <Text style={styles.feedMessageText}>No posts yet.</Text>
        ) : (
          posts.map((post, index) => (
            <FeedPostCard key={post.id} post={post} index={index} />
          ))
        )}

        {isLoadingMore && (
          <ActivityIndicator
            accessibilityLabel="Loading more posts"
            color="#1B2A41"
            size="small"
          />
        )}
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
  feedMessage: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  feedMessageText: {
    color: '#728096',
    fontSize: 13,
    textAlign: 'center',
  },
  retryText: {
    color: '#E26D5A',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 10,
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
