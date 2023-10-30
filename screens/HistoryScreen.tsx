import { Button, FlatList, StyleSheet, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NativeStackParamList } from "../App";
import { useEffect, useState } from "react";
import CarbonDataType from "../types/CarbonDataType";
import { Ionicons } from "@expo/vector-icons";
import WebsiteDataItem from "../components/Item";

type HistoryScreenProps = NativeStackScreenProps<
    NativeStackParamList,
    "History"
>;

const HistoryScreen = ({ navigation, route }: HistoryScreenProps) => {
    const { params } = route;
    const [data, setData] = useState<CarbonDataType[]>([]);
    useEffect(() => {
        setData(params?.data ?? []);
    }, [params]);

    return (
        <>
            <View style={styles.container}>
                <Button
                    title="Clear History"
                    onPress={() => {
                        setData([]);
                    }}
                />
                <Ionicons
                    onPress={() => {
                        navigation.navigate("Search", {
                            data: data,
                        });
                    }}
                    name="search-outline"
                    size={24}
                />
            </View>
            <FlatList
                data={data}
                renderItem={({ item, index }) => (
                    <WebsiteDataItem
                        data={item}
                        index={index}
                        setData={setData}
                    />
                )}
            />
        </>
    );
};

export default HistoryScreen;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 10,
        alignItems: "center",
    },
});
