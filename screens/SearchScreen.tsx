import { useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, TextInput, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NativeStackParamList } from "../App";
import CarbonDataType from "../types/CarbonDataType";
import { Ionicons } from "@expo/vector-icons";
import WebsiteDataItem from "../components/Item";

type SearchScreenProps = NativeStackScreenProps<NativeStackParamList, "Search">;

const SearchScreen = ({ navigation, route }: SearchScreenProps) => {
    const { params } = route;
    const [query, setQuery] = useState("");
    const [data, setData] = useState<CarbonDataType[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setData(params?.data ?? []);
    }, [params]);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Ionicons
                    onPress={() => {
                        navigation.navigate("History", {
                            data: data,
                        });
                    }}
                    name="arrow-back"
                    size={24}
                />
            ),
        });
    }, [data]);

    const fetchResults = async () => {
        if (data.some((item) => item.url === query)) {
            console.log(`already searched ${query}`);
            return;
        }
        setLoading(true);
        const response = await fetch(
            `https://api.websitecarbon.com/site?url=${encodeURI(query)}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );
        const responseData = await response.json();
        if (Object.keys(responseData).length === 0 || "error" in responseData) {
            console.error(responseData.error ?? "No response data");
            setLoading(false);
            return;
        }
        console.log(responseData);
        setData([responseData, ...data]);
        setLoading(false);
    };

    return (
        <>
            <TextInput
                placeholder="Search"
                value={query}
                onChangeText={(newText) => setQuery(newText)}
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus={true}
                autoComplete="off"
                style={styles.textInput}
            />
            <Button title="Search" onPress={fetchResults} disabled={loading} />
            {loading && <ActivityIndicator size="large" />}
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

export default SearchScreen;

const styles = StyleSheet.create({
    textInput: {
        margin: 10,
        padding: 7,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'lightgray'
    }
});
