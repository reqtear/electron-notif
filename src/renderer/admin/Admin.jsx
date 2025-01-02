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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState('');

  const showDeleteModal = (user_id) => {
    setCurrentUser(user_id);
    setIsDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const showModal = async (method, user_id = '') => {
    if (method == 'create') {
      setFormData(defaultUserState);
    } else if (method == 'update') {
      setCurrentUser(user_id);
      let user = userList.find((u) => u.id == user_id);
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        password: '',
        c_password: '',
      });
    }

    setIsModalOpen(true);
  };

  const handleUpdate = async () => {};

  const handleOk = async () => {
    if (formData.password != formData.confirm_password) {
      alert('Password tidak sama.');
      return;
    }

    setLoading(true);

    await handleAddUser();
  };

  const handleDelete = async () => {
    setLoading(true);

    // const userRef = ref(db, `users/${currentUser}`);

    // try {
    //     await remove(userRef);
    // } catch (error) {
    //     alert('Delete user gagal.');
    // }

    setLoading(false);
    showDeleteModal(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
        console.log(record);
        return (
          <Space key={record.id} size="middle">
            <a
              key={record.id}
              className="mx-1 px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => showModal('edit', record.id)}
            >
              <EditOutlined /> Edit
            </a>
            <a
              key={record.id}
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
    let user = {};
    apiClient
      .post('http://devtesteam.site/api/users', formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error('Error creating user: ', error);
      });

    setLoading(false);
    setIsModalOpen(false);
  };

  const handleUpdateUser = async () => {
    let user = {};
    apiClient
      .put('http://devtesteam.site/api/users/user_id', formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error('Error creating user: ', error);
      });

    setLoading(false);
    setIsModalOpen(false);
  };

  const handleDeleteUser = async () => {
    let user = {};
    apiClient
      .delete('http://devtesteam.site/api/users/user_id')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error('Error creating user: ', error);
      });

    setLoading(false);
    setIsModalOpen(false);
  };

  const fetchData = () => {
    apiClient
      .get('http://devtesteam.site/api/users')
      .then(function (response) {
        let items = [];
        response.data.forEach((u) => {
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

  const channel = window.Echo.channel('my-channel');
  channel.listen('.user-change', function myEventHandler(data) {
    alert(JSON.stringify(data));
    fetchData();
  });

  useEffect(() => {
    // localStorage.removeItem('session');
    //         localStorage.clear();
    console.log(localStorage.getItem('session'));
    fetchData();
  }, []);

  return (
    // class="bg-cover bg-center ..." style="background-image: url(...)"
    <>
      {/* <Sidebar /> */}
      {/* <div className="w-full"> */}
      <h5 className="text-2xl font-medium mb-4">User List</h5>
      <button
        type="button"
        onClick={() => showModal('create')}
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-3 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 float-end"
      >
        <PlusOutlined /> Add User
      </button>
      <Table columns={columns} dataSource={userList} loading={loadingTable} />

      {/* </div> */}
      {/* <div className="h-screen bg-cover">
                <div className="flex min-h-full flex-1 flex-col px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-4">
                        <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                            User List
                        </h2>
                    </div>
                    <button type="button" onClick={() => showModal('create')}>
                        Add User
                    </button>
                    <Card className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm xl:grid-cols-3 shadow-md">
                        <Table columns={columns} dataSource={userList} loading={loadingTable} />
                    </Card>
                    <button type="button" onClick={logout}>
                        Logout
                    </button>
                </div>
            </div> */}

      <Modal
        title="Manage User"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
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
        title="Delete User"
        open={isDeleteModalOpen}
        onCancel={handleCancelDelete}
        footer={[
          <Button key="back" onClick={handleCancelDelete}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="danger"
            loading={loading}
            onClick={handleDelete}
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
