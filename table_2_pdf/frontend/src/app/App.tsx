import React, { useMemo, useState } from "react";
import { Box, Button, Heading, Loader, Text, useBase, useRecords } from "@airtable/blocks/ui";

type Page = "pdf-center" | "settings";

export function App() {
    const [page, setPage] = useState<Page>("pdf-center");

    const pageTitle = useMemo(() => {
        switch (page) {
            case "pdf-center":
                return "PDF Center";
            case "settings":
                return "Settings";
            default:
                return "PDF Center";
        }
    }, [page]);

    return (
        <Box padding={3} display="flex" flexDirection="column" height="100%">
            {/* Header */}
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                marginBottom={3}
            >
                <Box>
                    <Heading size="large" marginBottom={1}>
                        {pageTitle}
                    </Heading>
                    <Text textColor="light">
                        Erzeuge PDFs aus deinen Airtable-Daten (Menu, Event, …).
                    </Text>
                </Box>

                {/* Top-Navigation */}
                <Box display="flex">
                    <Button
                        variant={page === "pdf-center" ? "primary" : "default"}
                        onClick={() => setPage("pdf-center")}
                        marginRight={2}
                    >
                        PDF Center
                    </Button>

                    <Button
                        variant={page === "settings" ? "primary" : "default"}
                        onClick={() => setPage("settings")}
                    >
                        Settings
                    </Button>
                </Box>
            </Box>

            {/* Content */}
            <Box flex="auto" overflow="auto">
                {page === "pdf-center" ? (
                    // Step 2: ersetze diesen Platzhalter durch <PdfCenter />
                    <Box padding={3} border="default" borderRadius="large">
                        <Heading size="default" marginBottom={2}>
                            Nächster Schritt
                        </Heading>
                        <Text>
                            Erstelle <Text fontWeight="strong">frontend/src/app/PdfCenter.tsx</Text>{" "}
                            und binde ihn hier ein. Danach bauen wir die Registry + das erste PDF
                            (Allergen-Aushang, A4 quer).
                        </Text>
                    </Box>
                ) : (
                    <Box padding={3} border="default" borderRadius="large">
                        <Heading size="default" marginBottom={2}>
                            Settings (Coming soon)
                        </Heading>
                        <Text textColor="light">
                            Hier mappen wir später Tabellen/Felder (z. B. Menu-Tabelle, Rollup-Feld
                            für Allergene, Attachment-Feld, Layout-Defaults).
                        </Text>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
