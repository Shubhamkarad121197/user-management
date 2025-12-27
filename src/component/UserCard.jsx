const UserCard = ({ data, onDelete }) => {
  const { _id, firstName, lastName, email, city } = data;

  return (
    <div className="card">
      <h4>{firstName} {lastName}</h4>
      <p>{email}</p>
      <p>{city}</p>

      <button onClick={() => onDelete(_id)}>Delete</button>
    </div>
  );
};


export default UserCard;
