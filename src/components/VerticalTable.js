const VerticalTable = (props) => {
    const { title, tableData } = props;

    return (
        <>
            {title ? <div className="page-heading">
                <div className="title">
                    <h3>{title}</h3>
                </div>
            </div> : <></>}
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
        </>
    );
};

export const PwModalTable = (props) => {
    const { data } = props;

    return VerticalTable({ tableData: data });
};