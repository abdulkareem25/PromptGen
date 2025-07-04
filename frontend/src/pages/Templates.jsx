import React, { useEffect, useState } from 'react';
import axios from 'axios';

// This page lets users view templates, and admins can create/update/delete
const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ title: '', description: '', category: '', _id: null });
  const [showForm, setShowForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Example: check JWT for admin (replace with real logic)
    const token = localStorage.getItem('token');
    if (token) {
      // decode or check admin claim in real app
      setIsAdmin(true); // Set to true for demo
    }
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('/api/templates');
      setTemplates(res.data);
    } catch (err) {
      setError('Failed to load templates');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this template?')) return;
    try {
      await axios.delete(`/api/templates/${id}`);
      setTemplates(templates.filter(t => t._id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleEdit = (template) => {
    setForm(template);
    setShowForm(true);
  };

  const handleCreate = () => {
    setForm({ title: '', description: '', category: '', _id: null });
    setShowForm(true);
  };

  const handleFormChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      if (form._id) {
        // Update
        const res = await axios.put(`/api/templates/${form._id}`, form);
        setTemplates(templates.map(t => t._id === form._id ? res.data : t));
      } else {
        // Create
        const res = await axios.post('/api/templates', form);
        setTemplates([...templates, res.data]);
      }
      setShowForm(false);
    } catch (err) {
      alert('Save failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-purple-700">Prompt Templates</h1>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {isAdmin && (
          <button onClick={handleCreate} className="mb-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Create Template</button>
        )}
        {showForm && (
          <form onSubmit={handleFormSubmit} className="mb-6 bg-white p-4 rounded shadow flex flex-col gap-2 max-w-md mx-auto">
            <input name="title" value={form.title} onChange={handleFormChange} placeholder="Title" required className="border px-2 py-1 rounded" />
            <input name="category" value={form.category} onChange={handleFormChange} placeholder="Category" required className="border px-2 py-1 rounded" />
            <textarea name="description" value={form.description} onChange={handleFormChange} placeholder="Description" required className="border px-2 py-1 rounded" />
            <div className="flex gap-2">
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded">{form._id ? 'Update' : 'Create'}</button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-gray-300 px-4 py-1 rounded">Cancel</button>
            </div>
          </form>
        )}
        {loading ? (
          <div className="text-center text-lg text-gray-500">Loading templates...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map(template => (
              <div key={template._id} className="p-4 border rounded shadow relative bg-white">
                <h2 className="text-lg font-bold text-purple-700">{template.title}</h2>
                <p className="mb-2 text-gray-700">{template.description}</p>
                <p className="text-sm text-gray-500 mb-2">Category: {template.category}</p>
                {isAdmin && (
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button onClick={() => handleEdit(template)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-xs">Edit</button>
                    <button onClick={() => handleDelete(template._id)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs">Delete</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;
