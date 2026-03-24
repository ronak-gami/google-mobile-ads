import React from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  FlatList,
} from 'react-native';
import Container from '../../components/Container';
import Text from '../../components/Text';
import { useStyle } from './style';
import { useTab2Screen } from './useTab2Screen';
import { COLORS } from '../../utils/colors';

const Tab2Screen = () => {
  const styles = useStyle();
  const {
    users,
    usersLoading,
    usersError,
    registerForm,
    setRegisterForm,
    handleRegister,
    isRegistering,
    updateForm,
    setUpdateForm,
    handleSelectUser,
    handleUpdateUser,
    isUpdating,
    handleDeleteUser,
    isDeleting,
    selectedUserId,
    setSelectedUserId,
  } = useTab2Screen();

  return (
    <Container style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text style={styles.header}>User Management</Text>

        {/* Error States */}
        {usersError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Failed to load users</Text>
          </View>
        )}

        {/* Register Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Register New User</Text>

          <View style={styles.formInputGroup}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter first name"
              value={registerForm.firstname}
              onChangeText={text =>
                setRegisterForm({ ...registerForm, firstname: text })
              }
              editable={!isRegistering}
            />
          </View>

          <View style={styles.formInputGroup}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter last name"
              value={registerForm.lastname}
              onChangeText={text =>
                setRegisterForm({ ...registerForm, lastname: text })
              }
              editable={!isRegistering}
            />
          </View>

          <View style={styles.formInputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              value={registerForm.email}
              onChangeText={text =>
                setRegisterForm({ ...registerForm, email: text })
              }
              keyboardType="email-address"
              editable={!isRegistering}
            />
          </View>

          <View style={styles.formInputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              value={registerForm.password}
              onChangeText={text =>
                setRegisterForm({ ...registerForm, password: text })
              }
              secureTextEntry
              editable={!isRegistering}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => {
              try {
                handleRegister();
              } catch (error: any) {
                Alert.alert('Error', error.message);
              }
            }}
            disabled={isRegistering}
          >
            {isRegistering ? (
              <ActivityIndicator color={styles.buttonText.color} />
            ) : (
              <Text style={styles.buttonText}>Register User</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Update Section */}
        {selectedUserId && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Update Selected User</Text>

            <View style={styles.formInputGroup}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter first name"
                value={updateForm.firstname}
                onChangeText={text =>
                  setUpdateForm({ ...updateForm, firstname: text })
                }
                editable={!isUpdating}
              />
            </View>

            <View style={styles.formInputGroup}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter last name"
                value={updateForm.lastname}
                onChangeText={text =>
                  setUpdateForm({ ...updateForm, lastname: text })
                }
                editable={!isUpdating}
              />
            </View>

            <View style={styles.formInputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter email"
                value={updateForm.email}
                onChangeText={text =>
                  setUpdateForm({ ...updateForm, email: text })
                }
                keyboardType="email-address"
                editable={!isUpdating}
              />
            </View>

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.button, styles.primaryButton, { flex: 1 }]}
                onPress={() => {
                  try {
                    handleUpdateUser();
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
                    'Are you sure you want to delete this user?',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      {
                        text: 'Delete',
                        style: 'destructive',
                        onPress: () => {
                          try {
                            handleDeleteUser();
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
                onPress={() => setSelectedUserId(null)}
              >
                <Text style={[styles.buttonText, { color: COLORS.dark[700] }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Users List Section */}
        <View style={styles.section}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <Text style={styles.sectionTitle}>Users ({users.length})</Text>
            {usersLoading && <ActivityIndicator style={{ marginLeft: 8 }} />}
          </View>

          {usersLoading && !users.length ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" />
              <Text style={styles.emptyStateText}>Loading users...</Text>
            </View>
          ) : users.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No users found</Text>
            </View>
          ) : (
            <FlatList
              data={users}
              scrollEnabled={false}
              keyExtractor={item => item.id || Math.random().toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.userCard,
                    selectedUserId === item.id && styles.userCardSelected,
                  ]}
                  onPress={() => handleSelectUser(item)}
                >
                  <View style={styles.userCardHeader}>
                    <Text style={styles.userName}>
                      {item.firstname} {item.lastname}
                    </Text>
                  </View>
                  <Text style={styles.userEmail}>{item.email}</Text>
                  <Text style={styles.userRole}>Role: {item.role}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </ScrollView>
    </Container>
  );
};

export default Tab2Screen;
