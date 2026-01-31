import React from "react";

const TenantForm = ({ lo_authFormData, handleChange }) => {
  const { tenant_name, tenant_address, tenant_phone } = lo_authFormData;
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="form-name"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Tenant Name
          </label>
          <input
            id="form-name"
            name="tenant_name"
            type="text"
            placeholder="My Business LLC"
            required
            value={tenant_name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label
            htmlFor="form-phone"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Tenant Phone Number
          </label>
          <input
            id="form-phone"
            name="tenant_phone"
            type="tel"
            placeholder="+91 98765 43210"
            value={tenant_phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="form-address"
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          Tenant Address
        </label>
        <input
          id="form-address"
          name="tenant_address"
          type="text"
          placeholder="123 Main St"
          value={tenant_address}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
      </div>
    </>
  );
};

export default TenantForm;

//  <label
//                   htmlFor="form-role"
//                   className="block text-sm font-medium text-gray-700 mb-1.5"
//                 >
//                   Role
//                 </label>
//                 <select
//                   id="form-role"
//                   name="role"
//                   value={formData.role}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white appearance-none cursor-pointer"
//                   style={{
//                     backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
//                     backgroundPosition: 'right 0.5rem center',
//                     backgroundRepeat: 'no-repeat',
//                     backgroundSize: '1.5em 1.5em',
//                     paddingRight: '2.5rem'
//                   }}
//                 >
//                   <option value="">Select role</option>
//                   {userRoles.map((role) => (
//                     <option key={role.value} value={role.value}>
//                       {role.label}
//                     </option>
//                   ))}
//                 </select>
