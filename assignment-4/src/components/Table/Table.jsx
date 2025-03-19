import './Table.scss'
import Button from "@/components/Button";

export default function Table({id, data, columnHeaders, dataKeys, onActionClick}) {
    return (
        <table id={id} className="table">
            <thead>
            <tr>
                {columnHeaders.map((header, index) => (
                    <th key={index}>{header}</th>
                ))}
            </tr>
            </thead>

            <tbody>
            {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {dataKeys.map((key, index) => (
                        <td key={index}>
                            {row[key]}
                        </td>
                    ))}

                    {onActionClick && (
                        <td>
                            <Button onClick={() => onActionClick(row.productId)}>Order</Button>
                        </td>
                    )}
                </tr>
            ))}
            </tbody>
        </table>
    );
}