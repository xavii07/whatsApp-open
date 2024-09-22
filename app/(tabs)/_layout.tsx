import MyIcon from "@/components/ui/MyIcon";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#25d366",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <MyIcon name="home-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Historial",
          tabBarIcon: ({ color }) => (
            <MyIcon name="reader-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
