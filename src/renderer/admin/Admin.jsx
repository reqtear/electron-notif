import {
  Card,
  Modal,
  Alert,
  Space,
  Table,
  Tag,
  Input,
  Radio,
  Button,
} from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { auth, db, registerWithEmailAndPassword } from '../firebaseConfig';
// import { signOut } from "firebase/auth";
// import { getDatabase, ref, set, get, onValue, push, remove } from 'firebase/database';
import Sidebar from '../layout/Sidebar';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import apiClient from '../apiClient';
import io from 'socket.io-client';

export default function Main() {
  const defaultUserState = {
    name: '',
    email: '',
    role: 'atasan',
    password: '',
    c_password: '',
  };
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [formData, setFormData] = useState(defaultUserState);

  const [loading, setLoading] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState('');

  const showDeleteModal = (user_id) => {
    setCurrentUser(user_id);
    setIsDeleteModalOpen(true);
  };

  const showModalCreate = async () => {
    setFormData(defaultUserState);
    setIsModalCreateOpen(true);
  };

  const showModalUpdate = async (user_id) => {
    setCurrentUser(user_id);
    let user = userList.find((u) => u.id == user_id);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      password: '',
      c_password: '',
    });

    setIsModalUpdateOpen(true);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => {
        // console.log(record);
        return (
          <Space key={record.id} size="middle">
            <a
              key={record.id + '-edit'}
              className="mx-1 px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => showModalUpdate(record.id)}
            >
              <EditOutlined /> Edit
            </a>
            <a
              key={record.id + '-delete'}
              className="mx-1 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={() => showDeleteModal(record.id)}
            >
              <DeleteOutlined />
            </a>
          </Space>
        );
      },
    },
  ];

  const handleAddUser = async () => {
    setLoading(true);
    await apiClient
      .post('/users', formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        // console.error('Error creating user: ', error);
        alert('Error creating user: ' + error);
      });
    setLoading(false);
    setIsModalCreateOpen(false);
  };

  const handleUpdateUser = async () => {
    setLoading(true);
    let user = {};
    await apiClient
      .put('/users/' + currentUser, formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error('Error updating user: ', error);
      });
    setLoading(false);
    setIsModalUpdateOpen(false);
  };

  const handleDeleteUser = async () => {
    setLoading(true);
    let user = {};
    await apiClient
      .delete('/users/' + currentUser)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error('Error deleting user: ', error);
      });

    setLoading(false);
    setIsDeleteModalOpen(false);
  };

  const fetchData = async () => {
    await apiClient
      .get('/users')
      .then(function (response) {
        let items = [];
        console.log(response);
        response.data.data.map((u) => {
          items.push({
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role,
            createdAt: u.created_at,
          });
        });
        setUserList(items);
      })
      .catch(function (error) {
        console.error('Error fetching data: ', error);
      });
  };

  // const channel = window.Echo.channel('my-channel');
  // console.log(channel);
  // channel.listen('.user-change', function myEventHandler(data) {
  //   // alert(JSON.stringify(data));
  //   console.log(data);
  //   // fetchData();
  // });

  useEffect(() => {
    // localStorage.removeItem('session');
    //         localStorage.clear();
    console.log(localStorage.getItem('session'));
    fetchData();

    const socket = io('http://45.118.133.169:3000');

    // Listen for the "user-change" event
    socket.on('user-change', (message) => {
      fetchData();
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    // class="bg-cover bg-center ..." style="background-image: url(...)"
    <>
      {/* <Sidebar /> */}
      {/* <div className="w-full"> */}
      <h5 className="text-2xl font-medium mb-4">User List</h5>
      <button
        type="button"
        onClick={() => showModalCreate('create')}
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-3 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 float-end"
      >
        <PlusOutlined /> Add User
      </button>
      <Table columns={columns} dataSource={userList} loading={loadingTable} />
      {/* </div> */}

      <Modal
        title="Create User"
        open={isModalCreateOpen}
        onOk={handleAddUser}
        onCancel={() => setIsModalCreateOpen(false)}
        loading={loading}
      >
        <label>Nama Lengkap</label>
        <Input
          className="my-1"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <label>Email</label>
        <Input
          className="my-1"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <label>Password</label>
        <Input
          className="my-1"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <label>Konfirmasi Password</label>
        <Input
          className="my-1"
          placeholder="Confirm password"
          type="password"
          value={formData.c_password}
          onChange={(e) =>
            setFormData({ ...formData, c_password: e.target.value })
          }
        />
        <label>Level</label>
        <br />
        <Radio.Group
          className="my-1"
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          value={formData.role}
        >
          <Radio value={'operator'}>Operator</Radio>
          <Radio value={'supervisor'}>Supervisor</Radio>
        </Radio.Group>
      </Modal>

      <Modal
        title="Update User"
        open={isModalUpdateOpen}
        onOk={handleUpdateUser}
        onCancel={() => setIsModalUpdateOpen(false)}
        loading={loading}
      >
        <label>Nama Lengkap</label>
        <Input
          className="my-1"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <label>Email</label>
        <Input
          className="my-1"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <label>Level</label>
        <br />
        <Radio.Group
          className="my-1"
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          value={formData.role}
        >
          <Radio value={'operator'}>Operator</Radio>
          <Radio value={'supervisor'}>Supervisor</Radio>
        </Radio.Group>
      </Modal>

      <Modal
        title="Delete User"
        open={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        footer={[
          <Button key="back" onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="danger"
            loading={loading}
            onClick={handleDeleteUser}
          >
            Delete
          </Button>,
        ]}
      >
        <p>Are you sure?</p>
      </Modal>
    </>
  );
}

/*
    notif
id_pesan
id_pengirim (user_id) -OEU4Kha3XFcXJdikfYV
id_penerima (user_id) -OEU431qkJ3dTZxyghfS
isi abs
rejected = ""
ok = pending, approved, rejected
created_at
action_at Waktu membalas

*/
