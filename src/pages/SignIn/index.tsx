import React, { Component } from "react";
import { Form, Icon, Input, Button } from "antd";
import {
  authAPI,
  login,
  getAccessKey,
  isAuthenticated
} from "services/auth.service";
import { withRouter } from "react-router-dom";
import { Container, styles } from "./styles";
import Logo from "assets/Adopets-Logo.png";
import LoginObject from "Interfaces/login";

class SignInComponent extends Component {
  constructor(props) {
    super(props);

    this.signIn = this.signIn.bind(this);
  }

  state = {
    message: ""
  };

  signIn = async (loginData: LoginObject) => {
    let accessKey = getAccessKey();

    let res = await authAPI.post(
      "/session-register",
      {
        organization_user: {
          email: loginData.email,
          password: loginData.password
        }
      },
      {
        headers: {
          Authorization: `Bearer ${accessKey}`
        }
      }
    );

    if (res.data.code !== 200) {
      this.setState({ message: res.data.message });
      console.error(res.data.message);
    } else {
      console.info("Login successful");
      // bearer token
      login(res.data.data.access_key);
      this.props["history"].replace("/home");
    }
  };

  signInHandler = async event => {
    event.preventDefault();
    this.props["form"].validateFields((err, values) => {
      if (!err) {
        try {
          let loginData = values as LoginObject;
          this.signIn(loginData);
        } catch (exception) {
          console.error(exception);
        }
      }
    });
  };

  componentDidMount() {
    // Prevents user from going back to loggin screen after logged in
    if (isAuthenticated()) {
      this.props["history"].replace("/home");
    }
  }

  render() {
    const { getFieldDecorator } = this.props["form"];
    return (
      <div className="App-header">
        <Container>
          <Form
            className="login-form"
            onSubmit={this.signInHandler}
            style={styles.form}
          >
            <img src={Logo} alt="adopets_logo" style={styles.img} />
            <Form.Item>
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "Is not a valid e-mail!"
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="E-mail"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              {/* Or <Link to="/signup">Register now</Link> */}
            </Form.Item>
            {this.state.message && (
              <p style={{ color: "red" }}>{this.state.message}</p>
            )}
          </Form>
        </Container>
      </div>
    );
  }
}

// adds withRouter methods to the form
const routeredForm = withRouter(SignInComponent);

// adds getFieldDecorator and antd methods to the form
export const SignIn = Form.create()(routeredForm);
