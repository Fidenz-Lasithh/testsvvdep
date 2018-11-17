import React, { Component } from 'react';
import { Modal, Form, Grid, Button, Header, Select, Divider, Table } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';

class trafficModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      param: '',
      dateFrom: '',
      dateTo: '',
    };
  }

  handleChange = (e, { value }) => {
    this.setState({ param: value });
  }

  handleDateChange = (name, date) => {
    this.setState({[name]: date});
  };

  handleSubmit = () => {
    const { param, dateFrom, dateTo } = this.state;
    const { stationName } = this.props;
    const from = moment(dateFrom).format('YYYY/MM/DD');
    const to = moment(dateTo).format('YYYY/MM/DD');

    this.props.mapContainer.setModalParams(stationName, param, from, to);
  }
  // Date range 2017/01/01 to 2018/08/31
  render() {
    const { stationData, modalLoading } = this.props.mapContainer.state;
    const { dateFrom, dateTo } = this.state;
    
    const dropdownOptions = [
      {
        key: 1, 
        text: 'Vehicle speed',
        value: '1'
      }
    ]

    const renderForm = () => {
      return (
        <Form onSubmit={this.handleSubmit}>
          <Header>Traffic data</Header>
          <Divider />
          <Grid columns={3}>
            <Grid.Column>
              <Form.Field 
                control={Select} 
                label='Data to view' 
                placeholder='Select data' 
                options={dropdownOptions} 
                onChange={this.handleChange} 
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>Date from</label>
                <DatePicker
                  dateFormat="DD/MM/YYYY"
                  selected={dateFrom === "" ? null : dateFrom}
                  onChange={(e) => this.handleDateChange('dateFrom', e)}
                  placeholderText={moment().subtract(28, "days").format('DD/MM/YYYY')}
                  maxDate={moment()}
                  />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>Date to</label>
                <DatePicker
                  dateFormat="DD/MM/YYYY"
                  selected={dateTo === "" ? null : dateTo}
                  onChange={(e) => this.handleDateChange('dateTo', e)}
                  placeholderText={moment().format('DD/MM/YYYY')}
                  todayButton={"Today"}
                  maxDate={moment()}
                />
              </Form.Field>
            </Grid.Column>
          </Grid>
          <Divider />
          <Button type="submit" disabled={modalLoading} loading={modalLoading} primary>View</Button>
        </Form>
      );
    };

    const renderData = () => {
      let tableHeaders = [];
      console.log(stationData);

      for (let n = 1; n < 25; n++) {
        tableHeaders.push(<Table.HeaderCell key={n}>{n}</Table.HeaderCell>);
      }

      const renderDataCell = () => {
        return stationData.map((data) => {
          return (
            <Table.Row>
              <Table.Cell>{data.id}</Table.Cell>
            </Table.Row>
          );
        });
      }; 
      
      const setColour = (data) => {
        if (data <= 100 && data >= 70) {
          return 'green';
        }
        else if (data <= 69 && data >= 40) {
          return 'yellow';
        }
        else if (data <= 39 && data >= 10) {
          return 'orange';
        }
        else if (data <= 9 && data >= -20) {
          return 'red';
        }
      }

      return (
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              {tableHeaders}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {/* {renderDataCell} */}
          </Table.Body>
        </Table>
      );
    };

    
    return (
      <Modal 
        open={this.props.mapContainer.state.modal} 
        closeIcon={true} 
        onClose={() => this.props.mapContainer.toggleModal()}
      >
        <Modal.Content>
          {stationData ? (
            renderData()
          ) : (
            renderForm()
          )}
        </Modal.Content>
      </Modal>
    );
  }
}

export default trafficModal;