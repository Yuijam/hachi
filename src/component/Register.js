import React, { Component } from 'react'
import 'antd/dist/antd.css';
import './css/Register.css'
import {
	Form,
	Input,
	// Cascader,
	// Select,
	// Row,
	// Col,
	// Checkbox,
	Button,
	// AutoComplete,
} from 'antd';
import md5 from 'md5'

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
				if (this.props.handleSubmit) {
					this.props.handleSubmit({ ...values, password: md5(values.password), registerTime: new Date().valueOf() })
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

	checkEmail = e => {
		this.checkExist('email', { 'email': e.target.value }, 'email is existed')
	};

	checkUsername = e => {
		this.checkExist('username', { 'username': e.target.value }, 'username is existed')
	}

	checkExist = async (field, json, errorMsg) => {
		console.log('checkExist', field, json)
		let res = await this.props.checkExist(json)
		console.log(res)
		if (res.status !== 0) {
			const { form } = this.props;
			if (form) {
				console.log('form is not null')
				form.setFields({ [field]: { value: Object.values(json)[0], errors: [new Error(errorMsg)] } })
			}
		}
	}

	componentDidMount(){
		this.props.setForm(this.props.form)
	}

	render() {
		const { getFieldDecorator } = this.props.form;

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
			<Form {...formItemLayout} onSubmit={this.handleSubmit} className='register-form' >
				<Form.Item label="E-mail" hasFeedback>
					{getFieldDecorator('email', {
						rules: [
							{
								type: 'email',
								message: 'The input is not valid E-mail!',
							},
							{
								required: true,
								message: 'Please input your E-mail!',
							}
						],
					})(<Input onBlur={this.checkEmail} />)}
				</Form.Item>
				<Form.Item label='Username' hasFeedback>
					{getFieldDecorator('username', {
						rules: [
							{
								required: true, message: 'Please input your username!',
								whitespace: true
							}
						],
					})(<Input onBlur={this.checkUsername} />)}
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