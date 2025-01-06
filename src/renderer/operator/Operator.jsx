import {
  Card,
  Modal,
  Select,
  Spin,
  Alert,
  Table,
  Input,
  Button,
  Flex,
  ConfigProvider,
} from 'antd';
import {
  LoadingOutlined,
  MessageOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditFilled,
} from '@ant-design/icons';
// import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import {auth} from '../firebaseConfig';
// import { signInWithEmailAndPassword } from "firebase/auth";
import backGround from '../../../assets/bg-login.jpg';
import logoApp from '../../../assets/logo-app.png';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import apiClient from '../apiClient';
// import { create } from 'node:domain';
import dayjs from 'dayjs';
import { useResponsive } from 'antd-style';
import io from 'socket.io-client';

export default function Operator() {
  const { xxl } = useResponsive();
  const [notificationsaList, setNotificationsList] = useState([]);
  const [formData, setFormData] = useState({
    tujuan: '',
    id_penerima: '',
    id_pengirim: localStorage.getItem('user_id'),
    status: 'pending',
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentId, setCurrentId] = useState('');

  const showModalCreate = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    handleSubmit();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    await apiClient
      .post('/notifications', formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error('Error creating notification: ', error);
      });
  };

  const [updateFormData, setUpdateFormData] = useState({
    tujuan: '',
    id_penerima: '',
    status: 'pending',
  });
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  const showModalUpdate = (record) => {
    setCurrentId(record.id);
    setUpdateFormData({
      tujuan: record.tujuan,
      id_penerima: record.id_penerima,
    });
    setIsUpdateModalVisible(true);
  };

  const handleUpdateOk = () => {
    setIsUpdateModalVisible(false);
  };

  const handleUpdateCancel = () => {
    setIsUpdateModalVisible(false);
  };

  const handleUpdateSubmit = async () => {
    await apiClient
      .put(`/notifications/${currentId}`, updateFormData)
      .then(function (response) {
        console.log(response);
        fetchData();
        setIsUpdateModalVisible(false);
      })
      .catch(function (error) {
        console.error('Error updating notification: ', error);
      });
  };

  const columns = [
    {
      title: 'Pesan',
      dataIndex: 'pesan_pendek',
      key: 'pesan_pendek',
    },
    {
      title: 'Supervisor',
      dataIndex: 'penerima',
      key: 'penerima',
    },
    {
      title: 'Tanggal',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Status',
      dataIndex: '',
      key: 'id',
      render: (record) => (
        <>
          {record.status == 'pending' && (
            <>
              <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                {record.status}
              </span>
              <ConfigProvider componentSize={xxl ? 'middle' : 'small'}>
                <Flex gap="small" wrap>
                  <Button
                    color="danger"
                    variant="solid"
                    onClick={() => handleDelete(record.id)}
                  >
                    <DeleteOutlined />
                  </Button>
                  <Button
                    color="primary"
                    variant="solid"
                    onClick={() => showModalUpdate(record)}
                  >
                    <EditFilled />
                  </Button>
                </Flex>
              </ConfigProvider>
            </>
          )}
          {record.status == 'approved' && (
            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-inset ring-green-600/20">
              {record.status}
            </span>
          )}
          {record.status == 'rejected' && (
            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-800 ring-1 ring-inset ring-red-600/20">
              {record.status}
            </span>
          )}
        </>
      ),
    },
  ];

  const handleDelete = async (id) => {
    await apiClient
      .delete(`/notifications/${id}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error('Error fetching data: ', error);
      });
  };

  const fetchData = async () => {
    await apiClient
      .get('/user/notifications')
      .then(function (response) {
        let items = [];
        console.log(response);
        response.data.data.map((n) => {
          items.push({
            pesan_pendek: n.tujuan.substring(0, 40) + ' ...',
            id: n.id,
            key: n.id,
            tujuan: n.tujuan,
            id_pengirim: n.id_pengiriman,
            id_penerima: n.id_penerima,
            penerima: n.email_penerima,
            pesan: n.pesan,
            action_at: n.action_at,
            created_at: dayjs(n.created_at).format('DD-MM-YYYY'),
            // created_at: n.created_at,
            updated_at: n.updated_at,
            status: n.status,
          });
        });
        setNotificationsList(items);
      })
      .catch(function (error) {
        console.error('Error fetching data: ', error);
      });
  };

  useEffect(() => {
    fetchData();
    // console.log(localStorage.getItem('session'));
    // if (localStorage.getItem('session')) {
    //   // navigate('/admin');
    // }

    const socket = io('http://45.118.133.169:3000');

    // Listen for the "notification-change" event
    socket.on('notification-change', (message) => {
      alert('notif change');
      fetchData();
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => showModalCreate('create')}
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-sm text-xs px-3 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 float-end"
      >
        <MessageOutlined /> Otorisasi
      </button>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                margin: 0,
              }}
            >
              {record.tujuan}
            </p>
          ),
          rowExpandable: (record) => record.tujuan !== 'Not Expandable',
        }}
        dataSource={notificationsaList}
      />
      <Modal
        title="Buat Request Otorisasi"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="form-group">
          <label htmlFor="pesan">Pesan</label>
          <Input
            type="text"
            className="form-control"
            value={formData.tujuan}
            onChange={(e) =>
              setFormData({ ...formData, tujuan: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="penerima">Penerima</label>
          <Input
            type="text"
            className="form-control"
            value={formData.id_penerima}
            onChange={(e) =>
              setFormData({ ...formData, id_penerima: e.target.value })
            }
            required
          />
        </div>
      </Modal>

      <Modal
        title="Update Notification"
        visible={isUpdateModalVisible}
        onOk={handleUpdateSubmit}
        onCancel={handleUpdateCancel}
      >
        <div className="form-group">
          <label htmlFor="updatePesan">Pesan</label>
          <Input
            type="text"
            className="form-control"
            value={updateFormData.tujuan}
            onChange={(e) =>
              setUpdateFormData({ ...updateFormData, tujuan: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="updatePenerima">Penerima</label>
          <Input
            type="text"
            className="form-control"
            value={updateFormData.id_penerima}
            onChange={(e) =>
              setUpdateFormData({
                ...updateFormData,
                penerima: e.target.value,
              })
            }
            required
          />
        </div>
      </Modal>
    </>
  );
}
