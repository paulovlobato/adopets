import React, { Component } from "react";
import { Table, Form, Button } from "antd";
import { petsAPI } from "services/pet.service";
import Pet from "Interfaces/pet";
import { Sex } from "enums/sex.enum";
import { Status } from "enums/status.enum";
import { Age } from "enums/age.enum";
import { logout } from "services/auth.service";

class HomeComponent extends Component {
  state = {
    pagination: {},
    result: [],
    loading: false
  };

  getSex = (sexKey: string): string => {
    let c = Object.keys(Sex).find(
      e => e.toLowerCase() === sexKey.toLowerCase()
    );
    let sex = c ? Sex[sexKey].valueOf() : sexKey;
    return sex;
  };

  getStatus = (statusKey: string) => {
    let c = Object.keys(Status).find(
      e => e.toLowerCase() === statusKey.toLowerCase()
    );
    let status = c ? Status[statusKey].valueOf() : statusKey;
    return status;
  };

  getAge = (age_key: string): string => {
    let c = Object.keys(Age).find(
      e => e.toLowerCase() === age_key.toLowerCase()
    );
    let age = c ? Age[age_key].valueOf() : age_key;
    return age;
  };

  changeHandler = (pagination, filters) => {
    const pager = { ...this.state.pagination };
    pager["current"] = pagination.current;
    this.setState({ pagination: pager });

    let values = Object.values(filters).join();
    let header = Object.keys(filters)[0];
    let search = {};
    search[header] = values;
    console.log(search);
    if (search[header] == "") {
      search = "";
    }

    this.loadPets({
      page: pagination.current,
      search
    });
  };

  columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Age",
      dataIndex: "age_key",
      key: "age_key",
      render: age_key => this.getAge(age_key),
      filters: [
        {
          text: "Adult",
          value: "ADULT"
        },
        {
          text: "Senior",
          value: "SENIOR"
        },
        {
          text: "Young",
          value: "young"
        }
      ]
    },
    {
      title: "Sex",
      dataIndex: "sex_key",
      key: "sex_key",
      render: sex_key => this.getSex(sex_key),
      filters: [
        {
          text: "Male",
          value: "MALE"
        },
        {
          text: "Female",
          value: "FEMALE"
        }
      ]
    },
    {
      title: "Size",
      dataIndex: "size_key",
      key: "size_key",
      filters: [
        {
          text: "S",
          value: "S"
        },
        {
          text: "XS",
          value: "XS"
        },
        {
          text: "M",
          value: "M"
        },
        {
          text: "L",
          value: "L"
        },
        {
          text: "XL",
          value: "XL"
        }
      ]
    },
    {
      title: "Status",
      dataIndex: "status_key",
      key: "status_key",
      render: status_key => this.getStatus(status_key)
    }
  ];

  loadPets = async (params = {}) => {
    console.log("params: ", params);
    let res = await petsAPI.post("/search", {
      options: {
        limit: 10,
        ...params
      },
      search: params["search"]
    });

    console.log(res);

    const pagination = { ...this.state.pagination };
    pagination["total"] = res.data.data.count;
    let petList = res.data.data.result as Pet[];
    this.setState({ result: petList, loading: false, pagination: pagination });
  };

  logout = () => {
    logout();
  };

  render() {
    return (
      <div>
        <div>
          <Table
            dataSource={this.state.result}
            columns={this.columns}
            onChange={this.changeHandler}
            loading={this.state.loading}
            pagination={this.state.pagination}
            rowKey="id"
          />
        </div>

        <div>
          <Form onSubmit={this.logout} style={{ float: "right" }}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Logout
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.loadPets({});
  }
}

export const Home = Form.create()(HomeComponent);
