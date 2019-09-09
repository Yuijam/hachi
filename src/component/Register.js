import React, { Component } from 'react'
import 'antd/dist/antd.css';
import './css/Register.css'
import {
    Form,
    Input,
    Tooltip,
    Icon,
    // Cascader,
    Select,
    // Row,
    // Col,
    // Checkbox,
    Button,
    AutoComplete,
} from 'antd';


// const { Option } = Select;
// const AutoCompleteOption = AutoComplete.Option;

// const residences = [
//     {
//       value: 'zhejiang',
//       label: 'Zhejiang',
//       children: [
//         {
//           value: 'hangzhou',
//           label: 'Hangzhou',
//           children: [
//             {
//               value: 'xihu',
//               label: 'West Lake',
//             },
//           ],
//         },
//       ],
//     },
//     {
//       value: 'jiangsu',
//       label: 'Jiangsu',
//       children: [
//         {
//           value: 'nanjing',
//           label: 'Nanjing',
//           children: [
//             {
//               value: 'zhonghuamen',
//               label: 'Zhong Hua Men',
//             },
//           ],
//         },
//       ],
//     },
//   ];

class Register extends Component {

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                if (this.props.handleSubmit){
                    this.props.handleSubmit(values)
                }
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    handleWebsiteChange = value => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    };

    render() {
        // return (

        //     <div className='register-body'>
        //         <form className='main' onSubmit={this.onRegister}>
        //             <p>Register</p>
        //             username:<input type='text' name='username' onChange={this.handleUsernameChange} /> <br /><br />
        //             <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>email:<input type='email' name='email' onChange={this.handleEmailChange} /> <br /><br />
        //             password:<input type='password' name='psw' onChange={this.handlePasswordChange} /> <br /><br />
        //             <button type='submit'>Register</button>
        //             <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        //             <button onClick={this.onClose}>Close</button>
        //         </form>
        //     </div>
        // );
        const { getFieldDecorator } = this.props.form;
        // const { autoCompleteResult } = this.state;

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
        const tailFormItemLayout = {
        wrapperCol: {
            xs: {
            span: 24,
            offset: 0,
            },
            sm: {
            span: 16,
            offset: 8,
            },
        },
        };
    // const prefixSelector = getFieldDecorator('prefix', {
    //   initialValue: '86',
    // })(
    //   <Select style={{ width: 70 }}>
    //     <Option value="86">+86</Option>
    //     <Option value="87">+87</Option>
    //   </Select>,
    // );

    // const websiteOptions = autoCompleteResult.map(website => (
    //   <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    // ));
        return (
            
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className='register-form'>
              <Form.Item label="E-mail">
                {getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Password" hasFeedback>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                    {
                      validator: this.validateToNextPassword,
                    },
                  ],
                })(<Input.Password />)}
              </Form.Item>
              <Form.Item label="Confirm Password" hasFeedback>
                {getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    {
                      validator: this.compareToFirstPassword,
                    },
                  ],
                })(<Input.Password onBlur={this.handleConfirmBlur} />)}
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    Nickname&nbsp;
                    <Tooltip title="What do you want others to call you?">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
              >
                {getFieldDecorator('nickname', {
                  rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                })(<Input />)}
              </Form.Item>
              {/* <Form.Item label="Habitual Residence">
                {getFieldDecorator('residence', {
                  initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                  rules: [
                    { type: 'array', required: true, message: 'Please select your habitual residence!' },
                  ],
                })(<Cascader options={residences} />)}
              </Form.Item>
              <Form.Item label="Phone Number">
                {getFieldDecorator('phone', {
                  rules: [{ required: true, message: 'Please input your phone number!' }],
                })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
              </Form.Item>
              <Form.Item label="Website">
                {getFieldDecorator('website', {
                  rules: [{ required: true, message: 'Please input website!' }],
                })(
                  <AutoComplete
                    dataSource={websiteOptions}
                    onChange={this.handleWebsiteChange}
                    placeholder="website"
                  >
                    <Input />
                  </AutoComplete>,
                )}
              </Form.Item>
              <Form.Item label="Captcha" extra="We must make sure that your are a human.">
                <Row gutter={8}>
                  <Col span={12}>
                    {getFieldDecorator('captcha', {
                      rules: [{ required: true, message: 'Please input the captcha you got!' }],
                    })(<Input />)}
                  </Col>
                  <Col span={12}>
                    <Button>Get captcha</Button>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                {getFieldDecorator('agreement', {
                  valuePropName: 'checked',
                })(
                  <Checkbox>
                    I have read the <a href="">agreement</a>
                  </Checkbox>,
                )}
              </Form.Item> */}
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          );
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(Register);

export default WrappedRegistrationForm