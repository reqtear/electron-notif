import { Card, Modal, Alert, Space, Table, Tag, Input, Radio, Button } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { auth, db, registerWithEmailAndPassword } from '../firebaseConfig';
// import { signOut } from "firebase/auth";
// import { getDatabase, ref, set, get, onValue, push, remove } from 'firebase/database';
import Sidebar from '../layout/Sidebar';
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import axios from 'axios';

export default function Main() {
    const defaultUserState = {
        name: '',
        email: '',
        role: 'atasan',
        password: '',
        confirm_password: ''
    };
    const navigate = useNavigate();
    const [userList, setUserList] = useState([]);
    const [formData, setFormData] = useState(defaultUserState);

    const [loading, setLoading] = useState(false);
    const [loadingTable, setLoadingTable] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [currentUser, setCurrentUser] = useState('')

    const showDeleteModal = (user_id) => {
        setCurrentUser(user_id)
        setIsDeleteModalOpen(true);
    }

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
    };

    const showModal = async (method, user_id = '') => {
        if (method == 'create') {
            setFormData(defaultUserState);
        }
        else if(method == 'update'){
            setLoading(true);

            // const userRef = ref(db, `users/${user_id}`);
            // const user = await get(userRef);
            
            // if (user.exists()) {
            //     console.log(user.val());
            //     setFormData({
            //         name: '',
            //         email: '',
            //         role: 'atasan'
            //     })
            // } else {
            //     console.log("No data available for this key");
            //     return null;
            // }

            setLoading(false);
        }
        
        setIsModalOpen(true);
    };

    const handleUpdate = async () => {
        
    }

    const handleOk = async () => {
        if(formData.password != formData.confirm_password) {
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
    }

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
                console.log(record)
                return(
                    <Space key={record.id} size="middle">
                        <a key={record.id} className="mx-1 px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={() => showModal('edit', record.id)}><EditOutlined /> Edit</a>
                        <a key={record.id} className="mx-1 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            onClick={() => showDeleteModal(record.id)}><DeleteOutlined /></a>
                    </Space>
                )
            },
        },
    ];

    const logout = async () => {
        // try {
        //     await signOut(auth);
        //     navigate('/login')
        // } catch (error) {
        //     console.error(err);
        //     alert(err.message);
        // }
    };

    const handleAddUser = async () => {
        let user = {};
        try {
            user = await registerWithEmailAndPassword(
                formData.email,
                formData.password
            );
            
        } catch (err) {
            switch (err.code) {
                case 'auth/email-already-in-use':
                    alert('This email is already registered. Try logging in or use a different email.');
                    break;
                case 'auth/invalid-email':
                    alert('The email address is not valid.');
                    break;
                case 'auth/operation-not-allowed':
                    alert('Email/password accounts are not enabled.');
                    break;
                case 'auth/weak-password':
                    alert('The password is too weak. Please choose a stronger password.');
                    break;
                case 'auth/network-request-failed':
                    alert('Network error. Please check your internet connection.');
                    break;
                default:
                    alert(err.message || 'An unexpected error occurred during sign up.');
                    console.error('Signup error:', err);
            }
            setLoading(false);
            return;   
        }
        
        // const userRef = ref(db, 'users/');
        // const newUserRef = push(userRef);
    
        // await set(newUserRef, {
        //     uid: user.uid,
        //     name: formData.name,
        //     email: formData.email,
        //     role: formData.role,
        //     createdAt: new Date().toISOString(),
        // })
        // .catch((error) => {
        //     alert('Error adding user: '+error);
        //     setLoading(false);
        //     return;
        // });

        setLoading(false);
        setIsModalOpen(false);
    };

    const fetchData = () => {
        axios.get('http://devtesteam.site/api/users',
            {params :{ token: localStorage.getItem('session'), } }).then(function (response) {
            let items = []
            response.data.forEach(u => {
                items.push({
                    id: u.id,
                    name: u.name,
                    email: u.email,
                    role: u.role,
                    createdAt: u.created_at,
                })
            });
            setUserList(items);
        }).catch(function (error) { 
            console.error('Error fetching data: ', error);
        });
    }

    useEffect(() => {
        // localStorage.removeItem('session');
        //         localStorage.clear();
        console.log(localStorage.getItem('session'));
        fetchData();
        // if(!auth.currentUser){
        //     navigate('/login');
        // }

        // const usersRef = ref(db, 'users/');
        
        // Listen for real-time updates
        // const unsubscribe = onValue(usersRef, (snapshot) => {
        //     setLoadingTable(true);
        //     const data = snapshot.val();
            
        //     // Convert Firebase object to array
        //     const dataList = data 
        //     ? Object.keys(data).map(key => ({
        //         id: key,
        //         ...data[key]
        //         }))
        //     : [];

        //     console.log('user List', dataList)
            
        //     setUserList(dataList);

        //     setLoadingTable(false);
        // }, (error) => {
        //     console.error("Error reading data:", error);
        // });

        // Cleanup subscription on component unmount
        // return () => unsubscribe();
    }, [])

    return (
        // class="bg-cover bg-center ..." style="background-image: url(...)"
        <>
            {/* <Sidebar /> */}
            {/* <div className="w-full"> */}
                <h5 className="text-2xl font-medium mb-4">User List</h5>
                <button type="button" onClick={() => showModal('create')} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-3 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 float-end">
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

            <Modal title="Manage User" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} loading={loading}>
                <label>Nama Lengkap</label>
                <Input className="my-1" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                <label>Email</label>
                <Input className="my-1" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
                <label>Password</label>
                <Input className="my-1" placeholder="Password" type='password' value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
                <label>Konfirmasi Password</label>
                <Input className="my-1" placeholder="Confirm password" type='password' value={formData.confirm_password} onChange={(e) => setFormData({...formData, confirm_password: e.target.value})}/>
                <label>Level</label><br />
                <Radio.Group className="my-1" onChange={(e) => setFormData({...formData, role: e.target.value})} value={formData.role}>
                    <Radio value={'atasan'}>Atasan</Radio>
                    <Radio value={'bawahan'}>Bawahan</Radio>
                </Radio.Group>
            </Modal>

            <Modal title="Delete User" open={isDeleteModalOpen} onCancel={handleCancelDelete} footer={[
                <Button key="back" onClick={handleCancelDelete}>
                    Cancel
                </Button>,
                <Button key="submit" type="danger" loading={loading} onClick={handleDelete}>
                    Delete
                </Button>,
            ]}>
                <p>Are you sure?</p>
            </Modal>
        </>
    )
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