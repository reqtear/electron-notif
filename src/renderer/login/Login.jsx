import { Card, Modal, Select, Spin, Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import {auth} from '../firebaseConfig';
// import { signInWithEmailAndPassword } from "firebase/auth";
import backGround from '../../../assets/bg-login.jpg'
import logoApp from '../../../assets/logo-app.png'
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

export default function Login() {

    const [formData, setFormData] = useState({  
        email: 'admin@gmail.com',
        password: 'admin123'
    });
    const [resp, setResp] = useState([]);
    // const { openMessage } = useMessage();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [devices, setDevices] = useState([]);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [deviceId, setDeviceId] = useState("");
    const [loading, setLoading] = useState(false);
    const [statusConnection, setStatusConnection] = useState(false);

    const onSubmit = () => {
        setButtonLoading(true);
        // logInWithEmailAndPassword(formData.email, formData.password);
        axios.post('http://devtesteam.site/api/login',
            {
                email: formData.email,
                password: formData.password
            }).then(function (response) {
            // console.log(response.data.data);
            if(response.data.success){
                const session = response.data.data
                const role = response.data.data.role
                // console.log(response.data.data.role);
                if(role == "admin"){
                    localStorage.setItem('session', session.token, 3600000);
                    console.log( localStorage.getItem('session') );
                    navigate('/admin');
                }else{
                    console.log("bukan admin tapi : " + role);
                }
            }
            setLoading(false);
            setButtonLoading(false)
        }).catch(function (error) { 
            // if(error.response.data.message == "Validation Error."){
            //     setStatusConnection(true);
            // }
            // alert()
            // console.log(error.message);
            alert(error.message)
            setLoading(false);
            setButtonLoading(false)
        });
    }

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        // 
    };
    const handleCancel = () => {
        
    };

    const onChange = (value) => {
        // setDeviceId(value);
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };

    // const onCobaAdmin = () => {
    //     navigate('/admin');
    // }

    window.Pusher = Pusher;

    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: '275cda7bf41eba251385',
        cluster: 'ap1',
        forceTLS: true
      });
      
    var channel = window.Echo.channel('my-channel');
    channel.listen('.my-event', function(data) {
    alert(JSON.stringify(data));
    });

    useEffect(() => {

    }, [])

    return (
        // class="bg-cover bg-center ..." style="background-image: url(...)"
        <div style={{ backgroundImage: `url(${backGround})` }} className="h-screen bg-cover" >
            {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
            <div className="flex min-h-full flex-1 flex-col px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-4">
                    <img
                        alt="Your Company"
                        src={logoApp}
                        className="mx-auto h-auto"
                        style={{ width: '110px'}}
                    />
                    <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Login Otorisasi
                    </h2>
                </div>
                <Card className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm xl:grid-cols-3 shadow-md">
                    <form action="#" method="POST" className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-0">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    onChange={e => setFormData((old) => ({ ...old, email: e.target.value }))}
                                    value={formData.email}
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    {/* <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a> */}
                                </div>
                            </div>
                            <div className="mt-0">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    onChange={e => setFormData((old) => ({ ...old, password: e.target.value }))}
                                    value={formData.password}
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            {!buttonLoading ?
                                <button
                                    type="button"
                                    onClick={onSubmit}
                                    className="flex w-full justify-center rounded-md bg-[#ffa408] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-[#fdb336] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button> :
                                <button
                                    type="button"
                                    disabled={true}
                                    className="flex w-full justify-center rounded-md bg-[#fed690] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-[#fed690] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Loading &nbsp; &nbsp; &nbsp; <Spin indicator={<LoadingOutlined spin />} />
                                </button>
                            }
                        </div>
                    </form>
                    {/* <button
                        type="button"
                        onClick={onCobaAdmin}
                        className="flex w-full justify-center rounded-md bg-[#ffa408] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-[#fdb336] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Admin
                    </button> */}
                </Card>
                {/* <Modal title="Pilih Router" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Spin spinning={loading} fullscreen />
                    <Select
                        style={{ width: "100%" }}
                        showSearch
                        placeholder="Device Router"
                        optionFilterProp="label"
                        onChange={onChange}
                        onSearch={onSearch}
                        options={devices}
                    />
                    {statusConnection &&
                        <Alert
                            message="Error Connecting"
                            description="Tidak terhubung ke router!"
                            type="error"
                            showIcon
                        />
                    }
                </Modal> */}
            </div>
        </div>
    )
}
