import { base } from "@airtable/blocks";
import { TBL_MENU, FLD_MENU_NAME, FLD_ALLERGEN_IDS } from "../../core/airtable/tables";

export type AllergensViewModel = {
    title: string;
    items: string[];
};

export async function buildAllergensViewModel(recordId: string): Promise<AllergensViewModel> {
    const tbl = base.getTable(TBL_MENU);

    const query = await tbl.selectRecordsAsync({
        fields: [FLD_MENU_NAME, FLD_ALLERGEN_IDS],
    });

    const rec = query.records.find(r => r.id === recordId);
    if (!rec) throw new Error(`Menu record not found: ${recordId}`);

    const title = rec.getCellValueAsString(FLD_MENU_NAME) || "Allergenübersicht";

    const raw = rec.getCellValue(FLD_ALLERGEN_IDS) as unknown;

    const items =
        Array.isArray(raw)
            ? raw.map((x: any) => x?.name ?? x?.id).filter(Boolean)
            : typeof raw === "string"
                ? raw.split(",").map(s => s.trim()).filter(Boolean)
                : [];

    const unique = Array.from(new Set(items)).sort((a, b) => a.localeCompare(b, "de"));
    return { title, items: unique };
}
