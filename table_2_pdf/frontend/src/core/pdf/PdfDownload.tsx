import React, { useEffect, useState } from "react";
import { Button, Text } from "@airtable/blocks/ui";
import { PDFDownloadLink } from "@react-pdf/renderer";
import type { PdfDefinition } from "./types";

export function PdfDownload({ definition, recordId, disabled }: {
    definition: PdfDefinition;
    recordId: string;
    disabled?: boolean;
}) {
    const [doc, setDoc] = useState<React.ReactElement | null>(null);
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        let alive = true;
        async function run() {
            if (!recordId) return;
            setErr(null);
            try {
                const built = await definition.buildDocument({ recordId });
                if (alive) setDoc(built);
            } catch (e: any) {
                if (alive) setErr(e?.message ?? String(e));
            }
        }
        run();
        return () => { alive = false; };
    }, [definition, recordId]);

    if (err) return <Text textColor="red">{err}</Text>;

    if (disabled || !recordId || !doc) {
        return <Button disabled>Download</Button>;
    }

    return (
        <PDFDownloadLink document={doc} fileName={`${definition.key}-${recordId}.pdf`}>
            {({ loading }) => (
                <Button variant="default" disabled={loading}>
                    {loading ? "Baue PDF..." : "Download"}
                </Button>
            )}
        </PDFDownloadLink>
    );
}
