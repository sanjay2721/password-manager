import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passRef = useRef()
    const [form, setForm] = useState({ site: '', username: '', password: '' })
    const [passwordArray, setPasswordArray] = useState([])
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        let passwords = localStorage.getItem('passwords');
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }

    }, []);

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        // alert("Password visibility toggled!")
        passRef.current.type = 'text';
        if (ref.current.src.includes('icons/eyecross.png')) {
            ref.current.src = 'icons/eye.png'
            passRef.current.type = 'text';
        } else {
            ref.current.src = 'icons/eyecross.png'
            passRef.current.type = 'password';
        }
    }

    const savePassword = () => {
        if (form.site === '' || form.username === '' || form.password === '') {
            toast('Please fill all fields!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }
        if (form.site.length < 5 || form.username.length < 3 || form.password.length < 6) {
            toast('Please enter valid details!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }
        if (editId) {
            const updatedArray = passwordArray.map(item =>
                item.id === editId ? { ...form, id: editId } : item
            );
            setPasswordArray(updatedArray);
            localStorage.setItem('passwords', JSON.stringify(updatedArray));
            setEditId(null);
            toast('Password Updated Successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
            localStorage.setItem('passwords', JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));

            toast('Password Saved Successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        setForm({ site: '', username: '', password: '' });
    }
    const deletePassword = (id) => {
        let confirmDelete = window.confirm("Are you sure you want to delete this password?");
        if (confirmDelete) {
            setPasswordArray(passwordArray.filter(item => item.id !== id));
            localStorage.setItem('passwords', JSON.stringify(passwordArray.filter(item => item.id !== id)));
        }
        toast('Password Deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    const editPassword = (id) => {
        const toEdit = passwordArray.find(item => item.id === id);
        setForm({ site: toEdit.site, username: toEdit.username, password: toEdit.password });
        setEditId(id);
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>
            <div className="mycontainer max-w-3xl mx-auto px-2 sm:px-4">
                <h1 className='text-3xl font-bold text-center'>
                    <span className="text-blue-500">&lt;</span>
                    <span>Pass</span>
                    <span className="text-blue-500">OP/&gt;</span>
                </h1>
                <p className='text-blue-500 text-lg text-center'>Your Own Password Manager</p>

                <div className="text-black flex flex-col p-4 gap-4 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-blue-400 w-full px-4 py-1 gap-8' type="text" name='site' />
                    <div className='flex flex-col sm:flex-row w-full justify-between gap-4 sm:gap:8'>
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-blue-400 w-full px-4 py-1' type="text" name='username' />
                        <div className="relative w-full">
                            <input ref={passRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-blue-400 w-full px-4 py-1' type="password" name='password' />
                            <span className="absolute right-[3px] top-[4px] cursor-pointer" onClick={showPassword}>
                                <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex items-center justify-center gap-2 bg-blue-100 text-black rounded-full px-6 py-2 hover:bg-blue-200 w-fit border border-blue-300'>
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover">
                        </lord-icon>
                        Save Password</button>
                </div>
                <div className="passwords overflow-x-auto">
                    <h2 className='text-2xl font-bold py-4'>Your passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to display</div>}
                    {passwordArray.length !== 0 && <table className="table-auto w-full min-w-[600px] sm:min-w-0 overflow-hidden rounded-md shadow-lg">
                        <thead className='bg-blue-500 text-white'>
                            <tr>
                                <th className='py-2'>Website</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-blue-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <span>{item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <span>{item.password}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}><lord-icon
                                            src="https://cdn.lordicon.com/gwlusjdu.json"
                                            trigger="hover"
                                            style={{ "width": "25px", "height": "25px" }}>
                                        </lord-icon></span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}><lord-icon
                                            src="https://cdn.lordicon.com/skkahier.json"
                                            trigger="hover"
                                            style={{ "width": "25px", "height": "25px" }}>
                                        </lord-icon></span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager
