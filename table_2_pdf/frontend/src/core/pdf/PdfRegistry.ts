import type { PdfDefinition } from "./types";
import { AllergensPdfDefinition } from "../../features/allergens/config";

const REGISTRY: PdfDefinition[] = [
    AllergensPdfDefinition,
    // später weitere
];

export function getPdfDefinitions() {
    return REGISTRY;
}
