import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar,Doughnut ,Line} from "react-chartjs-2";
import { useEffect } from "react";

const Dashboard = () => {
  // ChartJS.register(ArcElement, Tooltip, Legend);
  const data = useSelector((state) => state.userReducer?.currentUser?.data);
  const [order,setorder]=useState();
  const[user,setuser]=useState(0);
  const [product,setproduct]=useState(0);
  const[profitcurr,setprofitcurr]=useState();
  const[profitprev,setprofitprev]=useState();
  useEffect(()=>{
           const fetchdata=async()=>{
            try {
              const res = await fetch('/api/details');
              if (!res.ok) {
                  throw new Error('Failed to fetch data');
              }
              const da = await res.json();
              // console.log(da);
              setprofitcurr(da.profit[0]);
              setprofitprev(da.profit[1]);
              setuser(da.tuser)
              setproduct(da.tproduct)
              setorder(da.order)              // This will log { data: "umesh" }
          } catch (error) {
              console.error('Error fetching data:', error.message);
          }
           }

           fetchdata();
  },[])

  // console.log(data);
  return (
    <div className="flex  h-full flex-col lg:flex-row justify-center items-center bg-[#dadada] py-10 gap-[20px]">
      <div className="w-[80%] lg:w-[20%] h-screen ">
        <img
          src="https://img.freepik.com/free-photo/view-3d-man-holding-laptop_23-2150709818.jpg?size=626&ext=jpg"
          className="w-[100px] h-[100px] rounded-lg"
          alt="Avatar"
        />
        <div className="flex  gap-[60%] items-center my-5  ">
          <h1 className="text-blue-700 font-serif">{data.name}</h1>
          <button className="border-1 p-3 bg-black rounded-lg font-extrabold text-white">
            {data.role}
          </button>
        </div>
        <p className="w-full border-blue-400 border-2 rounded-md py-2 my-5 text-center">
          Admin Email: {data.email}
        </p>
        <p className="w-full border-blue-400 border-2 rounded-md py-2 my-5 text-center">
          <span className="text-blue-700 ">Total User:</span> <b>{user}</b>
        </p>
        <p className="w-full border-blue-400 border-2 rounded-md py-2 my-5 text-center">
          <span className="text-blue-700 ">Total Product:</span> <b>{product}</b>
        </p>
        <p className="w-full border-blue-400 border-2 rounded-md py-2 my-5 text-center">
          <span className="text-blue-700 ">Total Pending order:</span> <b>{order?order[1]:0}</b>
        </p>
        <p className="w-full border-blue-400 border-2 rounded-md py-2 my-5 text-center">
          <span className="text-blue-700 ">Total Order delivered:</span>{" "}
          <b>{order?order[0]:0}</b>
        </p>
      </div>
      <div className="w-[80%] lg:w-[70%] p-10 flex gap-[20px] items-center  flex-col">
        <div className="w-full h-full">
        <h1 className="text-blue-700 text-center mb-4"><strong>Reveneue in {new Date().getFullYear()} && {new Date().getFullYear()-1}</strong></h1>
        <Line
          data={{
            labels:[ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ],
            datasets: [
              {
                label: `Revenue in ${new Date().getFullYear()}`,
                data:profitcurr,
              },
                 {
                label: `Revenue in ${new Date().getFullYear()-1}`,
                data:profitprev,
              },
            ],
            // datasets: [
           
             
            // ],
          
           
             
            
          }}
        ></Line>
        </div>
       <div className="h-[400px]">
          <h1 className="text-blue-700 text-center mb-4"><strong>Order Status</strong></h1>
      {order?
         <Doughnut
         data={{
          labels: ["Delivered", "Pending"],
          datasets: [
            {
              label: "OrderStatus",
              data: order.map(item=>item),
            },
          ],
          
        }}
       
        ></Doughnut>:null
      }
       </div>
      </div>
    </div>
  );
};
export default Dashboard;
