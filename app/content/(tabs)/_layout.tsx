import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
       // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "rgba(255,255,255,0.5)",
        tabBarShowLabel:false,
        headerShown: false,
        tabBarStyle:{
          backgroundColor:Colors[colorScheme?? "dark"].background,

          borderTopColor: "transparent",
          paddingTop: 10,
          paddingBottom:20,
          height:80,
        //  backgroundColor:"yellow",
          // alignItems:"flex-start",
          // justifyContent:'flex-start'
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: 'Bookmark',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "bookmarks": "bookmark-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "notifications":"notifications-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "settings": "settings-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="servers"
        options={{
          title: 'Servers',
          tabBarIcon: ()=>null,
          tabBarItemStyle:{
            display:"none"
          }
        }}
      />
    </Tabs>
  );
}
