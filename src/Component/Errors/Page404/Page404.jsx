import './Page404.css'
import {MdOutlineSearchOff} from "react-icons/md";
import {FaRegFaceGrinBeamSweat} from "react-icons/fa6";

export default function Page404() {
    return (
        <div className="text-center min-vh-100 p-5 mt-5">
            <MdOutlineSearchOff className="invalidSearch"/>
            <h1>Упс!<FaRegFaceGrinBeamSweat className="mb-1 ms-2 myRedColor"/></h1>
            <h2>Изглежда, че сте се изгубили във виртуалното ни пространство. </h2>
            <h3>Съжаляваме, но страницата, която търсите,
                не може да бъде намерена.</h3>
            <h3>Моля, проверете дали сте въвели правилния адрес или използвайте навигацията по сайта, за да
                продължите. </h3>
        </div>
    )
}