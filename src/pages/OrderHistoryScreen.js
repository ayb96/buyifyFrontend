import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrderMine } from "../redux/actions/orderAction";
import LoadingBox from "../component/HomePageComponent/LoadingBox";
import MessageBox from "../component/HomePageComponent/ErrorBox";
import { useNavigate } from "react-router";

export default function OrderHistoryScreen() {

  const navigate = useNavigate();
  const orderMineList = useSelector((state) => state.orderMineList);
  const { userInfo } = useSelector((state) => state.userSignin);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(listOrderMine(userInfo));

  }, [dispatch, userInfo]);


  return (
    <div className="order-history">
      <h1>Order History</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table table-fix">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.results &&
              orders.results.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : "No"}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() => {
                        navigate(`/order/${order._id}`);
                      }}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

    </div>
  );
}