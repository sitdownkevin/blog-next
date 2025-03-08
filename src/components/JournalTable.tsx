import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function JournalTable({
  journals,
  tableCaption,
  hideSubjectArea = false,
}) {
  return (
    <Table className="w-full">
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
              {!hideSubjectArea && (
                <TableCell>{journal.subjectArea}</TableCell>
              )}
              <TableCell className="whitespace-nowrap">
                {journal.printIssn}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
