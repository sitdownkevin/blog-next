import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


export function JournalTable({ journals, tableCaption, hideSubjectArea = false }) {
    return <Table className="w-full mb-8">
        <TableCaption>{tableCaption}</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Index</TableHead>
                <TableHead>Title</TableHead>
                {!hideSubjectArea && <TableHead>Subject Area</TableHead>}
                <TableHead>Print ISSN</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {journals.map((journal, index) => {
                return (
                    <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{journal.title}</TableCell>
                        {!hideSubjectArea && <TableCell>{journal["subject area"]}</TableCell>}
                        <TableCell className="whitespace-nowrap">{journal["print issn"]}</TableCell>
                    </TableRow>
                )
            })}
        </TableBody>
    </Table>
}