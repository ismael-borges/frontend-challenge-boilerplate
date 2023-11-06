import { ReactElement } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useFileContext } from "@/context";

function FileList(): ReactElement {

  const { state: { fileList } } = useFileContext();

    return (
      <>
        <h1 className="text-2xl font-bold pt-5 text-green-800">List of imported files</h1>

        <Table>
          <TableCaption>list of imported files.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Size</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            { fileList && (fileList.map((file, index): any => (
              <TableRow>
                  <TableCell className="font-medium">{ index }</TableCell>
                  <TableCell>{ file.name }</TableCell>
                  <TableCell>{ file.type }</TableCell>
                  <TableCell className="text-right">{ file.size }</TableCell>
              </TableRow>
            ))) };
          </TableBody>
        </Table>
      </>
    )
}

export { FileList };
