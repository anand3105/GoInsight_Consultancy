"use client";

interface BlogComparisonTableProps {
  headers: string[];
  rows: string[][];
  highlightFirst?: boolean;
}

export default function BlogComparisonTable({
  headers,
  rows,
  highlightFirst = true,
}: BlogComparisonTableProps) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-brand-primary text-white">
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left font-semibold text-xs tracking-wider uppercase"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-t border-gray-100 ${
                rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50/50"
              }`}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`px-4 py-3 ${
                    cellIndex === 0 && highlightFirst
                      ? "font-medium text-brand-dark"
                      : "text-gray-600"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
