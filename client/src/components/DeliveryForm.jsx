// src/components/DeliveryForm.jsx
import { useState } from "react";

const DeliveryForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    deliveryInstructions: "",


  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Please enter a valid 10-digit phone number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        console.log(value);
        if (!value.trim()) error = "Name is required";
        break;
      case "address":
        if (!value.trim()) error = "Address is required";
        break;
      case "phone":
        if (!value.trim()) error = "Phone is required";
        else if (!/^\d{10}$/.test(value)) error = "Please enter a valid 10-digit phone number";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-6 max-w-2xl mx-auto">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Delivery Information</h2>
        <p className="mt-1 text-sm text-gray-500">Please fill in all required fields to create a new delivery.</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="label">
            Full Name <span className="text-danger">*</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`input ${errors.name && touched.name ? 'border-danger' : ''}`}
            placeholder="Enter recipient's full name"
          />
          {errors.name && touched.name && (
            <p className="mt-1 text-sm text-danger">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="address" className="label">
            Delivery Address <span className="text-danger">*</span>
          </label>
          <input
            id="address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`input ${errors.address && touched.address ? 'border-danger' : ''}`}
            placeholder="Enter complete delivery address"
          />
          {errors.address && touched.address && (
            <p className="mt-1 text-sm text-danger">{errors.address}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="label">
            Phone Number <span className="text-danger">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`input ${errors.phone && touched.phone ? 'border-danger' : ''}`}
            placeholder="Enter 10-digit phone number"
          />
          {errors.phone && touched.phone && (
            <p className="mt-1 text-sm text-danger">{errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="deliveryInstructions" className="label">
            Delivery Instructions
          </label>
          <textarea
            id="deliveryInstructions"
            name="deliveryInstructions"
            value={formData.deliveryInstructions}
            onChange={handleChange}
            rows="3"
            className="input resize-none"
            placeholder="Add any special instructions for the delivery (optional)"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <button
          type="submit"
          disabled={isLoading}
          className={`btn btn-primary w-full sm:w-auto ${
            isLoading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Creating Delivery...' : 'Create Delivery'}
        </button>
      </div>
    </form>
  );
};

export default DeliveryForm;