import React from "react";
import { Box, Heading, Text } from "@airtable/blocks/ui";

export function SettingsPage() {
    return (
        <Box padding={3} border="default" borderRadius="large">
            <Heading size="default" marginBottom={2}>
                ⚙️ Settings (Coming soon)
            </Heading>
            <Text textColor="light">
                Hier mappen wir später Tabellen/Felder (z. B. Menu-Tabelle, Rollup-Feld für
                Allergene, Attachment-Feld, Layout-Defaults).
            </Text>
        </Box>
    );
}
