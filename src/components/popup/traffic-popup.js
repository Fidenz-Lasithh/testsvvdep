import React, { Component } from 'react';
import { Modal, Form, Grid, Button, Header, Select, Divider, Table, Message } from 'semantic-ui-react';
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
      errors: {
        hasErrors: false,
        message: null
      }
    };
  }

  handleChange = (e, { value }) => {
    this.setState({param: value, errors: {hasErrors: false, message: null}});
  }

  handleDateChange = (name, date) => {
    this.setState({[name]: date, errors: {hasErrors: false, message: null}});
  };

  handleSubmit = () => {
    const { param, dateFrom, dateTo } = this.state;
    const { stationName } = this.props;
    const from = moment(dateFrom).valueOf();
    const to = moment(dateTo).valueOf();

    if (param && dateFrom && dateTo) {
      this.props.mapContainer.setModalParams(stationName, param, from, to);
    } else {
      this.setState({errors: {hasErrors: true, message: "All fields need to be filled to view data"}});
    }
  };

  // Date range 2017/01/01 to 2018/08/31
  render() {
    const { stationData, modalLoading, modalErrors } = this.props.mapContainer.state;
    const { dateFrom, dateTo, errors } = this.state;
    
    const dropdownOptions = [
      {
        key: 1, 
        text: 'Vehicle speed',
        value: '1'
      }
    ]

    // Render form to select data to view
    const renderForm = () => {
      return (
        <Form onSubmit={this.handleSubmit} error={errors.hasErrors || modalErrors.hasErrors}>
          <Header>Traffic data</Header>
          <Divider />
          <Message 
            error
            content={errors.message || modalErrors.message}
          />
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
                  isClearable={true}
                  maxDate={dateTo ? dateTo : moment()}
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
                  openToDate={dateFrom ? dateFrom : null}
                  todayButton={"Today"}
                  isClearable={true}
                  minDate={dateFrom ? dateFrom : null}
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

    // Function to assign colour code to heatmap
    const setColour = (data) => {
      if (data < 121 && data > 69) {
        return 'red';
      }
      else if (data < 70 && data > 39) {
        return 'orange';
      }
      else if (data < 40 && data > 9) {
        return 'yellow';
      }
      else if (data < 10 && data > -71) {
        return 'green';
      }
    }

    const isEmpty = (data) => {
      if (!data) {
        return '0';
      }
      return data;
    }

    // Render data set once it has been fetched 
    const renderData = () => {
      let tableHeaders = [];

      for (let n = 1; n < 25; n++) {
        tableHeaders.push(
          <Table.HeaderCell key={n}>
            {n < 10 ? `0${n}` : n}
          </Table.HeaderCell>
        );
      }

      const renderDataCell = stationData.map((data) => {
        let hourDataCell = [];
        for (let n = 0; n < 24; n++) {
          hourDataCell.push(
            <Table.Cell key={n} className={setColour(data.hours[n < 10 ? `0${n}` : n])}>
              {isEmpty(data.hours[n < 10 ? `0${n}` : n])}
            </Table.Cell>
        )}
        return (
          <Table.Row key={data.date}>
            <Table.Cell>{data.date}</Table.Cell>
              {hourDataCell}
          </Table.Row>
        );
      }); 
      
      return (
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              {tableHeaders}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {renderDataCell}
          </Table.Body>
        </Table>
      );
    };

    
    return (
      <Modal 
        open={this.props.mapContainer.state.modal} 
        closeIcon={true} 
        onClose={() => this.props.mapContainer.toggleModal()}
        size={stationData ? "fullscreen" : "small"}
        dimmer='blurring'
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