// src/app/pages/PdfHubPage.tsx
import React, { useMemo, useState } from "react";
import { Box, Button, FormField, Heading, Select, Text } from "@airtable/blocks/ui";
import { getPdfDefinitions } from "../../core/pdf/PdfRegistry";
import { PdfPreview } from "../../core/pdf/PdfPreview";
import { PdfDownload } from "../../core/pdf/PdfDownload";

export function PdfHubPage() {
    const defs = useMemo(() => getPdfDefinitions(), []);
    const [pdfKey, setPdfKey] = useState(defs[0]?.key ?? "");
    const activeDef = defs.find(d => d.key === pdfKey);

    // Record selection kommt in Step 2 (selectors.ts) – erstmal nur UI-Platzhalter
    const [recordId, setRecordId] = useState<string>("");

    if (!activeDef) {
        return <Text>Keine PDFs registriert.</Text>;
    }

    const canBuild = Boolean(recordId);

    return (
        <Box display="flex" flexDirection="column">
            <Heading size="default" marginBottom={3}>PDF Center</Heading>

            <Box display="flex" flexWrap="wrap" marginBottom={3}>
                <Box minWidth={260} marginRight={3} marginBottom={2}>
                    <FormField label="PDF auswählen">
                        <Select
                            options={defs.map(d => ({ label: d.title, value: d.key }))}
                            value={pdfKey}
                            onChange={(val) => setPdfKey(String(val))}
                        />
                    </FormField>
                </Box>

                <Box minWidth={260} marginRight={3} marginBottom={2}>
                    <FormField label={`Datensatz-ID (${activeDef.source.tableName})`}>
                        <input
                            style={{ width: "100%", padding: 8 }}
                            value={recordId}
                            onChange={(e) => setRecordId(e.target.value)}
                            placeholder="recXXXXXXXXXXXXXX"
                        />
                    </FormField>
                    <Text textColor="light" marginTop={1}>
                        (Record Picker bauen wir als Nächstes – erstmal Quick-Win per ID)
                    </Text>
                </Box>
            </Box>

            <Box display="flex" marginBottom={3}>
                <Button variant="primary" disabled={!canBuild} marginRight={2}>
                    Preview aktualisieren
                </Button>
                <PdfDownload
                    disabled={!canBuild}
                    definition={activeDef}
                    recordId={recordId}
                />
            </Box>

            <Box border="default" borderRadius="large" padding={2} height="70vh">
                <PdfPreview definition={activeDef} recordId={recordId} />
            </Box>
        </Box>
    );
}