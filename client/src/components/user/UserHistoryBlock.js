import React from "react";
import moment from "moment";
function UserHistoryBlock({ history }) {
  console.log(history);
  const renderBlocks = () => {
    if (history) {
      return history.map((historyItem, i) => (
        <tr key={i}>
          <td>
            {moment(Number(historyItem.dateOfPurchase)).format("MMM Do YY")}
          </td>
          <td>
            {historyItem.brand} {historyItem.name}
          </td>
          <td>${historyItem.price}</td>
          <td>{historyItem.quantity}</td>
        </tr>
      ));
    }
  };

  return (
    <div className="history_blocks">
      <table>
        <thead>
          <tr>
            <th>Date of purchase</th>
            <th>Product</th>
            <th>Price paid</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{renderBlocks()}</tbody>
      </table>
    </div>
  );
}

export default UserHistoryBlock;
