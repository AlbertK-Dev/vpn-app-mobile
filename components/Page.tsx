import { StatusBar } from "expo-status-bar";
import { PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as NavigationBar from 'expo-navigation-bar';



type Props = PropsWithChildren<{}>;

export default function Page({children}:Props){
    NavigationBar.setButtonStyleAsync("light");
    NavigationBar.setBackgroundColorAsync('#001336');
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("overlay-swipe")

    return (
        <SafeAreaView style={{flex:1}} >
           
            {children}
            <StatusBar style='light' backgroundColor='#001336'  />
        </SafeAreaView>
    )
}