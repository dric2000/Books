import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { Camera, Edit3, Mail, Phone, Save, User, X } from 'lucide-react';
import { useState } from 'react';

const UserProfile = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    first_name: user?.firstname || '',
    last_name: user?.lastname || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleInputChange = (field, value) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Ici vous pouvez dispatcher une action pour sauvegarder
    // dispatch(updateUserProfile(editedUser));
    console.log('Saving user data:', editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser({
      first_name: user?.firstname || '',
      last_name: user?.lastname || '',
      email: user?.email || '',
      phone: user?.phone || '',
    });
    setIsEditing(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Ici vous pouvez gérer l'upload de l'image
      console.log('Uploading image:', file);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="h-32 bg-[#3FB076]"></div>
          <div className="relative px-6 pb-6">
            {/* Photo de profil */}
            <div className="relative -mt-16 mb-4 ">
              <div className="relative inline-block">
                <img
                  src='https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=3b82f6&color=fff&size=120'
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white bg-white object-cover"
                />
                <label className="absolute bottom-0 right-0 bg-[#3FB076]">
                  <Camera size={16} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Nom et actions */}
            <div className="flex items-center justify-between ">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.firstname} {user.lastname}
                </h1>
                <p className="text-gray-600 mt-1">Administrateur</p>
              </div>

              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#3FB076] text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit3 size={16} />
                  Modifier
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save size={16} />
                    Sauvegarder
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <X size={16} />
                    Annuler
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Informations personnelles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 dark:bg-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 dark:text-gray-500">Informations personnelles</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Prénom */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 dark:text-black">
                    <User size={16} />
                    Prénom
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedUser.first_name}
                      onChange={(e) => handleInputChange('first_name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{user.firstname}</p>
                  )}
                </div>

                {/* Nom */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 dark:text-black">
                    <User size={16} />
                    Nom
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedUser.last_name}
                      onChange={(e) => handleInputChange('last_name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{user.lastname}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 dark:text-black">
                    <Mail size={16} />
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedUser.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{user.email}</p>
                  )}
                </div>

                {/* Téléphone */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 dark:text-black">
                    <Phone size={16} />
                    Téléphone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedUser.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Numéro de téléphone"
                    />
                  ) : (
                    <p className="text-gray-900 py-2 dark:text-white">{user.phone || 'Non renseigné'}</p>
                  )}
                </div>


              </div>
            </div>
          </div>

          {/* Sidebar - Informations supplémentaires */}
          <div className="space-y-6">
            {/* Statistiques */}
            <div className="bg-white rounded-xl shadow-sm p-6 dark:bg-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-gray-500">Statistiques</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-black">Articles créés</span>
                  <span className="font-semibold text-blue-600 dark:text-black">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-black">Dernière connexion</span>
                  <span className="font-semibold text-gray-900 dark:text-black">Aujourd'hui</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-black">Membre depuis</span>
                  <span className="font-semibold text-gray-900 dark:text-black">Jan 2024</span>
                </div>
              </div>
            </div>

            {/* Paramètres rapides */}
            <div className="bg-white rounded-xl shadow-sm p-6 dark:bg-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-gray-500">Paramètres</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors dark:text-black">
                  Changer le mot de passe
                </button>
                <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors dark:text-black">
                  Paramètres de notification
                </button>
                <button className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors dark:text-black">
                  Sécurité et confidentialité
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;