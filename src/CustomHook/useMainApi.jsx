import { useEffect, useState } from "react";
import { mainUrl } from "../utils/helper";
import axios from 'axios'
const useMainApi = () => {
	const [MainData, setMainData] = useState([]);
	const [loading, setLoading] = useState(false);
	const fetctMainData = async () => {
		setLoading(true);
		const res = await axios.get(mainUrl);
		setMainData(res.data);
		setLoading(false);
	};
	useEffect(() => {
		fetctMainData();
	}, []);

	return {loading, MainData,setMainData };
};
export default useMainApi;
