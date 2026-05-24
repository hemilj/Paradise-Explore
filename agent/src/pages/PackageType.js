import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PackageType() {

  const [packageTypes, setPackageTypes] = useState([]);

  // React way to handle the confirmation dialog before deleting
  const handleDelete = (e) => {
    if (!window.confirm('Are you sure?')) {
      e.preventDefault(); // Stops the link from navigating if they click "Cancel"
    }
  };

  useEffect(() => {
    fetchPackageTypes();
  }, [])

  const fetchPackageTypes = async () => {
    const res = await axios.get('http://localhost:5000/all/package-types')
    setPackageTypes(res.data);
    console.log(res.data);
  }

  return (
    <div className="page-content">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '25px'
        }}
      >
        <h1 className="page-title" style={{ margin: 0 }}>Package Types</h1>
        <a href="/add-package-type" className="btn btn-primary">
          <i className="fa-solid fa-plus"></i> Add New Type
        </a>
      </div>

      <div className="form-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {packageTypes.map((type, index) => (
              <tr>
                <td>#PKGT{index + 1}</td>
                <td><strong>{type.type_name}</strong></td>
                <td>{type.description}</td>
                <td>
                  <span className={
                    type.status === '1' ? 'status-badge status-active' : ""
                  }>
                    {
                      type.status === '1' ? 'Active' : 'Inactive'
                    }
                  </span>
                </td>
                <td className="action-icons">
                  <a href="edit-package-type.php?id=8" title="Edit">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </a>
                  <a
                    href="delete-package-type.php?id=8"
                    title="Delete"
                    onClick={handleDelete}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PackageType;