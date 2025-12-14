import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { AllergensViewModel } from "./builder";

const styles = StyleSheet.create({
    page: { padding: 24, flexDirection: "column" },
    header: { marginBottom: 12 },
    title: { fontSize: 22, fontWeight: 700 },
    subtitle: { fontSize: 12, marginTop: 4 },
    grid: { flexDirection: "row", flexWrap: "wrap", marginTop: 12 },
    pill: { borderWidth: 1, borderRadius: 6, paddingVertical: 6, paddingHorizontal: 10, margin: 6 },
    pillText: { fontSize: 12 },
    footer: { marginTop: "auto", fontSize: 9, opacity: 0.7 }
});

export function AllergensDocument({ vm }: { vm: AllergensViewModel }) {
    return (
        <Document>
            <Page size="A4" orientation="landscape" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>{vm.title}</Text>
                    <Text style={styles.subtitle}>Allergene & Zusatzstoffe – Aushang</Text>
                </View>

                <View style={styles.grid}>
                    {vm.items.map((a) => (
                        <View key={a} style={styles.pill}>
                            <Text style={styles.pillText}>{a}</Text>
                        </View>
                    ))}
                </View>

                <Text style={styles.footer}>Erstellt aus Airtable Menü-Daten</Text>
            </Page>
        </Document>
    );
}
