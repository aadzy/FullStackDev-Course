import { useState } from 'react'
import ConfirmationMessage from './ConfirmationMessage'

const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    contact: '',
    country: '',
    preferredRoles: [],
    volunteerReason: ''
  })

  const [capturedInfo, setCapturedInfo] = useState(null)
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        preferredRoles: checked 
          ? [...prev.preferredRoles, value]
          : prev.preferredRoles.filter(role => role !== value)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.contact.trim()) newErrors.contact = 'Contact number is required'
    if (!formData.country.trim()) newErrors.country = 'Country is required'
    if (!formData.volunteerReason.trim()) newErrors.volunteerReason = 'Please tell us why you want to volunteer'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      setCapturedInfo(formData)
      // Reset form
      setFormData({
        name: '',
        email: '',
        countryCode: '+91',
        contact: '',
        country: '',
        preferredRoles: [],
        volunteerReason: ''
      })
    }
  }

  const resetForm = () => {
    setCapturedInfo(null)
    setErrors({})
  }

  return (
    <section className="p-12 bg-gray-200">
      <h2 className="text-xl font-bold mb-6">Give us some feedback</h2>
      <div className="p-8 flex justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className={`border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : ''
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={`border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : ''
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="contact" className="block text-gray-700 font-bold mb-2">Contact Number</label>
            <div className="flex gap-2">
              <select 
                name="countryCode" 
                id="countryCode" 
                value={formData.countryCode}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="+1">🇺🇸 +1</option>
                <option value="+91">🇮🇳 +91</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+81">🇯🇵 +81</option>
                <option value="+61">🇦🇺 +61</option>
              </select>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                required
                className={`border border-gray-300 rounded-lg p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.contact ? 'border-red-500' : ''
                }`}
              />
            </div>
            {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="country" className="block text-gray-700 font-bold mb-2">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
              className={`border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.country ? 'border-red-500' : ''
              }`}
            />
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Preferred Roles</label>
            <div className="flex flex-col space-y-2">
              {[
                'usher',
                'technical_support', 
                'social_media',
                'registration_desk',
                'logistics',
                'crowd_management',
                'photography_videography'
              ].map((role) => (
                <label key={role} className="inline-flex items-center p-2 rounded hover:bg-gray-100 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="preferredRoles" 
                    value={role} 
                    checked={formData.preferredRoles.includes(role)}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span>{role.replace('_', ' ')}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="volunteerReason" className="block text-gray-700 font-bold mb-2">
              Why do you want to volunteer?
            </label>
            <p className="block text-gray-600 text-sm mb-2">
              Tell us why you are interested and vouch for your eligibility and share your previous Experience (if any)
            </p>
            <textarea
              id="volunteerReason"
              name="volunteerReason"
              value={formData.volunteerReason}
              onChange={handleInputChange}
              required
              rows="4"
              className={`border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.volunteerReason ? 'border-red-500' : ''
              }`}
            ></textarea>
            {errors.volunteerReason && <p className="text-red-500 text-sm mt-1">{errors.volunteerReason}</p>}
          </div>
          
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 w-full"
          >
            Submit my Name
          </button>
        </form>
      </div>

      {/* Conditional rendering of confirmation message */}
      {capturedInfo && (
        <div className="p-8 flex justify-center">
          <ConfirmationMessage 
            name={capturedInfo.name}
            email={capturedInfo.email}
            country={capturedInfo.country}
            preferredRoles={capturedInfo.preferredRoles}
          />
        </div>
      )}
      
    </section>
  )
}

export default VolunteerForm 