import React, { useRef, useState } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  FlatList,
} from 'react-native';
import Popover from 'react-native-popover-view';
import Container from '../../components/Container';
import Text from '../../components/Text';
import { useStyle } from './style';
import { useTab3Screen } from './useTab3Screen';
import { COLORS } from '../../utils/colors';

// Custom dropdown button component
const DropdownButton = ({
  value,
  onPress,
}: {
  value: string;
  onPress: () => void;
}) => {
  const styles = useStyle();
  return (
    <TouchableOpacity
      style={[
        styles.input,
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingRight: 12,
        },
      ]}
      onPress={onPress}
    >
      <Text style={{ color: COLORS.dark[900], fontSize: 14 }}>
        {value.charAt(0).toUpperCase() + value.replace('-', ' ').slice(1)}
      </Text>
      <Text style={{ color: COLORS.dark[500], fontSize: 16 }}>▼</Text>
    </TouchableOpacity>
  );
};

const Tab3Screen = () => {
  const styles = useStyle();
  const userButtonRef = useRef(null);
  const [userButtonLayout, setUserButtonLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [isUserPopoverVisible, setIsUserPopoverVisible] = useState(false);
  const {
    users,
    usersLoading,
    tasks,
    tasksLoading,
    tasksError,
    createForm,
    setCreateForm,
    handleCreate,
    isCreating,
    updateForm,
    setUpdateForm,
    handleSelectTask,
    handleUpdateTask,
    isUpdating,
    handleDeleteTask,
    isDeleting,
    selectedTaskId,
    setSelectedTaskId,
  } = useTab3Screen();

  // Get selected user's name
  const getSelectedUserName = () => {
    const user = users.find(u => u.id === createForm.userId);
    return user ? `${user.firstname} ${user.lastname}` : 'Select User';
  };

  // Helper function to get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return COLORS.falseOptionBorderColor;
      case 'medium':
        return COLORS.green[500];
      case 'low':
        return COLORS.green[400];
      default:
        return COLORS.dark[500];
    }
  };

  // Custom dropdown for priority
  const showPriorityOptions = (isCreate: boolean) => {
    const priorities = ['low', 'medium', 'high'];
    Alert.alert('Select Priority', '', [
      ...priorities.map(p => ({
        text: p.charAt(0).toUpperCase() + p.slice(1),
        onPress: () => {
          if (isCreate) {
            setCreateForm({ ...createForm, priority: p as any });
          } else {
            setUpdateForm({ ...updateForm, priority: p as any });
          }
        },
      })),
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  // Custom dropdown for status
  const showStatusOptions = () => {
    const statuses = ['pending', 'in-progress', 'completed', 'rejected'];
    Alert.alert('Select Status', '', [
      ...statuses.map(s => ({
        text: s.charAt(0).toUpperCase() + s.replace('-', ' ').slice(1),
        onPress: () => {
          setUpdateForm({ ...updateForm, status: s as any });
        },
      })),
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <Container style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text style={styles.header}>Task Management</Text>

        {/* Error States */}
        {tasksError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Failed to load tasks</Text>
          </View>
        )}

        {/* Create Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Create New Task</Text>

          <View style={styles.formInputGroup}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter task title"
              value={createForm.title}
              onChangeText={text =>
                setCreateForm({ ...createForm, title: text })
              }
              editable={!isCreating}
            />
          </View>

          <View style={styles.formInputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[
                styles.input,
                { minHeight: 80, textAlignVertical: 'top' },
              ]}
              placeholder="Enter task description"
              value={createForm.description}
              onChangeText={text =>
                setCreateForm({ ...createForm, description: text })
              }
              multiline
              editable={!isCreating}
            />
          </View>

          <View style={styles.formInputGroup}>
            <Text style={styles.label}>Priority</Text>
            <DropdownButton
              value={createForm.priority}
              onPress={() => showPriorityOptions(true)}
            />
          </View>

          <View style={styles.formInputGroup}>
            <Text style={styles.label}>User</Text>
            <Popover
              // @ts-ignore
              isVisible={isUserPopoverVisible}
              onRequestClose={() => setIsUserPopoverVisible(false)}
              // @ts-ignore
              fromRect={
                userButtonLayout
                  ? {
                      x: userButtonLayout.x,
                      y: userButtonLayout.y,
                      width: userButtonLayout.width,
                      height: userButtonLayout.height,
                    }
                  : undefined
              }
              popoverStyle={styles.popoverStyle}
            >
              {usersLoading ? (
                <View style={styles.tooltipLoadingContainer}>
                  <ActivityIndicator color={COLORS.green[500]} />
                </View>
              ) : users.length === 0 ? (
                <View style={styles.tooltipEmptyContainer}>
                  <Text style={{ color: COLORS.dark[600], fontSize: 14 }}>
                    No users available
                  </Text>
                </View>
              ) : (
                <ScrollView
                  style={styles.popoverContentContainer}
                  showsVerticalScrollIndicator={false}
                >
                  {users.map((item, index) => (
                    <TouchableOpacity
                      key={item.id || index}
                      onPress={() => {
                        setCreateForm({ ...createForm, userId: item.id || '' });
                        setIsUserPopoverVisible(false);
                      }}
                      style={[
                        styles.tooltipMenuItem,
                        createForm.userId === item.id &&
                          styles.tooltipMenuItemSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.tooltipMenuItemText,
                          createForm.userId === item.id &&
                            styles.tooltipMenuItemTextSelected,
                        ]}
                      >
                        {item.firstname} {item.lastname}
                      </Text>
                      <Text
                        style={[
                          styles.tooltipMenuItemSubtext,
                          createForm.userId === item.id &&
                            styles.tooltipMenuItemSubtextSelected,
                        ]}
                      >
                        {item.email}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </Popover>

            <TouchableOpacity
              ref={userButtonRef}
              style={[
                styles.input,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                },
              ]}
              onPress={() => {
                if (userButtonRef.current) {
                  (userButtonRef.current as any).measure(
                    (_: number, __: number, width: number, height: number, pageX: number, pageY: number) => {
                      setUserButtonLayout({
                        x: pageX,
                        y: pageY,
                        width,
                        height,
                      });
                      setIsUserPopoverVisible(true);
                    }
                  );
                }
              }}
            >
              <Text
                style={{
                  color: createForm.userId ? COLORS.dark[900] : COLORS.dark[500],
                  fontSize: 14,
                }}
              >
                {getSelectedUserName()}
              </Text>
              <Text style={{ color: COLORS.dark[500], fontSize: 16 }}>▼</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => {
              try {
                handleCreate();
              } catch (error: any) {
                Alert.alert('Error', error.message);
              }
            }}
            disabled={isCreating}
          >
            {isCreating ? (
              <ActivityIndicator color={styles.buttonText.color} />
            ) : (
              <Text style={styles.buttonText}>Create Task</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Update Section */}
        {selectedTaskId && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Update Selected Task</Text>

            <View style={styles.formInputGroup}>
              <Text style={styles.label}>Title</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter task title"
                value={updateForm.title}
                onChangeText={text =>
                  setUpdateForm({ ...updateForm, title: text })
                }
                editable={!isUpdating}
              />
            </View>

            <View style={styles.formInputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[
                  styles.input,
                  { minHeight: 80, textAlignVertical: 'top' },
                ]}
                placeholder="Enter task description"
                value={updateForm.description}
                onChangeText={text =>
                  setUpdateForm({ ...updateForm, description: text })
                }
                multiline
                editable={!isUpdating}
              />
            </View>

            <View style={styles.formInputGroup}>
              <Text style={styles.label}>Priority</Text>
              <DropdownButton
                value={updateForm.priority}
                onPress={() => showPriorityOptions(false)}
              />
            </View>

            <View style={styles.formInputGroup}>
              <Text style={styles.label}>Status</Text>
              <DropdownButton
                value={updateForm.status}
                onPress={showStatusOptions}
              />
            </View>

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.button, styles.primaryButton, { flex: 1 }]}
                onPress={() => {
                  try {
                    handleUpdateTask();
                  } catch (error: any) {
                    Alert.alert('Error', error.message);
                  }
                }}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <ActivityIndicator color={styles.buttonText.color} />
                ) : (
                  <Text style={styles.buttonText}>Update</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.dangerButton, { flex: 1 }]}
                onPress={() => {
                  Alert.alert(
                    'Confirm',
                    'Are you sure you want to delete this task?',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      {
                        text: 'Delete',
                        style: 'destructive',
                        onPress: () => {
                          try {
                            handleDeleteTask();
                          } catch (error: any) {
                            Alert.alert('Error', error.message);
                          }
                        },
                      },
                    ],
                  );
                }}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <ActivityIndicator color={styles.buttonText.color} />
                ) : (
                  <Text style={styles.buttonText}>Delete</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.secondaryButton, { flex: 1 }]}
                onPress={() => setSelectedTaskId(null)}
              >
                <Text style={[styles.buttonText, { color: COLORS.dark[700] }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Tasks List Section */}
        <View style={styles.section}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <Text style={styles.sectionTitle}>Tasks ({tasks.length})</Text>
            {tasksLoading && <ActivityIndicator style={{ marginLeft: 8 }} />}
          </View>

          {tasksLoading && !tasks.length ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" />
              <Text style={styles.emptyStateText}>Loading tasks...</Text>
            </View>
          ) : tasks.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No tasks found</Text>
            </View>
          ) : (
            <FlatList
              data={tasks}
              scrollEnabled={false}
              keyExtractor={item => item.id || Math.random().toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.taskCard,
                    selectedTaskId === item.id && styles.taskCardSelected,
                  ]}
                  onPress={() => handleSelectTask(item)}
                >
                  <View style={styles.taskCardHeader}>
                    <Text style={styles.taskTitle} numberOfLines={1}>
                      {item.title}
                    </Text>
                  </View>
                  <Text style={styles.taskDescription} numberOfLines={2}>
                    {item.description}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View
                        style={[
                          styles.taskPriority,
                          { backgroundColor: getPriorityColor(item.priority) },
                        ]}
                      >
                        <Text
                          style={{
                            color: COLORS.white,
                            fontSize: 11,
                            fontWeight: '500',
                          }}
                        >
                          {item.priority}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.taskStatus}>{item.status}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </ScrollView>
    </Container>
  );
};

export default Tab3Screen;
