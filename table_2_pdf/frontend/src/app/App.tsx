import React, { useMemo, useState } from "react";
import { Box, Button, Heading, Text } from "@airtable/blocks/ui";
import { PdfHubPage } from "./pages/PdfHubPage";
import { SettingsPage } from "./pages/SettingsPage";

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
                {page === "pdf-center" ? <PdfHubPage /> : <SettingsPage />}
            </Box>
        </Box>
    );
}
