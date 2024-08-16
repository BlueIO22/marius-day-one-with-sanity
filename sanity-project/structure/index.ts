import { StructureResolver } from "sanity/structure";
import { CalendarIcon } from "@sanity/icons"

export const structure: StructureResolver = (S) =>
    S.list()
        .id("root")
        .title("Content")
        .items([
            S.documentTypeListItem("event").title("Events").icon(CalendarIcon),
            S.documentTypeListItem("artist").title("Artists"),
            S.documentTypeListItem("venueType").title("Venues")
        ])
