import React, { Component } from 'react'
import 'antd/dist/antd.css';
import './css/Login.css'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import md5 from 'md5'
import {Link} from 'react-router-dom';

class Login extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.onLogin({...values, password:md5(values.password)})
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const {loading} = this.props
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>Remember me</Checkbox>)}
                    {/* <a className="login-form-forgot" href="#">
                        Forgot password
                    </a> */}
                    <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                        Log in
                </Button>
                    Or <Link to='/register'>register now!</Link>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm