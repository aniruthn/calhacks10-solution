import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CarbonDataType from "../types/CarbonDataType";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

interface WebsiteDataItemProps {
    data: CarbonDataType;
    index: number;
    setData: React.Dispatch<React.SetStateAction<CarbonDataType[]>>;
}

const WebsiteDataItem = ({ data, index, setData }: WebsiteDataItemProps) => {
    const [expanded, setExpanded] = useState(false);
    const color = data.green ? "green" : "red";
    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    setExpanded(!expanded);
                }}
            >
                <View style={styles.container}>
                    <Text style={{ color: color }}>{data.url}</Text>
                    <View style={styles.containerRightSection}>
                        <Text style={{ color: color }}>{data.cleanerThan}</Text>
                        <Ionicons
                            name={expanded ? "chevron-up" : "chevron-down"}
                            size={24}
                            color={color}
                        />
                    </View>
                </View>
            </TouchableOpacity>
            {expanded && (
                <TouchableOpacity
                    style={styles.dropdown}
                    onPress={() => setExpanded(false)}
                >
                    <Text>Bytes: {data.bytes}</Text>
                    <Text>Adjusted Bytes: {data.statistics.adjustedBytes}</Text>
                    <Text>Energy: {data.statistics.energy}</Text>
                    <Text>
                        CO2 Grid Grams: {data.statistics.co2.grid.grams}
                    </Text>
                    <Text>
                        CO2 Grid Litres: {data.statistics.co2.grid.litres}
                    </Text>
                    <Text>
                        CO2 Renewable Grams:{" "}
                        {data.statistics.co2.renewable.grams}
                    </Text>
                    <Text>
                        CO2 Renewable Litres:{" "}
                        {data.statistics.co2.renewable.litres}
                    </Text>
                    <Ionicons
                        onPress={() => {
                            setData((prevData) => {
                                const newData = [...prevData];
                                newData.splice(index, 1);
                                return newData;
                            });
                        }}
                        name="remove-circle-outline"
                        size={24}
                        color="red"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default WebsiteDataItem;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        height: 50,
        alignItems: "center",
    },
    containerRightSection: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    dropdown: {
        padding: 10,
    },
});
