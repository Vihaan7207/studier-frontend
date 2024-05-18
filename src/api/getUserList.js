import axios from "axios";

export function getUserList() {
    axios.get(`http://localhost:5001/users`)
    .then(res => {
        // console.log(res.data[0])
        return res;
    })
    .catch(error => {
        throw error
    });
}