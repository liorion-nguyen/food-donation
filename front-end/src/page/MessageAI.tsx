import { Box } from "@mui/material";
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../styleCSS/message.css'
import { useState } from "react";
import { format } from "date-fns";

export function MessageAI() {
    const [account, setAccount] = useState("64e706ccb7779188926854f1");
    const [contactAccount, setContactAcount] = useState({
        name: "Liorion",
        img: "https://liorion0708.000webhostapp.com/NTPTW/images/logo_0.png",
        list: [
            {
                author: "64e706ccb7779188926854f1",
                content: "Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.",
                time: "15:08:30 15-07-2023",
            },
            {
                author: "64e706ccb7779188926854f1",
                content: "Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.",
                time: "15:08:30 8-9-2023",
            },
            {
                author: "64e706ccb7779188926854f1",
                content: "You\nCum ea graeci tractatos.",
                time: "16:08:30 08-09-2023",
            },
            {
                author: "64e706ccb7779188926854f3",
                content: "Sed pulvinar, massa vitae interdum pulvinar, risus lectus porttitor magna, vitae commodo lectus mauris et velit. Proin ultricies placerat imperdiet. Morbi varius quam ac venenatis tempus.",
                time: "16:08:30 08-09-2023",
            },
            {
                author: "64e706ccb7779188926854f1",
                content: "Cras pulvinar, sapien id vehicula aliquet, diam velit elementum orci.",
                time: "15:08:30 15-10-2023",
            },
            {
                author: "64e706ccb7779188926854f3",
                content: "Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.",
                time: "15:08:30 15-10-2023",
            },
            {
                author: "64e706ccb7779188926854f1",
                content: "Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo",
                time: "15:08:30 15-10-2023",
            },
            {
                author: "64e706ccb7779188926854f3",
                content: "Cum ea graeci tractatos",
                time: "15:08:30 15-10-2023",
            }
        ]
    })
    const [inpMess, setInpMess] = useState("");

    const handlePickAccount = (id: string) => {
        setAccount(id);
    }
    const handleTime = (time: string) => {
        const moment = require('moment');
        const currentTime = moment();
        const targetTime = moment(time, 'HH:mm.SSS DD/MM/YYYY');
        const duration = moment.duration(currentTime.diff(targetTime));

        if (duration.asYears() >= 1) {
            return (`${Math.floor(duration.asYears())} years`);
        } else if (duration.asMonths() >= 1) {
            return (`${Math.floor(duration.asMonths())} months`);
        } else if (duration.asWeeks() >= 1) {
            return (`${Math.floor(duration.asWeeks())} weeks`);
        } else if (duration.asDays() >= 1) {
            return (`${Math.floor(duration.asDays())} days`);
        } else if (duration.asHours() >= 1) {
            return (`${Math.floor(duration.asHours())} hours`);
        } else if (duration.asMinutes() >= 1) {
            return (`${Math.floor(duration.asMinutes())} minutes`);
        } else {
            return ('Now');
        }
    }

    const handleSend = () => {
        const now = new Date();
        const formattedDate = format(now, "dd/MM/yyyy HH:mm:ss");
        const content = {
            author: "64e706ccb7779188926854f3",
            content: inpMess,
            time: formattedDate,
        }
        const updatedList = [...contactAccount.list, content];
        setContactAcount({ ...contactAccount, list: updatedList });
        setInpMess("")
    }
    return (
        <main className="content">
            <div className="p-0">
                <div className="card">
                    <div className="row g-0">
                        <div className="border-right col-12 col-lg-5 col-xl-3">
                            <div className="px-4 d-none d-md-block">
                                <div className="d-flex align-items-center">
                                    <div className="flex-grow-1">
                                        <input
                                            type="text"
                                            className="form-control my-3"
                                            placeholder="Search..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <a href="#" className="hover px-4 py-3 list-group-item list-group-item-action border-0"
                                style={{
                                    background: account === "64e706ccb7779188926854f1" ? '#cececd29' : '',
                                }}
                                onClick={() => handlePickAccount("64e706ccb7779188926854f1")}
                            >
                                <div className="d-flex align-items-start justify-content-space-around">
                                    <img
                                        src={contactAccount.img}
                                        className="rounded-circle mr-1"
                                        alt="Vanessa Tucker"
                                        width="40"
                                        height="40"
                                    />
                                    <div className="ml-3 flex-grow-1">
                                        ChatAI Liorion
                                        <div className="small">
                                            <span className="fas fa-circle chat-online"></span> Online
                                        </div>
                                    </div>
                                    <div className="badge bg-success float-right">5</div>
                                </div>
                            </a>
                            <a href="#" className="hover px-4 py-3 list-group-item list-group-item-action border-0"
                                style={{
                                    background: account === "64e706ccb7779188926854f2" ? '#cececd29' : '',
                                }}
                                onClick={() => handlePickAccount("64e706ccb7779188926854f2")}
                            >
                                <div className="d-flex align-items-start">
                                    <img
                                        src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                        className="rounded-circle mr-1"
                                        alt="William Harris"
                                        width="40"
                                        height="40"
                                    />
                                    <div className="flex-grow-1 ml-3">
                                        William Harris
                                        <div className="small">
                                            <span className="fas fa-circle chat-online"></span> Online
                                        </div>
                                    </div>
                                    <div className="badge bg-success float-right">2</div>
                                </div>
                            </a>
                            <a href="#" className="hover px-4 py-3 list-group-item list-group-item-action border-0"
                                style={{
                                    background: account === "64e706ccb7779188926854f3" ? '#cececd29' : '',
                                }}
                                onClick={() => handlePickAccount("64e706ccb7779188926854f3")}
                            >
                                <div className="d-flex align-items-start">
                                    <img
                                        src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                        className="rounded-circle mr-1"
                                        alt="Sharon Lessman"
                                        width="40"
                                        height="40"
                                    />
                                    <div className="flex-grow-1 ml-3">
                                        Sharon Lessman
                                        <div className="small">
                                            <span className="fas fa-circle chat-online"></span> Online
                                        </div>
                                    </div>
                                    <div className="badge bg-success float-right">2</div>
                                </div>
                            </a>

                            <hr className="d-block d-lg-none mt-1 mb-0" />
                        </div>
                        <div className="col-12 col-lg-7 col-xl-9">
                            <div className="py-2 px-4 border-bottom d-none d-lg-block">
                                <div className="d-flex align-items-center py-1">
                                    <div className="position-relative">
                                        <img
                                            src={contactAccount.img}
                                            className="rounded-circle mr-1"
                                            alt="Sharon Lessman"
                                            width="40"
                                            height="40"
                                        />
                                    </div>
                                    <div className="flex-grow-1 pl-3">
                                        <strong>{contactAccount.name}</strong>
                                        <div className="text-muted small">
                                            <em>Typing...</em>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="btn btn-primary btn-lg mr-1 px-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="feather feather-phone feather-lg"
                                            >
                                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                            </svg>
                                        </button>
                                        <button className="btn btn-info btn-lg mr-1 px-3 d-none d-md-inline-block">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="feather feather-video feather-lg"
                                            >
                                                <polygon points="23 7 16 12 23 17 23 7" />
                                                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                                            </svg>
                                        </button>
                                        <button className="btn btn-light border btn-lg px-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="feather feather-more-horizontal feather-lg"
                                            >
                                                <circle cx="12" cy="12" r="1" />
                                                <circle cx="19" cy="12" r="1" />
                                                <circle cx="5" cy="12" r="1" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="position-relative">
                                <div className="chat-messages p-4">
                                    {
                                        contactAccount.list.map((mess, index) => (
                                            <div className={`${mess.author === "64e706ccb7779188926854f1" ? "chat-message-right" : "chat-message-left"} mb-4`} key={index}>
                                                <div>
                                                    <img
                                                        src={mess.author === "64e706ccb7779188926854f1" ? contactAccount.img : "https://bootdey.com/img/Content/avatar/avatar1.png"}
                                                        className="rounded-circle mr-1"
                                                        alt="Chris Wood"
                                                        width="40"
                                                        height="40"
                                                    />
                                                    <div className="text-muted small text-nowrap mt-2">
                                                        {handleTime(mess.time || "")}
                                                    </div>
                                                </div>
                                                <div className={`${mess.author === "64e706ccb7779188926854f1" ? "mr-3" : "ml-3"} width70 flex-shrink-1 bg-light rounded py-2 px-3`}>
                                                    <div className={`${mess.author === "64e706ccb7779188926854f1" ? " chat-message-right" : " chat-message-left"} font-weight-bold mb-1`}>{mess.author === "64e706ccb7779188926854f1" ? "you" : "Sharon Lessman"}</div>
                                                    {mess.content}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="flex-grow-0 py-3 px-4 border-top">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Type your message"
                                        value={inpMess}
                                        onChange={(e) => {
                                            setInpMess(e.target.value)
                                        }}
                                    />
                                    <button className="btn btn-primary"
                                        onClick={handleSend}
                                    >Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}