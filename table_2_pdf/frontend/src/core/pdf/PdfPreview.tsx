import React, { useEffect, useState } from "react";
import { Box, Loader, Text } from "@airtable/blocks/ui";
import { pdf } from "@react-pdf/renderer";
import type { PdfDefinition } from "./types";

export function PdfPreview({ definition, recordId }: { definition: PdfDefinition; recordId: string }) {
    const [docUrl, setDocUrl] = useState<string | null>(null);
    const [err, setErr] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let alive = true;
        async function run() {
            if (!recordId) return;
            setLoading(true); setErr(null);
            try {
                const built = await definition.buildDocument({ recordId });
                const blob = await pdf(built).toBlob();
                const url = URL.createObjectURL(blob);
                if (alive) setDocUrl(url);
            } catch (e: any) {
                if (alive) setErr(e?.message ?? String(e));
            } finally {
                if (alive) setLoading(false);
            }
        }
        run();
        return () => { alive = false; };
    }, [definition, recordId]);

    if (!recordId) return <Text textColor="light">Wähle einen Datensatz.</Text>;
    if (loading) return <Loader />;
    if (err) return <Text textColor="red">{err}</Text>;
    if (!docUrl) return null;

    return (
        <Box height="100%">
            <iframe src={docUrl} width="100%" height="100%" style={{ border: "none" }} />
        </Box>
    );
}
