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
    <>
      <div className="order-history">
        <div>
          <h1>Order History</h1>
          {loading ? (
            <div style={{ color: "black" }}>
              <LoadingBox></LoadingBox>
            </div>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <table role="table">
              <thead role="rowgroup">
                <tr role="row">
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody role="rowgroup">
                {orders.results &&
                  orders.results.map((order) => (
                    <tr key={order._id}>
                      <td role="cell">{order._id.slice(0, 19)}</td>
                      <td role="cell">{order.createdAt.substring(0, 10)}</td>
                      <td role="cell">{order.totalPrice.toFixed(2)}</td>
                      <td role="cell">
                        {order.isPaid ? order.paidAt.substring(0, 10) : "No"}
                      </td>
                      <td role="cell">
                        {order.isDelivered
                          ? order.deliveredAt.substring(0, 10)
                          : "No"}
                      </td>
                      <td role="cell">
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
      </div>
    </>
  );
}
