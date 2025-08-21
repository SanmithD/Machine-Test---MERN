
function Items({ items }) {
  if (!items || items.length === 0) {
    return <p className="text-gray-500">No items assigned.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead className="text-center" >
          <tr>
            <th>#</th>
            <th>Customer Name</th>
            <th>Phone</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody className="text-center" >
          {items.map((item, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{item.firstName}</td>
              <td>{item.phone}</td>
              <td>{item.notes} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Items;
