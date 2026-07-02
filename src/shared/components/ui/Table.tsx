import type {
  HTMLAttributes,
  ReactNode,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes
} from "react";

import { cn } from "@/shared/utils/cn";

export type TableProps = TableHTMLAttributes<HTMLTableElement> & {
  containerClassName?: string;
};

export function Table({ className, containerClassName, ...props }: TableProps) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-3xl border bg-white shadow-soft",
        containerClassName
      )}
    >
      <div className="w-full overflow-x-auto">
        <table className={cn("w-full min-w-[720px]", className)} {...props} />
      </div>
    </div>
  );
}

export type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>;

export function TableHeader({ className, ...props }: TableHeaderProps) {
  return <thead className={cn("bg-muted/70", className)} {...props} />;
}

export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>;

export function TableBody({ className, ...props }: TableBodyProps) {
  return <tbody className={cn("divide-y", className)} {...props} />;
}

export type TableFooterProps = HTMLAttributes<HTMLTableSectionElement>;

export function TableFooter({ className, ...props }: TableFooterProps) {
  return <tfoot className={cn("border-t bg-muted/40", className)} {...props} />;
}

export type TableRowProps = HTMLAttributes<HTMLTableRowElement> & {
  clickable?: boolean;
};

export function TableRow({ className, clickable = false, ...props }: TableRowProps) {
  return (
    <tr
      className={cn(
        "transition",
        clickable && "cursor-pointer hover:bg-muted/50",
        className
      )}
      {...props}
    />
  );
}

export type TableHeadProps = ThHTMLAttributes<HTMLTableCellElement>;

export function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <th
      className={cn(
        "px-5 py-4 text-left text-xs font-black uppercase tracking-[0.16em] text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>;

export function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td
      className={cn("px-5 py-4 text-sm font-medium text-foreground", className)}
      {...props}
    />
  );
}

export type EmptyTableStateProps = {
  title?: string;
  description?: string;
  colSpan: number;
};

export function EmptyTableState({
  title = "Kayıt bulunamadı",
  description = "Bu bölümde gösterilecek veri yok.",
  colSpan
}: EmptyTableStateProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="py-14 text-center">
        <p className="text-base font-black text-foreground">{title}</p>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </TableCell>
    </TableRow>
  );
}

export type DataTableColumn<TData> = {
  key: string;
  header: ReactNode;
  cell: (row: TData, index: number) => ReactNode;
  className?: string;
  headerClassName?: string;
};

export type DataTableProps<TData> = {
  data: TData[];
  columns: DataTableColumn<TData>[];
  rowKey?: (row: TData, index: number) => string;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
};

export function DataTable<TData>({
  data,
  columns,
  rowKey,
  emptyTitle,
  emptyDescription,
  className
}: DataTableProps<TData>) {
  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key} className={column.headerClassName}>
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.length === 0 ? (
          <EmptyTableState
  colSpan={columns.length}
  {...(emptyTitle ? { title: emptyTitle } : {})}
  {...(emptyDescription ? { description: emptyDescription } : {})}
/>
        ) : (
          data.map((row, index) => (
            <TableRow key={rowKey ? rowKey(row, index) : String(index)}>
              {columns.map((column) => (
                <TableCell key={column.key} className={column.className}>
                  {column.cell(row, index)}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}