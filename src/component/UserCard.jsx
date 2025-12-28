function UserCard({ data, onDelete, onEdit }) {
  return (
    <div className="card">
      <p>
        <b>{data.firstName} {data.lastName}</b>
      </p>
      <p>{data.email}</p>
      <p>{data.city}</p>
      <div style={{display:'flex',gap:'2em'}}>
        <button onClick={() => onEdit(data)}>Edit</button>
        <button onClick={() => onDelete(data._id)}>Delete</button>
      </div>
      
    </div>
  );
}

export default UserCard;
