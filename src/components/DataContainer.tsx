import React from 'react';
import { Row, Col, Card, Table, Input, InputNumber, Button } from 'antd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import DraggableTable from './DraggableTable';

const columns: any = [
    {
        title: 'Person',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: 'HKD',
        dataIndex: 'HKD',
        key: 'HKD',
    }, {
        title: 'Baht',
        dataIndex: 'THB',
        key: 'THB',
    }, {
        title: 'HKD Total',
        dataIndex: 'total',
        key: 'total',
    }, {
        title: 'Owe',
        dataIndex: 'owe',
        key: 'owe',
        render: (val: any) => <span style={{ color: val > 0 ? "red" : "black" }}>{`${val}HKD`}</span>
    }
];

const defaultData: dataProps[] = [{
    id: 0,
    item: 'Flight',
    amount: 1432,
    currency: 'HKD'
}, {
    id: 1,
    item: 'Cooking class',
    amount: 1800,
    currency: 'THB'
}];

type dataProps = {
    id: number;
    item: string;
    amount: number;
    currency: string;
};

interface IDataContainerState  {
    data1: dataProps[];
    data2: dataProps[];
    exchangeRate: number;
    name1: string;
    name2: string;
    isWideView: boolean;
};

class DataContainer extends React.Component<{}, IDataContainerState> {
    state = {
        data1: [] as dataProps[],
        data2: [] as dataProps[],
        exchangeRate: 4,
        name1: "Person 1",
        name2: "Person 2",
        isWideView: false
    }
    componentDidMount() {
        const moneySplit: any = localStorage.getItem('moneySplit');
        // console.log(JSON.parse(moneySplit));
        this.setState(JSON.parse(moneySplit));
    }

    moveRow1 = (dragIndex: any, hoverIndex: any) => {
        const { data1 } = this.state;
        const dragRow = data1[dragIndex];
    
        this.setState(
          update(this.state, {
            data1: {
              $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
            },
          }),
        );
    }
    moveRow2 = (dragIndex: any, hoverIndex: any) => {
        const { data2 } = this.state;
        const dragRow = data2[dragIndex];
    
        this.setState(
          update(this.state, {
            data2: {
              $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
            },
          }),
        );
    }
    handleAddRow1 = () => {
        const { data1 } = this.state;
        const id = data1.map((row: dataProps) => row.id).reduce((a: any, b: any) => b >= a ? b : a, 0) + 1;
        const row: dataProps[] = [{
            id,
            item: `Item ${data1.length + 1}`,
            amount: 0,
            currency: 'HKD'
        }];
        this.setState({ data1: data1.concat(row) });
    }
    handleAddRow2 = () => {
        const { data2 } = this.state;
        const id = data2.map((row: dataProps) => row.id).reduce((a: any, b: any) => b >= a ? b : a, 0) + 1;
        const row: dataProps[] = [{
            id,
            item: `Item ${data2.length + 1}`,
            amount: 0,
            currency: 'HKD'
        }];
        this.setState({ data2: data2.concat(row) });
    }
    handleDeleteRow1 = (id: number) => {
        const { data1 } = this.state;
        this.setState({ data1: data1.filter((row: any) => row.id !== id) })
    }
    handleDeleteRow2 = (id: number) => {
        const { data2 } = this.state;
        this.setState({ data2: data2.filter((row: any) => row.id !== id) })
    }

    getCalculationData = () => {
        const { data1, data2, exchangeRate, name1, name2 } = this.state;
        let person1: any = { name: name1, HKD: 0, THB: 0, total: 0, owe: 0 };
        let person2: any = { name: name2, HKD: 0, THB: 0, total: 0, owe: 0 };
        data1.forEach((spending: dataProps) => {
            person1[spending.currency] += spending.amount;
            person1.total += spending.currency === "HKD" ? spending.amount : Math.round(spending.amount*100/exchangeRate)/100;
        });
        data2.forEach((spending: dataProps) => {
            person2[spending.currency] += spending.amount;
            person2.total += spending.currency === "HKD" ? spending.amount : Math.round(spending.amount*100/exchangeRate)/100;
        });
        let total: number = person1.total + person2.total;
        let each: number = Math.round(total*50)/100;
        person1.owe = total/2 - person1.total;
        person2.owe = total/2 - person2.total;
        // return [person1, person2];
        return {
            tableData: [person1, person2],
            total,
            each
        };
    }

