import React from 'react';
import { Table, Button } from 'antd';
// import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';

import DragableBodyRow from '../DragableBodyRow';

// let dragingIndex = -1;

// class BodyRow extends React.Component {
//     render() {
//         const {
//             isOver,
//             connectDragSource,
//             connectDropTarget,
//             moveRow,
//             ...restProps
//         }: any = this.props;
//         const style = { ...restProps.style, cursor: 'move' };

//         let className = restProps.className;
//         if (isOver) {
//             if (restProps.index > dragingIndex) {
//                 className += ' drop-over-downward';
//             }
//             if (restProps.index < dragingIndex) {
//                 className += ' drop-over-upward';
//             }
//         }

//         return connectDragSource(
//             connectDropTarget(
//                 <tr
//                 {...restProps}
//                 className={className}
//                 style={style}
//                 />
//             )
//         );
//     }
// }

// const rowSource = {
//     beginDrag(props: any) {
//         dragingIndex = props.index;
//         return {
//             index: props.index,
//         };
//     },
// };

// const rowTarget = {
//     drop(props: any, monitor: any) {
//         const dragIndex = monitor.getItem().index;
//         const hoverIndex = props.index;

//         // Don't replace items with themselves
//         if (dragIndex === hoverIndex) {
//             return;
//         }

//         // Time to actually perform the action
//         props.moveRow(dragIndex, hoverIndex);

//         // Note: we're mutating the monitor item here!
//         // Generally it's better to avoid mutations,
//         // but it's good here for the sake of performance
//         // to avoid expensive index searches.
//         monitor.getItem().index = hoverIndex;
//     },
// };

// const DragableBodyRow = DropTarget(
//     'row',
//     rowTarget,
//     (connect, monitor) => ({
//         connectDropTarget: connect.dropTarget(),
//         isOver: monitor.isOver(),
//     }),
// )(
//   DragSource(
//         'row',
//         rowSource,
//         (connect) => ({
//             connectDragSource: connect.dragSource(),
//         }),
//     )(BodyRow),
// );

const columns: any = [
    {
        title: 'Item',
        dataIndex: 'item',
        key: 'item',
    }, {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    }, {
        title: 'Currency',
        dataIndex: 'currency',
        key: 'currency',
    }
];

const data: any[] = [{
    id: 0,
    item: 'Flight',
    amount: 1432,
    currency: 'HKD'
}, {
    id: 1,
    item: 'Cooking class',
    amount: 800,
    currency: 'THB'
}];

interface IDataContainerState  {
    data: any[];
};

class DataContainer extends React.Component<{}, IDataContainerState> {
    state = {
        data: data
    }
    components = {
        body: {
          row: DragableBodyRow,
        },
    }
    moveRow = (dragIndex: any, hoverIndex: any) => {
        const { data } = this.state;
        const dragRow = data[dragIndex];
    
        this.setState(
          update(this.state, {
            data: {
              $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
            },
          }),
        );
    }
    handleAddRow = () => {
        const { data } = this.state;
        const row = {
            id: data.length > 0 ? data[data.length - 1].id + 1 : 0,
            item: `Item ${data.length + 1}`,
            amount: 0,
            currency: 'HKD'
        };
        this.setState({ data: data.concat(row) });
    }
    render() {
        const { data } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.handleAddRow}>New Row</Button>
                <Table
                    // size="small"
                    rowKey="id"
                    columns={columns}
                    dataSource={data}
                    components={this.components}
                    onRow={(record, index) => ({
                        index,
                        moveRow: this.moveRow,
                    })}
                />
                {/* <Input /> */}
            </div>
        )
    }
}

// export default DataContainer;
export default DragDropContext(HTML5Backend)(DataContainer);