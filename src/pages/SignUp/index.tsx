import React, { Component, SyntheticEvent } from "react";
import { Form, Input, Button } from "antd";
import { Container, styles } from "./styles";
import { authAPI } from "services/auth.service";
import { withRouter } from "react-router-dom";

class SignUpComponent extends Component {
  constructor(props) {
    super(props);

    this.signUp = this.signUp.bind(this);
  }

  state = {
    confirmDirty: false
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props["form"];
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props["form"];
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  signUp = async (values: Object) => {
    let res = await authAPI.post("", {});
  };

  signUpHandler = async (event: SyntheticEvent) => {
    console.log("entered signUpHandler");

    event.preventDefault();

    this.props["form"].validateFieldsAndScroll((err, values) => {
      if (!err) {
        try {
          this.signUp(values);
        } catch (exception) {
          console.error(exception);
        }
      }
    });

    //   let {email, password} = this.state;

    //   if (!email || !password) {
    //     this.setState({error: 'Por favor, preencha todos os campos para continuar'})
    //   } else {
    //     try {
    //       console.log("entered try catch");
    //       let res = await authAPI.post("register", {email, password})
    //       console.log(res)
    //       this.props['history'].push('/')
    //     } catch (exception) {
    //       console.error(exception)
    //     }
    //   }
    // }
  };

  render() {
    const { getFieldDecorator } = this.props["form"];

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    return (
      <div className="App-header">
        <Container>
          <Form
            {...formItemLayout}
            onSubmit={this.signUpHandler}
            style={styles.form}
          >
            <Form.Item label="E-mail">
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
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Password" hasFeedback>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Please input your password!"
                  },
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="Confirm Password" hasFeedback>
              {getFieldDecorator("confirm", {
                rules: [
                  {
                    required: true,
                    message: "Please confirm your password!"
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              {/* <Checkbox>
                I have read the <a href="">agreement</a>
              </Checkbox> */}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Container>
      </div>
    );
  }
}

// adds withRouter methods to the form
const routeredForm = withRouter(SignUpComponent);

// adds getFieldDecorator and antd methods to the form
export const SignUp = Form.create()(routeredForm);