    handleUpdateData1 = (id: number, dataType: string, value: any) => {
        const { data1 } = this.state;
        const newData = data1.map((item: any) => item.id === id ? { ...item, [dataType]: value } : item);
        this.setState({ data1: newData });
    }
    handleUpdateData2 = (id: number, dataType: string, value: any) => {
        const { data2 } = this.state;
        const newData = data2.map((item: any) => item.id === id ? { ...item, [dataType]: value } : item);
        this.setState({ data2: newData });
    }
    updateExchangeRate = (exchangeRate: any) => {
        this.setState({ exchangeRate });
    }
    handleUpdateName1 = (e: any) => {
        this.setState({ name1: e.target.value });
    }
    handleUpdateName2 = (e: any) => {
        this.setState({ name2: e.target.value });
    }

    handleSaveData = () => {
        const { data1, data2, name1, name2, exchangeRate } = this.state;
        const moneySplit = { data1, data2, name1, name2, exchangeRate };
        localStorage.setItem("moneySplit", JSON.stringify(moneySplit));
    }
    toggleView = () => {
        this.setState({ isWideView: !this.state.isWideView });
    }

    render() {
        const { data1, data2, exchangeRate, name1, name2, isWideView } = this.state;
        const calculationData = this.getCalculationData();
        console.log(calculationData);
        return (
            <React.Fragment>
                <Card 
                    title={
                        <div>
                            <Button type="primary" onClick={this.handleSaveData}>Save Data</Button>
                            <Button style={{ marginLeft: '12px' }} onClick={this.toggleView}>Toggle View</Button>
                        </div>
                    }
                >
                    <Row gutter={16}>
                        <Col md={24}>
                            Person 1 Name: <Input value={name1} onChange={this.handleUpdateName1} />
                            Person 2 Name: <Input value={name2} onChange={this.handleUpdateName2} />
                        </Col>
                        {/* <Col md={12}>
                            Currency 1: <Input value={name1} onChange={this.handleUpdateName1} />
                            Currency 2: <Input value={name2} onChange={this.handleUpdateName2} />
                        </Col> */}
                    </Row>
                </Card>
            <Row gutter={16}>
                <Col md={isWideView ? 24 : 12} style={{ marginTop: '20px' }}>
                    <DraggableTable 
                        title={name1}
                        // columns={columns}
                        data={data1}
                        moveRow={this.moveRow1}
                        handleAddRow={this.handleAddRow1}
                        handleUpdateData={this.handleUpdateData1}
                        handleDeleteRow={this.handleDeleteRow1}
                    />
                </Col>
                <Col md={isWideView ? 24 : 12} style={{ marginTop: '20px' }}>
                    <DraggableTable 
                        title={name2}
                        // columns={columns}
                        data={data2}
                        moveRow={this.moveRow2}
                        handleAddRow={this.handleAddRow2}
                        handleUpdateData={this.handleUpdateData2}
                        handleDeleteRow={this.handleDeleteRow2}
                    />
                </Col>
                
                <Col span={24}>
                    <Card title={`Total: ${calculationData.total} HKD (each: ${calculationData.each} HKD)`} style={{ marginTop: '20px' }}>
                        <p>Currency Conversion HKD:Baht</p>
                        <InputNumber 
                            value={exchangeRate}
                            placeholder="4.00"  
                            style={{ width: '25%' }}
                            onChange={this.updateExchangeRate}
                        /><br /><br />
                        <Table 
                            rowKey="name"
                            bordered={true}
                            size="small"
                            dataSource={calculationData.tableData}
                            columns={columns}
                            pagination={false}
                        />
                    </Card>
                </Col>
            </Row>
            </React.Fragment>
        )
    }
}

// export default DataContainer;
export default DragDropContext(HTML5Backend)(DataContainer);