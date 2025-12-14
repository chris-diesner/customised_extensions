// src/features/allergens/config.ts
import React from "react";
import type { PdfDefinition } from "../../core/pdf/types";
import { buildAllergensViewModel } from "./builder";
import { AllergensDocument } from "./document";

export const AllergensPdfDefinition: PdfDefinition = {
    key: "allergens-aushang",
    title: "Allergen-Aushang (A4 quer)",
    source: { tableName: "Menu" },
    buildDocument: async ({ recordId }) => {
        const vm = await buildAllergensViewModel(recordId);
        return React.createElement(AllergensDocument, { vm });
    },
};
