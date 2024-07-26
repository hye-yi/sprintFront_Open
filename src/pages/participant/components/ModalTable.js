export const ModalTable = (props) => {
    const { tableData } = props;

    return (
        <div className="tbl-wrap">
            <table className="tbl tbl-singleline" width="100%">
                <colgroup>
                    <col wdith="15%" />
                    <col wdith="" />
                </colgroup>
                <tbody>
                    {tableData?.map((item, i) => (
                        <tr key={i}>
                            <th>{item.head}<em className="essential">{item.required ? ` *` : ``}</em></th>
                            <td >{item.children}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};