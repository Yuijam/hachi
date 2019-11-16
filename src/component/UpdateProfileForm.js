import {
  Form,
  Input,
  DatePicker,
  Radio,
} from 'antd';
import React, { Component } from 'react'
import moment from 'moment';
const { TextArea } = Input;
const dateFormat = 'YYYY/MM/DD'

class UpdateProfileForm extends Component {
  state = {genderValue:'Male'};

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      genderValue: e.target.value,
    });
  };

  componentDidMount(){
    this.props.setForm(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Gender">
          {
            getFieldDecorator('gender', {
              initialValue: 'Male',
            })(<Radio.Group onChange={this.onChange}>
              <Radio value={'Male'}>Male</Radio>
              <Radio value={'Female'}>Female</Radio>
              <Radio value={'Secret'}>Secret</Radio>
            </Radio.Group>)
          }
        </Form.Item>

        <Form.Item label={'Location'} >
          {
            getFieldDecorator('location', {
              initialValue: 'Tokyo',
            })(<Input />)
          }
        </Form.Item>

        <Form.Item label="Birthday">
          {
            getFieldDecorator('birthday', {
              initialValue: moment('1989/06/04', dateFormat),
            })(<DatePicker format={dateFormat} />)
          }
        </Form.Item>

        <Form.Item label="Description">
          {
            getFieldDecorator('description', {
              initialValue: 'ready to work',
            })(<TextArea rows={4} />)
          }
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'register' })(UpdateProfileForm);