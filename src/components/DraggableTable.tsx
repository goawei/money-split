import React from 'react';
import { Table, Button, Card, Input, InputNumber, Radio, Icon } from 'antd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DragableBodyRow from './DragableBodyRow';
// import update from 'immutability-helper';
const RadioGroup = Radio.Group;


const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

interface IDraggableTableProps {
    // columns: any[];
    data: any[];
    moveRow: any;
    handleAddRow: any;
    title: string;
    handleUpdateData: any;
    handleDeleteRow: any;
}

interface IDraggableTableState  {
    // data: any[];
    isEdit: boolean;
};

class DraggableTable extends React.Component<IDraggableTableProps, IDraggableTableState> {
    state = {
        isEdit: false,
    };
    toggleEdit = () => {
        this.setState({ isEdit: !this.state.isEdit });
    }
    components = {
        body: {
          row: DragableBodyRow,
        },
    }
    render() {
        const { isEdit } = this.state;
        const { data, moveRow, handleAddRow, title, handleUpdateData, handleDeleteRow } = this.props;
        const columns: any = [
            {
                title: 'Item',
                dataIndex: 'item',
                key: 'item',
                width: '30%',
                render: (val: any, row: any) => isEdit ? <Input onChange={(e: any) => { handleUpdateData(row.id, "item", e.currentTarget.value) }} value={val} /> : val
            }, {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',
                width: '25%',
                render: (val: any, row: any) => isEdit ? <InputNumber onChange={(e: any) => { handleUpdateData(row.id, "amount", e) }} value={val} />: val
            }, {
                title: 'Currency',
                dataIndex: 'currency',
                key: 'currency',
                width: '25%',
                render: (val: any, row: any) => isEdit ? (
                    <RadioGroup onChange={(e: any) => { handleUpdateData(row.id, "currency", e.target.value) }} value={val}>
                        <Radio style={radioStyle} value="HKD">HKD</Radio>
                        <Radio style={radioStyle} value="THB">THB</Radio>
                    </RadioGroup>
                ) : val
            }, {
                title: 'Delete',
                dataIndex: 'delete',
                key: 'delete',
                width: '20%',
                render: (val: any, row: any) => <Button type="danger" onClick={() => { handleDeleteRow(row.id) }}><Icon type="delete" /></Button>
            }
        ];
        return (
            <Card
                title={title}
                extra={
                    <div>
                        <Button style={{ marginRight: '12px' }} onClick={this.toggleEdit}>{isEdit ? "Save" : "Edit"}</Button>
                        <Button type="primary" onClick={handleAddRow}>New Row</Button>
                    </div>
                }
            >
                <Table
                    size="small"
                    bordered={true}
                    rowKey="id"
                    columns={columns}
                    dataSource={data}
                    components={this.components}
                    onRow={(record, index) => ({
                        index,
                        moveRow: moveRow,
                    })}
                    pagination={false}
                />
                {/* <Input /> */}
            </Card>
        )
    }
}

// export default DataContainer;
export default DragDropContext(HTML5Backend)(DraggableTable);