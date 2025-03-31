import React, { useState } from 'react';

function ProfilePage({ userProfile, updateAllergens }) {
  const [editMode, setEditMode] = useState(false);
  const [tempAllergens, setTempAllergens] = useState([...userProfile.allergens]);
  const [newAllergen, setNewAllergen] = useState('');
  
  const commonAllergens = [
    'Milk', 'Eggs', 'Fish', 'Shellfish', 'Tree nuts', 
    'Peanuts', 'Wheat', 'Soybeans', 'Sesame'
  ];
  
  const handleAddAllergen = () => {
    if (newAllergen && !tempAllergens.includes(newAllergen)) {
      setTempAllergens([...tempAllergens, newAllergen]);
      setNewAllergen('');
    }
  };
  
  const handleRemoveAllergen = (allergen) => {
    setTempAllergens(tempAllergens.filter(item => item !== allergen));
  };
  
  const handleSaveProfile = () => {
    updateAllergens(tempAllergens);
    setEditMode(false);
  };
  
  const addCommonAllergen = (allergen) => {
    if (!tempAllergens.includes(allergen)) {
      setTempAllergens([...tempAllergens, allergen]);
    }
  };
  
  return (
    <section className="profile">
      <div className="container">
        <h2>Your Allergen Profile</h2>
        
        <div className="profile-container">
          <div className="profile-header">
            <h3>Welcome, {userProfile.name}</h3>
            {!editMode && (
              <button 
                className="btn secondary"
                onClick={() => setEditMode(true)}
              >
                Edit Allergens
              </button>
            )}
          </div>
          
          <div className="allergen-profile">
            <h4>Your Allergens</h4>
            
            {!editMode ? (
              <div className="allergen-list">
                {userProfile.allergens.length > 0 ? (
                  <ul>
                    {userProfile.allergens.map((allergen, index) => (
                      <li key={index} className="allergen-tag">{allergen}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No allergens added yet. Edit your profile to add allergens.</p>
                )}
              </div>
            ) : (
              <div className="edit-allergens">
                <div className="current-allergens">
                  {tempAllergens.map((allergen, index) => (
                    <div key={index} className="allergen-tag editable">
                      {allergen}
                      <button 
                        className="remove-btn"
                        onClick={() => handleRemoveAllergen(allergen)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="add-allergen">
                  <input
                    type="text"
                    value={newAllergen}
                    onChange={(e) => setNewAllergen(e.target.value)}
                    placeholder="Enter an allergen"
                  />
                  <button 
                    className="btn small"
                    onClick={handleAddAllergen}
                  >
                    Add
                  </button>
                </div>
                
                <div className="common-allergens">
                  <h5>Common Allergens</h5>
                  <div className="allergen-suggestions">
                    {commonAllergens.map((allergen, index) => (
                      <button
                        key={index}
                        className={`allergen-suggestion ${tempAllergens.includes(allergen) ? 'selected' : ''}`}
                        onClick={() => addCommonAllergen(allergen)}
                        disabled={tempAllergens.includes(allergen)}
                      >
                        {allergen}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="profile-actions">
                  <button 
                    className="btn primary"
                    onClick={handleSaveProfile}
                  >
                    Save Changes
                  </button>
                  <button 
                    className="btn secondary"
                    onClick={() => {
                      setTempAllergens([...userProfile.allergens]);
                      setEditMode(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;