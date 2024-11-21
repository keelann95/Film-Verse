import { useState } from 'react';

export default function CreateProfile() {
  const [formData, setFormData] = useState(
    {
    email: '',             // Added email field
    name: '',              // Name field is used as username
    description: '',
    password: '',          // Added password field
    type: 'Director',
    functions: {
      producer: false,
      movieSupplier: false,
    },
    socialMedia: {
      facebook: false,
      instagram: false,
      twitter: false,
      twitch: true,
    },
    profilePicture: '',    // Added optional profile picture field
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the data structure matches what the backend expects
    const dataToSend = {
      email: formData.email,
      username: formData.name,      // Mapping name to username
      profile_picture: formData.profilePicture,  // Profile picture (optional)
      bio: formData.description,    // Bio (description)
      password: formData.password, // Password field
    };

    try {
      const response = await fetch('http://127.0.0.1:5555/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Failed to create profile');
      }

      const data = await response.json();
      console.log('User created successfully:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-dark-light p-8 rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold tracking-wide">CREATE PROFILE</h2>
        <button className="text-gray-400 hover:text-white">Cancel</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-dark-light border-2 border-gray-700 flex items-center justify-center overflow-hidden">
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              className="absolute bottom-0 right-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-dark hover:bg-primary/90"
            >
              <span className="text-sm font-bold">+</span>
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Email</label>
            <input
              type="email"
              className="w-full bg-dark border border-gray-700 rounded-lg p-3 text-black focus:border-primary focus:ring-1 focus:ring-primary"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Name</label>
            <input
              type="text"
              className="w-full bg-dark border border-gray-700 rounded-lg p-3 text-black focus:border-primary focus:ring-1 focus:ring-primary"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Password</label>
            <input
              type="password"
              className="w-full bg-dark border border-gray-700 rounded-lg p-3 text-black focus:border-primary focus:ring-1 focus:ring-primary"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Description</label>
            <textarea
              className="w-full bg-dark border border-gray-700 rounded-lg p-3 text-black h-32 focus:border-primary focus:ring-1 focus:ring-primary resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Type Selection */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Type</label>
            <select
              className="w-full bg-dark border border-gray-700 rounded-lg p-3 text-black focus:border-primary focus:ring-1 focus:ring-primary"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option>Director</option>
              <option>Actor</option>
              <option>Producer</option>
            </select>
          </div>

          {/* Functions Section */}
          <div>
            <label className="block text-gray-400 text-sm mb-3">Functions</label>
            <div className="flex space-x-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={formData.functions.producer}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      functions: { ...formData.functions, producer: e.target.checked },
                    })
                  }
                />
                <span className="text-white">Producer</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={formData.functions.movieSupplier}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      functions: { ...formData.functions, movieSupplier: e.target.checked },
                    })
                  }
                />
                <span className="text-white">Movie Supplier</span>
              </label>
            </div>
          </div>

          {/* Social Media Section */}
          <div>
            <label className="block text-gray-400 text-sm mb-3">Social Media Association</label>
            <div className="flex flex-wrap gap-6">
              {Object.entries(formData.socialMedia).map(([platform, checked]) => (
                <label key={platform} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={checked}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialMedia: { ...formData.socialMedia, [platform]: e.target.checked },
                      })
                    }
                  />
                  <span className="text-white capitalize">{platform}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-primary text-dark px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
