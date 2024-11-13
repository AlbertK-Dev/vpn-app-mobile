import { PropsWithChildren } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";


type Props = PropsWithChildren<{onPress: () => void}>

const styles = StyleSheet.create({
    container: {
        padding:10,
        height:48,
        width:48,
        borderRadius:10,
        backgroundColor:"#192948",
        justifyContent:"center",
        alignItems:"center"

    }
})

export default function ButtonIcon({children, onPress}:Props){
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            {children}
        </TouchableOpacity>
    )
}