import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const postTypes = ['Campus life', 'Question', 'Event', 'Opportunity'];
const visibilityOptions = ['Campus', 'Community', 'Only me'];
const maxCharacters = 280;

function Avatar() {
  return (
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>MP</Text>
    </View>
  );
}

function SectionLabel({ children }: { children: string }) {
  return <Text style={styles.sectionLabel}>{children}</Text>;
}

export default function CreateScreen() {
  const [postText, setPostText] = useState('');
  const [selectedType, setSelectedType] = useState(postTypes[0]);
  const [selectedVisibility, setSelectedVisibility] = useState(visibilityOptions[0]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Pressable style={styles.headerAction} accessibilityRole="button" accessibilityLabel="Cancel post">
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Text style={styles.headerTitle}>Create post</Text>
            <Pressable style={styles.postButton} accessibilityRole="button" accessibilityLabel="Post">
              <Text style={styles.postButtonText}>Post</Text>
            </Pressable>
          </View>

          <View style={styles.authorRow}>
            <Avatar />
            <View style={styles.authorDetails}>
              <Text style={styles.authorName}>Maya Patel</Text>
              <Text style={styles.authorContext}>Computer Science  •  Northbridge University</Text>
            </View>
          </View>

          <View style={styles.composerCard}>
            <TextInput
              accessibilityLabel="Post content"
              autoCapitalize="sentences"
              multiline
              maxLength={maxCharacters}
              onChangeText={(value) => setPostText(value.slice(0, maxCharacters))}
              placeholder="Share something with your campus..."
              placeholderTextColor="#9AA4B2"
              style={styles.composerInput}
              textAlignVertical="top"
              value={postText}
            />
            <View style={styles.composerFooter}>
              <Text style={styles.composerHint}>Keep it thoughtful and campus-friendly.</Text>
              <Text style={styles.characterCount}>{postText.length}/{maxCharacters}</Text>
            </View>
          </View>

          <SectionLabel>Post type</SectionLabel>
          <View style={styles.typeList}>
            {postTypes.map((type) => {
              const isSelected = selectedType === type;
              return (
                <Pressable
                  key={type}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  onPress={() => setSelectedType(type)}
                  style={[styles.typeChip, isSelected && styles.selectedTypeChip]}
                >
                  <Text style={[styles.typeChipText, isSelected && styles.selectedTypeChipText]}>{type}</Text>
                </Pressable>
              );
            })}
          </View>

          <SectionLabel>Share with</SectionLabel>
          <Pressable style={styles.selectorCard} accessibilityRole="button" accessibilityLabel="Select college or community">
            <View style={styles.selectorIcon}>
              <Text style={styles.selectorIconText}>N</Text>
            </View>
            <View style={styles.selectorInfo}>
              <Text style={styles.selectorTitle}>Northbridge University</Text>
              <Text style={styles.selectorSubtitle}>College community</Text>
            </View>
            <Text style={styles.selectorArrow}>{'->'}</Text>
          </Pressable>

          <SectionLabel>Visibility</SectionLabel>
          <View style={styles.visibilityCard}>
            {visibilityOptions.map((option) => {
              const isSelected = selectedVisibility === option;
              return (
                <Pressable
                  key={option}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  onPress={() => setSelectedVisibility(option)}
                  style={styles.visibilityOption}
                >
                  <View style={[styles.radio, isSelected && styles.selectedRadio]}>
                    {isSelected && <View style={styles.radioDot} />}
                  </View>
                  <Text style={[styles.visibilityText, isSelected && styles.selectedVisibilityText]}>{option}</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.toolsRow}>
            <Pressable style={styles.attachmentButton} accessibilityRole="button" accessibilityLabel="Add media attachment">
              <Text style={styles.attachmentIcon}>+</Text>
              <Text style={styles.attachmentText}>Add attachment</Text>
            </Pressable>
            <Text style={styles.attachmentHint}>Photos coming later</Text>
          </View>

          <View style={styles.noteCard}>
            <Text style={styles.noteTitle}>Make it yours</Text>
            <Text style={styles.noteText}>Posts help your campus find the ideas, events, and people that matter.</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#F7F8F6',
    flex: 1,
  },
  keyboardView: {
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
    minHeight: 58,
  },
  headerAction: {
    justifyContent: 'center',
    minHeight: 44,
    minWidth: 65,
  },
  cancelText: {
    color: '#728096',
    fontSize: 13,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#1B2A41',
    fontSize: 17,
    fontWeight: '700',
  },
  postButton: {
    alignItems: 'center',
    backgroundColor: '#1B2A41',
    borderRadius: 9,
    justifyContent: 'center',
    minHeight: 38,
    minWidth: 62,
    paddingHorizontal: 12,
  },
  postButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  authorRow: {
    alignItems: 'center',
    borderBottomColor: '#E2E7EC',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingBottom: 19,
    paddingTop: 10,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: '#1B2A41',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    width: 50,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  authorDetails: {
    flex: 1,
    marginLeft: 12,
  },
  authorName: {
    color: '#1B2A41',
    fontSize: 15,
    fontWeight: '700',
  },
  authorContext: {
    color: '#8792A3',
    fontSize: 11,
    marginTop: 4,
  },
  composerCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E7EC',
    borderRadius: 14,
    borderWidth: 1,
    marginTop: 20,
    minHeight: 190,
    padding: 15,
  },
  composerInput: {
    color: '#334155',
    flex: 1,
    fontSize: 17,
    lineHeight: 25,
    minHeight: 125,
  },
  composerFooter: {
    alignItems: 'flex-end',
    borderTopColor: '#EEF1F3',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
  },
  composerHint: {
    color: '#9AA4B2',
    flex: 1,
    fontSize: 11,
    marginRight: 10,
  },
  characterCount: {
    color: '#728096',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionLabel: {
    color: '#1B2A41',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 11,
    marginTop: 25,
  },
  typeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeChip: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DDE3E8',
    borderRadius: 18,
    borderWidth: 1,
    minHeight: 38,
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  selectedTypeChip: {
    backgroundColor: '#EAF0EC',
    borderColor: '#6D8C7C',
  },
  typeChipText: {
    color: '#607082',
    fontSize: 12,
    fontWeight: '600',
  },
  selectedTypeChipText: {
    color: '#537365',
  },
  selectorCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E7EC',
    borderRadius: 13,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 70,
    paddingHorizontal: 13,
  },
  selectorIcon: {
    alignItems: 'center',
    backgroundColor: '#DCE5F3',
    borderRadius: 11,
    height: 43,
    justifyContent: 'center',
    width: 43,
  },
  selectorIconText: {
    color: '#1B2A41',
    fontSize: 18,
    fontWeight: '800',
  },
  selectorInfo: {
    flex: 1,
    marginLeft: 12,
  },
  selectorTitle: {
    color: '#1B2A41',
    fontSize: 14,
    fontWeight: '700',
  },
  selectorSubtitle: {
    color: '#8792A3',
    fontSize: 11,
    marginTop: 4,
  },
  selectorArrow: {
    color: '#E26D5A',
    fontSize: 15,
    fontWeight: '700',
    paddingLeft: 8,
  },
  visibilityCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E7EC',
    borderRadius: 13,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 62,
    paddingHorizontal: 7,
  },
  visibilityOption: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: 5,
  },
  radio: {
    alignItems: 'center',
    borderColor: '#B5BEC9',
    borderRadius: 8,
    borderWidth: 1.5,
    height: 16,
    justifyContent: 'center',
    width: 16,
  },
  selectedRadio: {
    borderColor: '#E26D5A',
  },
  radioDot: {
    backgroundColor: '#E26D5A',
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  visibilityText: {
    color: '#8792A3',
    fontSize: 11,
    marginLeft: 5,
  },
  selectedVisibilityText: {
    color: '#1B2A41',
    fontWeight: '700',
  },
  toolsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 23,
    minHeight: 44,
  },
  attachmentButton: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 44,
    paddingRight: 10,
  },
  attachmentIcon: {
    alignItems: 'center',
    borderColor: '#E26D5A',
    borderRadius: 10,
    borderWidth: 1.5,
    color: '#E26D5A',
    fontSize: 18,
    fontWeight: '500',
    height: 20,
    lineHeight: 17,
    textAlign: 'center',
    width: 20,
  },
  attachmentText: {
    color: '#E26D5A',
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 8,
  },
  attachmentHint: {
    color: '#A2AAB5',
    fontSize: 10,
  },
  noteCard: {
    backgroundColor: '#EAF0EC',
    borderRadius: 13,
    marginTop: 21,
    padding: 15,
  },
  noteTitle: {
    color: '#537365',
    fontSize: 13,
    fontWeight: '700',
  },
  noteText: {
    color: '#607A6D',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },
});
