import { useState } from "react"
import Addchat from "./Addchat"
import Settings from "./Settings"
import UserChat from "./UserChat"
import Intro from "./Intro"
import Chatbot from "./Chatbot"
import UserProfile from "./UserProfile"
import { Link, useLocation } from "react-router-dom"

let id = 0

export default function Main() {
    const location = useLocation()
    const data = location.state
    const [toggle, setToggle] = useState("off")
    const [press, setPress] = useState("")
    const [question, setQuestion] = useState("")
    const [arr, setArr] = useState([])
    const [state, setState] = useState(false)
    const [ans, setAns] = useState("")
    const [email, getEmail] = useState(data.email)
    

    const getAPI = async () => {
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }
        let bodyContent = JSON.stringify({
            "ques": question
        });
       
        let response = await fetch("http://127.0.0.1:5000/question", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        let data = await response.text();
        let bodyContent1=JSON.stringify({
            "email":email,
            "question":question,
            "answer":data,
            "date":Date
        })
        let data2 = await fetch('http://localhost:9000/quesans',{
            method:'POST',
            body:bodyContent1,
            headers:headersList
        })
        let res = await data2.text()
        console.log(res)
        setAns(data)
    }


    const handleChange = (e) => {
        setQuestion(e.target.value)
        setPress(e.target.value)
    }

    const handleClick = () => {
        setArr([...arr, { id: id++, ques: question }])
        setState(true)
        getAPI()
        setQuestion("")
        // var ele = document.getElementById('chatbox')
        // ele.scrollTop = ele.scrollHeight
    }

    const changeToggle = () => {
        if (toggle == "off") {
            setToggle("on")
        }
        else {
            setToggle("off")
        }
    }

    return (
        <>
            <div className="w-full bg-gray-50 h-screen">
                {
                    toggle == "on" ?
                        <div className="fixed top-[0px] left-[0px] w-[200px] cursor-pointer bg-gray-600 h-screen transition-[width] duration-700 z-10">
                            <div className="relative left-[10px] top-[10px]" onClick={() => changeToggle()}>
                                <div className="mb-[3px] w-[25px] h-[5px] bg-yellow-400"></div>
                                <div className="mb-[3px] w-[25px] h-[5px] bg-yellow-400"></div>
                                <div className=" w-[25px] h-[5px] bg-yellow-400"></div>

                            </div>
                            {/* <Addchat toggle={toggle} email={data.email}></Addchat> */}
                            <div className="relative top-[115px] left-[10px] h-[80px]">
                              <Link to='/history' state={{email:data.email}}>History</Link>
                            </div>
                            
                            <Settings toggle={toggle}></Settings>
                        </div> :
                        <div className="fixed top-[0px] left-[0px] w-[65px] cursor-pointer bg-gray-600 h-screen transition-[width] duration-700 z-10">
                            <div className="relative left-[10px] top-[10px]" onClick={() => changeToggle()}>
                                <div className="mb-[3px] w-[25px] h-[5px] bg-yellow-400"></div>
                                <div className="mb-[3px] w-[25px] h-[5px] bg-yellow-400"></div>
                                <div className=" w-[25px] h-[5px] bg-yellow-400"></div>
                            </div>
                            <div className="relative top-[115px] left-[10px] h-[80px]">
                              <Link to='/history' state={{email:data.email}}>
                              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEWUlEQVR4nO1aSY8VVRT+EBDsGAYhTMJOEsCd/wAIY2ToRFcOiUCEMCxsaLrufQ+KFQtgywb1T0ggTURtcCGDGiKDrYASMAiBuAEiYz5ybp2qLniv3lDvvtfV0ZNUutL31jn3q3Pq3HO++4D/gtDgBA3OYqQLLShXQ3MDTKbFGlocoMFRGvxOi39o8ZgGj9y9wSAtjuictQzxRiGAcBvGsYQPaNBPi6fx/IYvg2c0+JoWH/MzvNZxIAwxniX00OCv1MIe0uA7Gux2b9tgnvPSpxjrLrkvY74bs9hFg29o8G/q+Vs02MkQXR0BQosVtLicWsA5GmyUhTatP8QEBviEFqdSXromIdo2IM4LBgdTAM4zwEoCo7zYKmERDU6nAH3pzTuJ0hDTaHEmCSGLXoYY48VI2l6IV2ixiQb3Em/3YlbriofefhxKV2nxjpdV17JrMM95PLL5J8uY25rCFzPML7R4M6+Opp8L8bpmNHn+BkuY06yOikU0kEa/9w1ERFKy25TjMMubopvYE07W05FrAXCemUSDC/rCPsdwSatARNz+Y3Ffda3CSAUiQovN6pU/Ggoxt+HtwAwUDcj7GC0FrILZXv/jsrhLgwfcidmtGvcJRIQGSxTITdmgkSW02KATf4An8QlEJNn9DT5EltDi27qThh/IetV5LDvNSe8gVx8mFhZIHyZqmfRU1lw5weA9NXrcl9F2ABFx7UKkt7JKpsFeDas9KD6Q3brW/dUGj6rR7sIDsehWvYerDf7mBsuYPwI8skA9Mlht8LYOTvdocHGqsFzsTW+IqarzTuVglAkohII3g1H/EgO54k3vNoyLm7zKwYiykW7wVS/GdmCGpvMYyHUfeusDkdJEBgNMgR8QvyqAJwKCAZa3qrex0IoItZY/9hdAyF+PBWgsLOPt7I89YgDFI6uRUyRRpJqgQS/EQa30a/BVtcED+hZ3oaCeiIUWoQLZV2uTOV5UT8RCi4HM6BFC2RViQmOGmIACeiJV3GYXjW7SEP2yruqEas9YbO0UiJd6pn5kiWPFo0WdypxU7TmDLZ0AIZIwnjUbq4jfvakTF6JgQotl+qL/rktA0KJPgZwVLhYFEQovHLe5JfQ08kCXUvsCZiMKIhz6Fq82zDjqEZoAuSeEcttX2chObvBAU+67zT0s5xPxOYjHHj5nur2oazmUR0GXI44jBQNtPeOrzbOd1DX8nJ/E7sUsdz6hXJePyrhJ8vpEQpNazGxNYRlzU2Au+G6FM1tZg0sJiABv+VEceSYOM2HFN7cjNVP4XclO8Yct4dSqJzLi9YvUmciPwsV60x9gKQ1+Suk/1O6z91Uas7HBM47GzJHZNCNtSB200u0TzabYvKJHYtuTcublHwxISyC5P8AU4QDcJfdRZ9etcwYSwiNm2EvoGY7sGNVmAT4SQjnXTziitqFfCsCaxwSdFA2TNdK1CQOoPYqctTxShuau/u+wmxNg9XButP8L2izPASJKgmhqY8T9AAAAAElFTkSuQmCC" className="h-[35px] w-[35px]"/>
                              </Link>
                            </div>
                            <Settings toggle={toggle}></Settings>
                        </div>
                }


                {
                    press == "" ?
                        <div className="">
                            <input type="text" id="search" placeholder="Enter a prompt here" className="fixed left-[205px] bottom-[15px] z-10 rounded-full border-zinc-700 border-2 p-[2px] text-slate-950 placeholder:text-slate-950 w-4/5 h-[50px]" value={question} onChange={handleChange}></input>
                        </div> :
                        <div className="">
                            <input type="text" id="search" placeholder="Enter a prompt here" className="fixed left-[205px] bottom-[15px] z-10 rounded-full border-zinc-700 border-2 p-[2px] text-slate-950 placeholder:text-slate-950 z-10 w-4/5 h-[50px]" value={question} onChange={handleChange}></input>
                            <button className="fixed right-[80px] bottom-[25px] h-[35px] w-[35px] cursor-pointer z-10" onClick={() => handleClick()}>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACSElEQVR4nO2az0ocQRDGf6eMOSQoGM0tHnPQk97MMSiBhHg0+gwS8S38c1ASCLnmERIX4xtIyDmuq6eoCYp61hgsaShBhpnZ3ZmumR7xgw8Gdre7Pr7u3qrqgXvcXfQBU8Ay0ACawBlwoXTP2/qZ+85boJdAEAGzwCbwH5Au6X6zAczoWKXjIbAAHOYIPo0HwDzQU5aIV8CeRwFx7gKTlgKc9WuGAuL8os57xSDws0QRovwBDPgSMaR2S0VsaQyF8ESPUamYe8DTvCJ6KlpOkrHMch3RnwIIXmL8kOeIlUA50akIZ99OAAFLCnc7/dNc8DDZODAGHBmJed+JGz7SjlEdb9hIzH67jT/raaIjFWEp5l2WkE2PEx0DIzruc+CPZyGNrHoiTypelTOXwOMkIVMG9ls78zpJyIqREEtnlpKENAyFWDnzNUlIy1iIhTPNJCGnJQjx7cxxkpCLkoTEnRkrMM75nRZyWtHS+ut7ae3UcLNvh3D8FnFCso7f5Ro5IcrFKlMUH05IVorSW7Ok8V9a0ujwvSZOCLBOBmZq4IQop7OERNoVD73U/Q08oA3mPUz0wrj5MNdOxI0rIbRJJYWtbjqOkwEELAm8Al7SJT4GELjEuEoORNo4lkC41ckGT0N/QNcKgxTEUEllcBpdVv4MTxioaJlt6WWTyWXoVUkiPlvfvU8YL7VmniM2LyJt7e97TjvmqnoDItKueEN7sd0Gf6lZ7HSRo9U3XG3wRtuY37SePrn1Uo17/qXl6aIWRY+8R3EPwsA1oBk5SAaWVBQAAAAASUVORK5CYII=" />
                            </button>
                        </div>
                }

                <div className="grid grid-cols-2 fixed w-full top-[5px]">

                    <div className="flex">
                        <h1 className="font-bold text-3xl text-[#222426] ml-[220px]  mt-[20px]">StackQ AI</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 48 48" className="mt-[25px] ml-2">
                            <polygon fill="#3dd9eb" points="41,43 7,43 7,28 11,28 11,39 37,39 37,28 41,28"></polygon><rect width="20" height="4" x="14" y="32" fill="#f5bc00"></rect><rect width="3.999" height="18.973" x="22.743" y="17.19" fill="#f5bc00" transform="rotate(-77.379 24.743 26.678)"></rect><rect width="4" height="19.022" x="24.812" y="10.629" fill="#f5bc00" transform="rotate(-64.196 26.812 20.14)"></rect><rect width="4" height="19.015" x="28.478" y="4.617" fill="#f5bc00" transform="rotate(-49.892 30.48 14.126)"></rect><rect width="4" height="19.1" x="33.75" y="-.425" fill="#f5bc00" transform="rotate(-37.022 35.749 9.126)"></rect><rect width="4" height="4" x="7" y="39" fill="#00b3d7"></rect><rect width="4" height="4" x="37" y="39" fill="#00b3d7"></rect>
                        </svg>
                    </div>
                    <div className="justify-self-end mt-[20px] mr-[20px]">
                        <UserProfile image={data.image} name={data.name} email={data.email} />
                    </div>
                </div>

                <div className="">
                    {
                        state == false ?
                            <div className="transition duration-300 ease-in-out">
                                <Intro></Intro>
                            </div>
                            :
                            <div className="">
                                <ul className="absolute top-[100px] left-[300px] w-[850px] h-[70%] flex flex-col overflow-auto  scroll-auto" id="chatbox">
                                    {
                                        arr.map((ques) => (
                                            <li key={ques.id} className="relative mb-[25px]">
                                                <UserChat chat={ques.ques}></UserChat>
                                                <Chatbot loader={true} answer={ans}></Chatbot>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                    }
                </div>
            </div>

        </>
    )
}