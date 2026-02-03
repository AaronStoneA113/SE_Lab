import axios from "axios";

const BASE = "http://localhost:5000/api";

export const loadStudents = () => axios.post(`${BASE}/load`);
export const fetchStudents = () => axios.get(`${BASE}/students`);
export const fetchStats = () => axios.get(`${BASE}/stats`);
