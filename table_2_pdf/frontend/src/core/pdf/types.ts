import type { ReactElement } from "react";

export type PdfBuildContext = {
    recordId: string;
};

export type PdfDefinition = {
    key: string;
    title: string;
    source: { tableName: string };
    buildDocument: (ctx: PdfBuildContext) => Promise<ReactElement>;
};
