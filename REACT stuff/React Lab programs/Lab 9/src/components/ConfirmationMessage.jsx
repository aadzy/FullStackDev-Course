const ConfirmationMessage = ({ name, email, country, preferredRoles }) => {
  return (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
      <h3 className="font-bold text-lg mb-2">
        Thanks {name}! 🎉
      </h3>
      <p className="mb-2">
        We've received your volunteer application and will contact you at <strong>{email}</strong>.
      </p>
      <p className="mb-2">
        <strong>Location:</strong> {country}
      </p>
      {preferredRoles.length > 0 && (
        <p>
          <strong>Preferred Roles:</strong> {preferredRoles.join(', ')}
        </p>
      )}
    </div>
  )
}

export default ConfirmationMessage 